<script setup lang="ts">
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { ref, watch, defineProps, withDefaults, computed, defineEmits } from "vue";
import Select from "primevue/select";
import { TransactionsApi, type CreateTransactionInput } from "@/api";
import { defaultApiConfiguration } from "@/fetch";

interface Props {
    modalOpen: boolean;
    expenseType: "expense" | "income";
}

interface Emit {
    (event: "update:modalOpen", value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
    modalOpen: false,
    expenseType: "expense",
});

const emit = defineEmits<Emit>();

const transactionApi = new TransactionsApi(defaultApiConfiguration);

const updateTrigger = ref(false);

const vModelModalOpen = computed({
    get() {
        return props.modalOpen;
    },
    set(newValue) {
        emit("update:modalOpen", newValue);
    },
});

const daysOfWeek = ref([
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
]);

const daysOfMonth = ref([
    { label: "1st", value: 1 },
    { label: "2nd", value: 2 },
    { label: "3rd", value: 3 },
    { label: "4th", value: 4 },
    { label: "5th", value: 5 },
    { label: "6th", value: 6 },
    { label: "7th", value: 7 },
    { label: "8th", value: 8 },
    { label: "9th", value: 9 },
    { label: "10th", value: 10 },
    { label: "11th", value: 11 },
    { label: "12th", value: 12 },
    { label: "13th", value: 13 },
    { label: "14th", value: 14 },
    { label: "15th", value: 15 },
    { label: "16th", value: 16 },
    { label: "17th", value: 17 },
    { label: "18th", value: 18 },
    { label: "19th", value: 19 },
    { label: "20th", value: 20 },
    { label: "21st", value: 21 },
    { label: "22nd", value: 22 },
    { label: "23rd", value: 23 },
    { label: "24th", value: 24 },
    { label: "25th", value: 25 },
    { label: "26th", value: 26 },
    { label: "27th", value: 27 },
    { label: "28th", value: 28 },
]);

const firstLastDayOfMonthChoices = ref<{ label: string; value: "first_business" | "last_business" | "last" | "specific" }[]>([
    { label: "First business day of the month", value: "first_business" },
    { label: "Last business day of the month", value: "last_business" },
    { label: "Last day of the month", value: "last" },
    { label: "Specific day of the month (1st - 28th)", value: "specific" },
]);

const transactionForm = ref<CreateTransactionInput>({
    name: "",
    isExpense: false,
    amountInPence: 0.01,
    startDate: undefined,
    finishDate: undefined,
    isRecurring: false,
    recurrenceType: undefined,
    recurrenceRate: undefined,
    specificDayOfWeek: undefined,
    specificDayOfMonth: undefined,
    firstLastDayOfMonth: undefined,
});

function closeModal() {
    vModelModalOpen.value = false;
    resetTransactionForm();
}

function resetTransactionForm() {
    transactionForm.value = {
        name: "",
        isExpense: false,
        amountInPence: 0.01,
        startDate: undefined,
        finishDate: undefined,
        isRecurring: false,
        recurrenceType: undefined,
        recurrenceRate: undefined,
        specificDayOfWeek: undefined,
        specificDayOfMonth: undefined,
        firstLastDayOfMonth: undefined,
    };
}

async function createTransaction() {
    try {
        await transactionApi.apiTransactionsPost({ createTransactionInput: transactionForm.value });
        updateTrigger.value = true;
        closeModal();
    } catch (err: any) {
        console.error(err);
    }
}

watch(
    () => transactionForm.value.recurrenceType,
    () => {
        transactionForm.value.recurrenceRate = undefined;
        transactionForm.value.specificDayOfWeek = undefined;
        transactionForm.value.specificDayOfMonth = undefined;
        transactionForm.value.firstLastDayOfMonth = undefined;
    }
);
</script>

<template>
    <Dialog
        v-model:visible="vModelModalOpen"
        modal
        :draggable="false"
        header="Add a new transaction"
        @show="transactionForm.isExpense = expenseType === 'expense'"
        @hide="closeModal"
        :pt="{ headerActions: 'self-start' }"
    >
        <template v-slot:header>
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-medium">Add a new {{ transactionForm.isExpense ? "expense" : "income" }}</h1>
            </div>
        </template>
        <div class="flex flex-col justify-between mt-3 gap-8">
            <InputText v-model="transactionForm.name" placeholder="Name of transaction" />
            <!-- One Off -->
            <div v-if="transactionForm.isExpense !== null" class="flex w-full gap-3">
                <Button
                    class="flex-grow w-[50%] hover:opacity-100"
                    :class="{ 'bg-black text-white': transactionForm.isRecurring === false, 'opacity-50': transactionForm.isRecurring }"
                    severity="secondary"
                    label="One off"
                    @click="transactionForm.isRecurring = false"
                ></Button>
                <Button
                    class="flex-grow w-[50%] hover:opacity-100"
                    :class="{ 'bg-black text-white': transactionForm.isRecurring, 'opacity-50': transactionForm.isRecurring === false }"
                    severity="secondary"
                    label="Recurring"
                    @click="transactionForm.isRecurring = true"
                ></Button>
            </div>
            <!-- Recurring -->
            <template v-if="transactionForm.isRecurring">
                <InputNumber
                    v-model="transactionForm.amountInPence"
                    placeholder="Value of the payment (£)"
                    mode="currency"
                    currency="GBP"
                    locale="en-GB"
                    :min="0.01"
                />
                <div class="flex flex-col gap-3 rounded-lg">
                    <div class="flex justify-between gap-3">
                        <Button
                            class="flex-grow hover:opacity-100"
                            :class="{
                                '!bg-black !text-white': transactionForm.recurrenceType === 'day',
                                'opacity-50': transactionForm.recurrenceType !== 'day' && transactionForm.recurrenceType,
                            }"
                            severity="secondary"
                            label="Day"
                            @click="transactionForm.recurrenceType = 'day'"
                        />
                        <Button
                            class="flex-grow hover:opacity-100"
                            :class="{
                                '!bg-black !text-white': transactionForm.recurrenceType === 'week',
                                'opacity-50': transactionForm.recurrenceType !== 'week' && transactionForm.recurrenceType,
                            }"
                            severity="secondary"
                            label="Week"
                            @click="transactionForm.recurrenceType = 'week'"
                        />
                        <Button
                            class="flex-grow hover:opacity-100"
                            :class="{
                                '!bg-black !text-white': transactionForm.recurrenceType === 'month',
                                'opacity-50': transactionForm.recurrenceType !== 'month' && transactionForm.recurrenceType,
                            }"
                            severity="secondary"
                            label="Month"
                            @click="transactionForm.recurrenceType = 'month'"
                        />
                    </div>
                    <div v-if="transactionForm.recurrenceType === 'day'" class="flex flex-col flex-grow gap-3">
                        <InputNumber v-model="transactionForm.recurrenceRate" placeholder="Every how many days?" :min="1" />
                        <p v-if="transactionForm.recurrenceRate !== undefined">
                            Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> days
                        </p>
                    </div>
                    <div v-else-if="transactionForm.recurrenceType === 'week'" class="flex flex-col gap-3 w-full">
                        <InputNumber v-model="transactionForm.recurrenceRate" placeholder="Every how many weeks?" :min="1" />
                        <Select
                            v-model="transactionForm.specificDayOfWeek"
                            :options="daysOfWeek"
                            placeholder="Select a day of the week"
                            optionLabel="label"
                            optionValue="value"
                        />
                        <p v-if="transactionForm.specificDayOfWeek !== undefined && transactionForm.recurrenceRate !== undefined">
                            Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> weeks on
                            <b>{{ daysOfWeek[transactionForm.specificDayOfWeek].label }}</b>
                        </p>
                    </div>
                    <div v-else-if="transactionForm.recurrenceType === 'month'" class="flex flex-col gap-3 w-full">
                        <InputNumber v-model="transactionForm.recurrenceRate" placeholder="Every how many months?" :min="1" />
                        <Select
                            v-model="transactionForm.firstLastDayOfMonth"
                            :options="firstLastDayOfMonthChoices"
                            placeholder="on which day?"
                            optionLabel="label"
                            optionValue="value"
                        />
                        <template v-if="transactionForm.firstLastDayOfMonth === 'specific'">
                            <Select
                                v-model="transactionForm.specificDayOfMonth"
                                :options="daysOfMonth"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select a day of the month"
                            />
                            <p v-if="transactionForm.specificDayOfMonth !== undefined && transactionForm.recurrenceRate !== undefined">
                                Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> months on the
                                <b>{{ daysOfMonth[transactionForm.specificDayOfMonth - 1].label }}</b>
                            </p>
                        </template>
                        <p v-else-if="transactionForm.recurrenceRate !== undefined && transactionForm.firstLastDayOfMonth !== undefined">
                            Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> months on the
                            <b>{{
                                firstLastDayOfMonthChoices
                                    .find((el) => el.value === transactionForm.firstLastDayOfMonth)
                                    ?.label.toLowerCase()
                            }}</b>
                        </p>
                    </div>
                    <DatePicker v-model="transactionForm.startDate" placeholder="Start Date (optional)" showIcon iconDisplay="input" />
                    <DatePicker v-model="transactionForm.finishDate" placeholder="Finish Date (optional)" showIcon iconDisplay="input" />
                </div>
                <div class="flex justify-between w-full">
                    <Button severity="secondary" label="Cancel" @click="closeModal" />
                    <Button label="Create" @click="createTransaction" />
                </div>
            </template>
        </div>
    </Dialog>
</template>

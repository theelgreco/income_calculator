<script setup lang="ts">
import { AuthenticationServer } from "@/auth";
import router from "@/router";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";

const authServer = new AuthenticationServer();

const username = ref<string | null>(null);

const email = ref<string | null>(null);

const password = ref<string | null>(null);

async function signUp() {
    if (username.value && email.value && password.value) {
        try {
            await authServer.signUp({ email: email.value, password: password.value, username: username.value });
            await login();
        } catch (err: any) {
            console.error(err);
        }
    }
}

async function login() {
    if (username.value && email.value && password.value) {
        try {
            const { jwt } = await authServer.login({ email: email.value, password: password.value, username: username.value });
            localStorage.setItem("jwt", jwt);
            router.replace({ name: "year", params: { year: new Date().getFullYear() } });
        } catch (err: any) {
            console.error(err);
        }
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-full w-full">
        <div class="flex flex-col gap-20 border-1 border-grays-light-200 p-6 rounded min-w-[500px] max-w-full max-h-full shadow-lg">
            <h1 class="text-3xl">Login</h1>
            <form @submit.prevent="login" class="flex flex-col gap-12">
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col">
                        <label for="username">Username</label>
                        <InputText v-model="username" id="username" />
                    </div>
                    <div class="flex flex-col">
                        <label for="email">Email</label>
                        <InputText v-model="email" id="email" />
                    </div>
                    <div class="flex flex-col">
                        <label for="password">Password</label>
                        <InputText v-model="password" id="password" type="password" />
                    </div>
                </div>
                <div class="flex mt-auto gap-5">
                    <Button severity="secondary" label="Sign up" class="flex-grow" @click="signUp"></Button>
                    <Button label="Login" class="flex-grow" @click="login" type="submit"></Button>
                </div>
            </form>
        </div>
    </div>
</template>

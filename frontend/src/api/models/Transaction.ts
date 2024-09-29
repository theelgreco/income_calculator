/* tslint:disable */
/* eslint-disable */
/**
 * Income Calculator API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Transaction
 */
export interface Transaction {
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Transaction
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof Transaction
     */
    isExpense: boolean;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    amountInPence: number;
    /**
     * 
     * @type {boolean}
     * @memberof Transaction
     */
    isRecurring: boolean;
    /**
     * 
     * @type {Date}
     * @memberof Transaction
     */
    startDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof Transaction
     */
    finishDate: Date;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    recurrenceType: TransactionRecurrenceTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    recurrenceRate: number;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    recurrenceRateType: TransactionRecurrenceRateTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    specificDayOfWeek: number;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    specificDayOfMonth: number;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    firstLastDayOfMonth: TransactionFirstLastDayOfMonthEnum;
}


/**
 * @export
 */
export const TransactionRecurrenceTypeEnum = {
    Day: 'day',
    Week: 'week',
    Month: 'month',
    Year: 'year'
} as const;
export type TransactionRecurrenceTypeEnum = typeof TransactionRecurrenceTypeEnum[keyof typeof TransactionRecurrenceTypeEnum];

/**
 * @export
 */
export const TransactionRecurrenceRateTypeEnum = {
    SpecificDayOfWeek: 'specific_day_of_week',
    SpecificDayOfMonth: 'specific_day_of_month',
    FirstLastDayOfMonth: 'first_last_day_of_month'
} as const;
export type TransactionRecurrenceRateTypeEnum = typeof TransactionRecurrenceRateTypeEnum[keyof typeof TransactionRecurrenceRateTypeEnum];

/**
 * @export
 */
export const TransactionFirstLastDayOfMonthEnum = {
    FirstBusiness: 'first_business',
    LastBusiness: 'last_business',
    Last: 'last',
    Specific: 'specific'
} as const;
export type TransactionFirstLastDayOfMonthEnum = typeof TransactionFirstLastDayOfMonthEnum[keyof typeof TransactionFirstLastDayOfMonthEnum];


/**
 * Check if a given object implements the Transaction interface.
 */
export function instanceOfTransaction(value: object): value is Transaction {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('isExpense' in value) || value['isExpense'] === undefined) return false;
    if (!('amountInPence' in value) || value['amountInPence'] === undefined) return false;
    if (!('isRecurring' in value) || value['isRecurring'] === undefined) return false;
    if (!('startDate' in value) || value['startDate'] === undefined) return false;
    if (!('finishDate' in value) || value['finishDate'] === undefined) return false;
    if (!('recurrenceType' in value) || value['recurrenceType'] === undefined) return false;
    if (!('recurrenceRate' in value) || value['recurrenceRate'] === undefined) return false;
    if (!('recurrenceRateType' in value) || value['recurrenceRateType'] === undefined) return false;
    if (!('specificDayOfWeek' in value) || value['specificDayOfWeek'] === undefined) return false;
    if (!('specificDayOfMonth' in value) || value['specificDayOfMonth'] === undefined) return false;
    if (!('firstLastDayOfMonth' in value) || value['firstLastDayOfMonth'] === undefined) return false;
    return true;
}

export function TransactionFromJSON(json: any): Transaction {
    return TransactionFromJSONTyped(json, false);
}

export function TransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Transaction {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'userId': json['userId'],
        'name': json['name'],
        'isExpense': json['isExpense'],
        'amountInPence': json['amountInPence'],
        'isRecurring': json['isRecurring'],
        'startDate': (new Date(json['startDate'])),
        'finishDate': (new Date(json['finishDate'])),
        'recurrenceType': json['recurrenceType'],
        'recurrenceRate': json['recurrenceRate'],
        'recurrenceRateType': json['recurrenceRateType'],
        'specificDayOfWeek': json['specificDayOfWeek'],
        'specificDayOfMonth': json['specificDayOfMonth'],
        'firstLastDayOfMonth': json['firstLastDayOfMonth'],
    };
}

export function TransactionToJSON(value?: Transaction | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'createdAt': ((value['createdAt']).toISOString()),
        'userId': value['userId'],
        'name': value['name'],
        'isExpense': value['isExpense'],
        'amountInPence': value['amountInPence'],
        'isRecurring': value['isRecurring'],
        'startDate': ((value['startDate']).toISOString()),
        'finishDate': ((value['finishDate']).toISOString()),
        'recurrenceType': value['recurrenceType'],
        'recurrenceRate': value['recurrenceRate'],
        'recurrenceRateType': value['recurrenceRateType'],
        'specificDayOfWeek': value['specificDayOfWeek'],
        'specificDayOfMonth': value['specificDayOfMonth'],
        'firstLastDayOfMonth': value['firstLastDayOfMonth'],
    };
}


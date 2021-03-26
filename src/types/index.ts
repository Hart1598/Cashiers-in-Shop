export enum Days{
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
}

export enum Shifts{
    'Night',
    'Day',
}

export enum Sex{
    'Male',
    'Female'
}

export interface Cashier{
    id: number,
    fullname: string
    age: number,
    sex: Sex,
    yearsOfExperience: number,
    worksInShifts: Shifts,
    workingDays: [Days],
    otherJobs: [string],
}

export interface CashRegister{
    id: number,
    money: number,
    secretKey: string
}

export interface Shop{
    id: number,
    name: string,
    city: string,
    address: string,
    cashiers: [Cashier]
    cashRegisters: [CashRegister]
}


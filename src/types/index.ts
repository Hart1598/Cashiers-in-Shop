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

export interface ICashier{
    id?: number,
    fullname: string
    age: number,
    sex: Sex,
    yearsOfExperience: number,
    worksInShifts: Shifts,
    workingDays: [Days],
    otherJobs: [string],
    shop_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICashRegister{
    id?: number,
    money: number,
    secretKey: string
    shop_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IShop{
    id?: number,
    name: string,
    city: string,
    address: string,
    // cashiers?: [ICashier]
    // cashRegisters?: [ICashRegister]
    createdAt?: Date;
    updatedAt?: Date;
}



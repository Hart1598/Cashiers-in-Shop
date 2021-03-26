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
    fullname?: string
    age?: number,
    sex?: Sex,
    yearsOfExperience?: number,
    worksInShifts?: Shifts,
    otherJobs?: [string] | string,
    shop_id?: number,
    working_days_id?:number
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IWorkingDays{
    id?: number,
    working_dates: [Date],
    working_days_string: [Days],
    working_days: [number]
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
    name?: string,
    city?: string,
    address?: string,
    // cashiers?: [ICashier]
    // cashRegisters?: [ICashRegister]
    createdAt?: Date;
    updatedAt?: Date;
}



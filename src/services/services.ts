import {ICashier, ICashRegister, IShop, IWorkingDays} from "../types";
import {Cashier, CashRegister, Shop, WorkingDays} from '../models'
import {Op} from 'sequelize'

class Service{
    async createShop({name, city, address}: IShop): Promise<IShop>{
        try{
            const shop = await Shop.create({name, city, address})

            return shop
        }
        catch (e){
            throw new Error(e)
        }
    }

    async createCashier(cashier: ICashier):Promise<ICashier>{
        try{
            const createdCashier = await Cashier.create(cashier)
            return createdCashier
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async creatWorkingDays(workingDays: [IWorkingDays], CashierId: number | undefined):Promise<[IWorkingDays]>{
        try{
            const days: [object:IWorkingDays] = [{}]

            workingDays.forEach(async (workingDay) => {
                try{
                    const day = await WorkingDays.create({...workingDay, CashierId})
                    days.push(day)
                    return day
                }
                catch (e) {
                    console.log(e)
                    throw new Error(e)
                }
            })

            return days
        }
        catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }



    async createCashRegister(cashRegister: ICashRegister):Promise<ICashRegister>{
        try{
            const cash = await CashRegister.create(cashRegister)

            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getAllCashiers():Promise<ICashier[]>{
        try{
            const cashier = await Cashier.findAll({
                attributes: ['id', 'fullname', 'age', 'sex', 'yearsOfExperience', 'worksInShifts', 'otherJobs'],
                include:    [{
                        model: Shop,
                        attributes: ['id', 'name', 'city', 'address']
                    },
                    {
                        model: WorkingDays,
                        attributes: ['working_dates', 'working_days_string']
                    }]
            })

            return cashier
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getTargetCashiers1({city, yearsOfExperience, name, otherJobs}: ICashier & IShop):Promise<ICashier[]>{
        try{
            let OtherJobs
            if(typeof otherJobs === 'string'){
                OtherJobs = otherJobs.trim().split(',')
            }
            else{
                OtherJobs = otherJobs
            }
            const cashiers = await Cashier.findAll({
                where: {
                    yearsOfExperience:{
                        [Op.gte]: yearsOfExperience,
                    },
                    otherJobs: {
                        [Op.contains]: OtherJobs
                    }
                },
                include: [{
                        model: Shop,
                        where: {
                            city,
                            name
                        },
                        attributes: ['id', 'name', 'city', 'address']
                    },
                    {
                        model: WorkingDays,
                        attributes: ['working_dates', 'working_days_string']
                    }
                ]
            })

            return cashiers
        }
        catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }
    // model: Shop,
    // where: {
    //     address,
    //     name
    // },
    async getTargetCashiers2({name, address, worksInShifts, working_days_string}: IShop & IWorkingDays & ICashier):Promise<ICashier[] | void>{
        try {
            // let working_days
            // if(typeof working_days_string === "string"){
            //     working_days = working_days_string.split(',')
            // }
            // const cashier = await Cashier.findAll({
            //     where: {worksInShifts},
            //     include: [{
            //         model: Shop,
            //         where: {
            //             address,
            //             name
            //         },
            //     }, {
            //         model: WorkingDays,
            //         where: {
            //             working_days: {
            //                 [Op.contains]: working_days
            //             },
            //
            //         }
            //     }]
            //
            // })
            //
            // return cashier
        }
        catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }
}

export default new Service()
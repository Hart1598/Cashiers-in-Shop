import {ICashier, ICashRegister, IShop, IWorkingDays} from "../types";
import {Cashier, CashRegister, Shop, WorkingDays} from '../models'
import Sequelize, {Op} from 'sequelize'
import sequelize from "../db";

class Service{
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

    async deleteWorkingDays(workingDays: [IWorkingDays], CashierId: number | undefined):Promise<[IWorkingDays | null]>{
        try{
            const days: [object:IWorkingDays | null] = [{}]
            workingDays.forEach(async workingDay => {
                const day = await WorkingDays.findOne({
                    where: {
                        CashierId: CashierId,
                        working_dates: workingDay.working_dates
                    }
                })
                console.log(day)
                await day?.destroy()
                days.push(day)
            })

            return days
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

    async deleteCashier({id}:ICashier):Promise<ICashier>{
        const cashier = await Cashier.findOne({where: {id}})

        if(!cashier){
            throw new Error("Не найден касир с таким id")
        }

        const working_days = await WorkingDays.findAll({where: {CashierId: cashier.id}})

        if(working_days){
            working_days.forEach(day => day.destroy())
        }
        await cashier.destroy()

        return cashier
    }

    async updateCashier(cashier: ICashier):Promise<ICashier>{

        const updatedCashier = await Cashier.findOne({where: {id: cashier.id}})

        if(!updatedCashier){
            throw new Error("Не найден касир с таким id")
        }

        await updatedCashier.update(cashier)

        return updatedCashier
    }



    async getTargetCashiers2({name, address, worksInShifts, working_days_string}: IShop & IWorkingDays & ICashier):Promise<ICashier[]>{
        try {
            const cashier = await Cashier.findAll({
                where: {worksInShifts},
                include: [{
                    model: Shop,
                    where: {
                        address,
                        name
                    },
                    attributes: ['id', 'name', 'city', 'address']
                }, {
                    model: WorkingDays,
                    where:{working_days_string,
                        working_days:{
                            [Op.in]: [Sequelize.literal('SELECT "WorkingDays"."working_days" FROM "cashier" WHERE MOD("WorkingDays"."working_days", 2) = 0')]
                        }
                    },
                    attributes: ['working_dates', 'working_days_string']
                }]
            })
            return cashier
        }
        catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }
}

export default new Service()
import {ICashier, ICashRegister, IShop, IWorkingDays} from "../types";
import {Cashier, CashRegister, Shop, WorkingDays} from '../models'
import Sequelize, {Op} from 'sequelize'
import sequelize from "../db";

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

    async deleteShop({id}: IShop){
        try{
            const shop = await Shop.findOne({where: {id}})

            if(!shop){
                throw new Error("Не найден магазин с таким id")
            }

            await shop.destroy()

            return shop
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async updateShop(shop: IShop):Promise<IShop | undefined>{
        try{
            if(typeof shop.id === 'undefined'){
                throw new Error("Неверний тип id")
            }

            const updatedShop = await Shop.findOne({where: {id: shop.id}})

            if(!updatedShop){
                throw new Error("Не найден магазин с таким id")
            }

            await updatedShop.update(shop)

            return updatedShop
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getShopById(id: IShop):Promise<IShop>{
        try{
            const shop = await Shop.findOne({where: id})

            if(!shop){
                throw new Error("Не найден магазин с таким id")
            }
            return shop
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getShops():Promise<IShop[]>{
        try{
            const shops = await Shop.findAll()
            if(!shops){
                throw new Error("Магазини не найдены")
            }
            return shops
        }
        catch (e) {
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

    async deleteCashRegister(id: number | undefined):Promise<ICashRegister | null>{
        try{
            if(typeof id === 'undefined'){
                throw new Error("Неверний тип id")
            }

            const cash = await CashRegister.findOne({where: {id}})

            if(!cash){
                throw new Error("Не найден cash register с таким id")
            }

            await cash.destroy()

            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async updateCashRegister(cashRegister: ICashRegister):Promise<ICashRegister>{
        try{
            if(typeof cashRegister.id === 'undefined'){
                throw new Error("Неверний тип id")
            }

            const cash = await CashRegister.findOne({where: {id: cashRegister.id}})

            if(!cash){
                throw new Error("Не найден cash register с таким id")
            }

            await cash.update(cashRegister)


            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getCashRegisterById(id: number | undefined):Promise<ICashRegister | null>{
        if(typeof id === 'undefined'){
            throw new Error("Неверний тип id")
        }

        const cash = await CashRegister.findOne({where: {id}})

        if(!cash){
            throw new Error("Не найден cash register с таким id")
        }

        return cash
    }

    async getAllCashRegisters():Promise<ICashRegister[]>{
        try{
            const cash = await CashRegister.findAll()

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
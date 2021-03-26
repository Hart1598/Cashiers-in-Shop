import {ICashier, ICashRegister, IShop} from "../types";
import {Cashier, CashRegister, Shop} from '../models'
import {Op} from 'sequelize'

class Service{
    async createShop({name, city, address}: IShop): Promise<IShop | void>{
        try{
            const shop = await Shop.create({name, city, address})

            return shop
        }
        catch (e){
            throw new Error(e)
        }
    }

    async createCashier(cashier: ICashier):Promise<ICashier | void>{
        try{
            const createdCashier = await Cashier.create(cashier)

            return createdCashier
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async createCashRegister(cashRegister: ICashRegister):Promise<ICashRegister | void>{
        try{
            const cash = await CashRegister.create(cashRegister)

            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getAllCashiers():Promise<ICashier[] | void>{
        try{
            const cashier = await Cashier.findAll()

            return cashier
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getTargetCashiers1({city, yearsOfExperience, name, otherJobs}: ICashier & IShop):Promise<ICashier[] | void>{
        try{
            let OtherJobs
            if(typeof otherJobs === 'string'){
                OtherJobs = otherJobs.split(',')
            }
            else{
                OtherJobs = otherJobs
            }
            const cashiers = await Cashier.findAll({
                where: {
                    yearsOfExperience:{
                        [Op.gte]: yearsOfExperience
                    },
                    otherJobs: {
                        [Op.contained]: OtherJobs
                    }
                },
                include: {
                    model: Shop,
                    where: {
                        city,
                        name
                    }
                }
            })

            return cashiers
        }
        catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }
}

export default new Service()
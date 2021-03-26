import {ICashier, ICashRegister, IShop} from "../types";
import {Cashier, CashRegister, Shop} from '../models'

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
}

export default new Service()
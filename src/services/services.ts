import {ICashier, IShop} from "../types";
import {Cashier, Shop} from '../models'

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
        const createdCashier = await Cashier.create(cashier)

        return createdCashier
    }
}

export default new Service()
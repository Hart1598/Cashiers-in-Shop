import {IShop} from "../types";
import {Shop} from '../models'

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
}

export default new Service()
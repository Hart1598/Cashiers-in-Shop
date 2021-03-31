import {IShop} from "../types";
import {Shop} from "../models";

class ShopServices{
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
}

export default new ShopServices()
import {Request, Response} from "express";
import {IShop} from "../types";
import Service from "../services/shopServices";


class ShopContoller{
    async createShop(req: Request, res: Response){
        const {name, city, address}: IShop = req.body

        if(!name || !city || !address){
            res.status(400).json({message: "Введите name, city, address"})
        }

        try{
            const shop = await Service.createShop({name, city, address})
            if(!shop){
                res.status(400).json({message: "Не удалось создать магазин в бд"})
            }

            res.status(200).json(shop)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async deleteShop(req: Request, res: Response){
        const {id}: IShop = req.query

        if(!id){
            res.status(400).json({message: "Введите id"})
        }

        try{
            const deletedShop = await Service.deleteShop({id})

            res.status(200).json(deletedShop)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async updateShop(req: Request, res: Response){
        const {id,name, city, address}: IShop = req.body

        if(!id|| !name || !city || !address){
            res.status(400).json({message: "Введите id,name, city, address"})
        }

        try{
            const shop = await Service.updateShop({id,name, city, address})
            if(!shop){
                res.status(400).json({message: "Не удалось создать магазин в бд"})
            }

            res.status(200).json(shop)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async getShopById(req: Request, res: Response){
        const {id}: IShop = req.query

        if(!id){
            res.status(400).json({message: "Введите id"})
        }

        try{
            const shop = await Service.getShopById({id})

            res.status(200).json(shop)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }

    }

    async getShops(req: Request, res: Response){
        try{
            const shops = await Service.getShops()

            res.status(200).json(shops)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }
}

export default new ShopContoller()
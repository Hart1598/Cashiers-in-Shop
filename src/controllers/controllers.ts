import {Request, Response} from 'express'
import Service from '../services/services'


class Controller{

    async createShop(req: Request, res: Response){
        const {name, city, address} = req.body


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
            res.status(400).json({message: e})
        }


    }
}

export default new Controller()
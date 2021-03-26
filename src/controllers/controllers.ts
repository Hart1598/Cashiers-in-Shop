import {Request, Response} from 'express'
import Service from '../services/services'
import {ICashier, IShop} from "../types";


class Controller{

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
            res.status(400).json({message: e})
        }
    }

    async createCashier(req: Request, res: Response){
        const {fullname, age, sex, yearsOfExperience, worksInShifts, workingDays, otherJobs, shop_id}:ICashier = req.body

        if(!fullname || !age || !sex || !yearsOfExperience || !worksInShifts || !workingDays || !otherJobs || !shop_id){
            res.status(400).json({message: "Введите fullname, age, sex, yearsOfExperience, worksInShifts, workingDays, otherJobs, shop_id"})
        }

        try{
            const cashier = await Service.createCashier({fullname, age, sex, yearsOfExperience, worksInShifts, workingDays, otherJobs, shop_id})

            if(!cashier){
                res.status(400).json({message: "Не удалось создать касира в бд"})
            }

            res.status(200).json(cashier)
        }
        catch (e) {
            res.status(400).json({message: e})
        }



    }

}

export default new Controller()
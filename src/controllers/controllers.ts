import {Request, Response} from 'express'
import Service from '../services/services'
import {ICashier, ICashRegister, IShop} from "../types";


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


    async createCashRegister(req: Request, res: Response){
        const {money, shop_id, secretKey}: ICashRegister = req.body

        if(!money || !shop_id || !secretKey){
            res.status(400).json({message: "Введите money, shop_id, secretKey"})
        }

        try{
            const cashRegister = await Service.createCashRegister({money, shop_id, secretKey})

            if(!cashRegister){
                res.status(400).json({message: "Не удалось создать кассу в бд"})
            }

            res.status(200).json(cashRegister)
        }
        catch (e) {
            res.status(400).json({message: e})
        }
    }


    async getAllCashiers(req: Request, res: Response){
        try{
            const cashiers = await Service.getAllCashiers()

            if(!cashiers){
                res.status(400).json({message: "Не удалось получить касиров в бд"})
            }

            res.status(200).json(cashiers)
        }
        catch (e) {
            res.status(400).json({message: e})
        }
    }

    async getTargetCashiers1(req: Request, res: Response){
        const {city, name}: IShop = req.query
        const {yearsOfExperience, otherJobs}:ICashier = req.query

        try{
            const cashiers = await Service.getTargetCashiers1({city, yearsOfExperience, name, otherJobs})

            if(!cashiers){
                res.status(400).json({message: "Не удалось получить касиров в бд"})
            }

            res.status(200).json(cashiers)
        }
        catch (e) {
            res.status(400).json({message: e})
        }
    }

}

export default new Controller()
import {Request, Response} from 'express'
import Service from '../services/cashierServices'
import {ICashier, ICashRegister, IShop, IWorkingDays} from "../types";
import {combineWorkingDays} from "../helpers/combineWorkingDays";


class Controller{

    async createCashier(req: Request, res: Response){
        const {fullname, age, sex, yearsOfExperience, worksInShifts, otherJobs, shop_id}:ICashier = req.body
        const {workingDays} = req.body

        if(!fullname || !age || !sex || !yearsOfExperience || !worksInShifts || !workingDays || !otherJobs || !shop_id){
            res.status(400).json({message: "Введите fullname, age, sex, yearsOfExperience, worksInShifts, workingDays, otherJobs, shop_id"})
        }

        try{
            const cashier = await Service.createCashier({fullname, age, sex, yearsOfExperience, worksInShifts, otherJobs, shop_id})

            if(!cashier){
                res.status(400).json({message: "Не удалось создать касира в бд"})
            }
            const day = combineWorkingDays(workingDays)

            const days = await Service.creatWorkingDays(day, cashier.id)

            if(!days){
                res.status(400).json({message: "Не удалось создать рабочие дни в бд"})
            }
             res.status(200).json(cashier)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
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
            res.status(400).json({message: e.message})
        }
    }

    async getTargetCashiers1(req: Request, res: Response){
        const {city, name}: IShop = req.query
        const {yearsOfExperience, otherJobs}:ICashier = req.query

        console.log(city, name, yearsOfExperience, otherJobs)

        if(!city || !name || !yearsOfExperience || !otherJobs){
            res.status(400).json({message: "Введите city, name, yearsOfExperience, otherJobs"})
        }

        try{
            const cashiers = await Service.getTargetCashiers1({city, yearsOfExperience, name, otherJobs})

            if(!cashiers){
                res.status(400).json({message: "Не удалось получить касиров в бд"})
            }

            res.status(200).json(cashiers)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async getTargetCashiers2(req: Request, res: Response){
        const {name, address}:IShop = req.query
        const {worksInShifts}: ICashier = req.query
        const {working_days_string}:IWorkingDays = req.query

        if(!address || !name || !worksInShifts || !working_days_string){
            res.status(400).json({message: "Введите address, name, worksInShifts, working_days_string"})
        }

        try{
            const cashiers = await Service.getTargetCashiers2({name,address,worksInShifts, working_days_string})

            if(!cashiers){
                res.status(400).json({message: "Не удалось получить касиров в бд"})
            }

            res.status(200).json(cashiers)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

}

export default new Controller()
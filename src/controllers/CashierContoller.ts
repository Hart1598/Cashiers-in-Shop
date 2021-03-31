import {Request, Response} from 'express'
import Service from '../services/cashierServices'
import {ICashier, IShop, IWorkingDays} from "../types";
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

    async addCashierDays(req: Request, res: Response){
        const {id}: ICashier = req.body
        const {workingDays} = req.body

        if(!workingDays || !id){
            res.status(400).json({message: "Введите workingDays,id"})
        }

        const day = combineWorkingDays(workingDays)

        const days = await Service.creatWorkingDays(day, id)

        if(!days){
            res.status(400).json({message: "Не удалось создать рабочие дни в бд"})
        }
        res.status(200).json(day)
    }

    async deleteCashierDays(req: Request, res: Response){
        const {id}: ICashier = req.body
        const {workingDays} = req.body

        if(!workingDays || !id){
            res.status(400).json({message: "Введите workingDays,id"})
        }

        const day = combineWorkingDays(workingDays)

        const deletedDays = await Service.deleteWorkingDays(day, id)
        if(!deletedDays){
            res.status(400).json({message: "Не удалось удалить рабочие дни в бд"})
        }
        res.status(200).json(deletedDays)

    }

    async deleteCashier(req: Request, res: Response){
        const {id}: IShop = req.query

        if(!id){
            res.status(400).json({message: "Введите id"})
        }

        try{
            const deletedShop = await Service.deleteCashier({id})

            res.status(200).json(deletedShop)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async updateCashier(req: Request, res: Response){
        const {id,fullname, age, sex, yearsOfExperience, worksInShifts, otherJobs, shop_id}:ICashier = req.body

        if(!id || !fullname || !age || !sex || !yearsOfExperience || !worksInShifts || !otherJobs || !shop_id){
            res.status(400).json({message: "Введите id,fullname, age, sex, yearsOfExperience, worksInShifts, workingDays, otherJobs, shop_id"})
        }

        try{
            const updateCashier = await Service.updateCashier({
                id,
                fullname,
                age,
                sex,
                yearsOfExperience,
                worksInShifts,
                otherJobs,
                shop_id
            })

            res.status(200).json(updateCashier)
        }
        catch (e) {
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
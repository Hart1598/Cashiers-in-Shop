import {Request, Response} from 'express'
import Service from '../services/services'
import {ICashier, ICashRegister, IShop, IWorkingDays} from "../types";
import {combineWorkingDays} from "../helpers/combineWorkingDays";


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
            res.status(400).json({message: e.message})
        }
    }

    async deleteCashRegister(req: Request, res: Response){
        const {id}: ICashRegister = req.query

        if(!id){
            res.status(400).json({message: "Введите id"})
        }

        try{
            const deletedCashRegister = await Service.deleteCashRegister(id)

            if(!deletedCashRegister){
                res.status(400).json({message: "Не удалось удалить кассу в бд"})
            }

            res.status(200).json(deletedCashRegister)

        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async updateCashRegister(req: Request, res: Response){
        const {id, money, shop_id, secretKey}: ICashRegister = req.body

        if(!id || !money || !shop_id || !secretKey){
            res.status(400).json({message: "Введите id, money, shop_id, secretKey"})
        }

        try{
            const cashRegister = await Service.updateCashRegister({id,money, shop_id, secretKey})

            if(!cashRegister){
                res.status(400).json({message: "Не удалось создать кассу в бд"})
            }

            res.status(200).json(cashRegister)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async getCashRegisterById(req: Request, res: Response){
        const {id}: ICashRegister = req.query

        if(!id){
            res.status(400).json({message: "Введите id"})
        }

        try{
            const cashRegister = await Service.getCashRegisterById(id)

            if(!cashRegister){
                res.status(400).json({message: "Не удалось найти кассу в бд"})
            }

            res.status(200).json(cashRegister)
        }
        catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async getAllCashRegisters(req: Request, res: Response){
        try{
            const cash = await Service.getAllCashRegisters()

            if(!cash){
                res.status(400).json({message: "Не удалось найти кассу в бд"})
            }

            res.status(200).json(cash)
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
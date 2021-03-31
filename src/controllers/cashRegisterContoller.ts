import {Request, Response} from "express";
import {ICashRegister} from "../types";
import Service from "../services/cashRegisterServices";

class CashRegisterContoller{
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
}

export default new CashRegisterContoller()
import {ICashRegister} from "../types";
import {CashRegister} from "../models";

class CashRegisterServices{
    async createCashRegister(cashRegister: ICashRegister):Promise<ICashRegister>{
        try{
            const cash = await CashRegister.create(cashRegister)

            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async deleteCashRegister(id: number | undefined):Promise<ICashRegister | null>{
        try{
            if(typeof id === 'undefined'){
                throw new Error("Неверний тип id")
            }

            const cash = await CashRegister.findOne({where: {id}})

            if(!cash){
                throw new Error("Не найден cash register с таким id")
            }

            await cash.destroy()

            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async updateCashRegister(cashRegister: ICashRegister):Promise<ICashRegister>{
        try{
            if(typeof cashRegister.id === 'undefined'){
                throw new Error("Неверний тип id")
            }

            const cash = await CashRegister.findOne({where: {id: cashRegister.id}})

            if(!cash){
                throw new Error("Не найден cash register с таким id")
            }

            await cash.update(cashRegister)


            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getCashRegisterById(id: number | undefined):Promise<ICashRegister | null>{
        if(typeof id === 'undefined'){
            throw new Error("Неверний тип id")
        }

        const cash = await CashRegister.findOne({where: {id}})

        if(!cash){
            throw new Error("Не найден cash register с таким id")
        }

        return cash
    }

    async getAllCashRegisters():Promise<ICashRegister[]>{
        try{
            const cash = await CashRegister.findAll()

            return cash
        }
        catch (e) {
            throw new Error(e)
        }
    }
}

export default new CashRegisterServices()
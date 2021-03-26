import {Request, Response} from 'express'

class controller{
    async createShop(req: Request, res: Response){
        const {name, city, address} = req.body

        if(!name || !city || !address){
            res.status(400).json({message: "Введите name, city, address"})
        }

        try{

        }
        catch (e) {
            res.status(400).json({message: e})
        }


    }
}

export default new controller()
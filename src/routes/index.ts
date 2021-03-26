import {Router} from 'express'
import Controllers from "../controllers/controllers";

const router: Router = Router()


router.post('/shop', Controllers.createShop)
router.post('/cashier', Controllers.createCashier)
router.post('/cashRegister', Controllers.createCashRegister)
router.get('/getAllCashiers', Controllers.getAllCashiers)
router.get('/getTargetCashiers1', Controllers.getTargetCashiers1)







export default router


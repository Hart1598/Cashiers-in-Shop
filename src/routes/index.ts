import {Router} from 'express'
import Controllers from "../controllers/controllers";

const router: Router = Router()


router.post('/shop', Controllers.createShop)





router.post('/cashier', Controllers.createCashier)


router.post('/cashRegister', Controllers.createCashRegister)
router.delete('/cashRegister', Controllers.deleteCashRegister)
router.put('/cashRegister', Controllers.updateCashRegister)
router.get('/cashRegister', Controllers.getCashRegisterById)
router.get('/cashRegisterAll', Controllers.getAllCashRegisters)

router.get('/getAllCashiers', Controllers.getAllCashiers)
router.get('/getTargetCashiers1', Controllers.getTargetCashiers1)
router.get('/getTargetCashiers2', Controllers.getTargetCashiers2)






export default router


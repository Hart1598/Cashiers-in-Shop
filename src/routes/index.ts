import {Router} from 'express'
import CashierContoller from "../controllers/CashierContoller";
import ShopContoller from '../controllers/shopContoller'
import CashRegisterContoller from '../controllers/cashRegisterContoller'
const router: Router = Router()


router.post('/shop', ShopContoller.createShop)
router.delete('/shop', ShopContoller.deleteShop)
router.put('/shop', ShopContoller.updateShop)
router.get('/shop', ShopContoller.getShopById)
router.get('/shopAll', ShopContoller.getShops)


router.post('/cashRegister', CashRegisterContoller.createCashRegister)
router.delete('/cashRegister', CashRegisterContoller.deleteCashRegister)
router.put('/cashRegister', CashRegisterContoller.updateCashRegister)
router.get('/cashRegister', CashRegisterContoller.getCashRegisterById)
router.get('/cashRegisterAll', CashRegisterContoller.getAllCashRegisters)


router.post('/cashier', CashierContoller.createCashier)
router.post('/cashier/days', CashierContoller.addCashierDays)
router.delete('/cashier/days', CashierContoller.deleteCashierDays)
router.delete('/cashier', CashierContoller.deleteCashier)
router.put('/cashier', CashierContoller.updateCashier)
router.get('/getAllCashiers', CashierContoller.getAllCashiers)
router.get('/getTargetCashiers1', CashierContoller.getTargetCashiers1)
router.get('/getTargetCashiers2', CashierContoller.getTargetCashiers2)






export default router


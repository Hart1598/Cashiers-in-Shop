import {Router} from 'express'
import Controllers from "../controllers/controllers";

const router: Router = Router()


router.post('/shop', Controllers.createShop)
router.post('/cashier', Controllers.createCashier)








export default router


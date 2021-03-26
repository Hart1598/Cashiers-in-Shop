import {Router} from 'express'
import Controllers from "../controllers/controllers";

const router: Router = Router()


router.post('/shop', Controllers.createShop)








export default router


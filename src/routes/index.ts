import {Router} from 'express'
import controllers from "../controllers/controllers";

const router: Router = Router()


router.post('/shop', controllers.createShop)








export default router


import {Router} from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controller';
import { authJwt, verifySinup } from '../middlewares';

router.post('/',[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySinup.checkRolesExisted
],userCtrl.createUser)

export default router;
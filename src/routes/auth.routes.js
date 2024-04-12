import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySinup } from "../middlewares";

router.post(
  "/signup",
  [verifySinup.checkDuplicateUsernameOrEmail, verifySinup.checkRolesExisted],
  authCtrl.signUp
);
router.post("/signin", authCtrl.signin);

export default router;

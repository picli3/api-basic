import { ROLES } from "../models/Roles"
import User from "../models/User"

export const checkDuplicateUsernameOrEmail = async (req,res,next)=>{
    const user = await User.findOne({username: req.body.username})
    if (user) {
        return res.json({message: "usuario ya existe"})
    }
    const email = await User.findOne({email: req.body.email})
    if (email) {
        return res.json({message: "email ya existe"})
    }
    next()
}


export const checkRolesExisted =(req,res, next)=>{
    if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
            res.json({message: "role, no existe"})
            
        }
        next()
    }        
    }
}
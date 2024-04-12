import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config';
import Role from '../models/Roles'


export const signUp = async(req,res)=>{
    const {username, email, password, roles} = req.body;
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    if (roles) {
        const foundRole = await Role.find({name: {$in: roles}})
        newUser.roles = foundRole.map(role => role._id)
    }else{
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    const token = jwt.sign({id:savedUser._id},config.SECRET,{
        expiresIn:86400// son 24 horas, oase dura 24 horas
    })
    res.json({token})
}


export const signin = async(req,res)=>{
    const userFound = await User.findOne({email: req.body.email}).populate("roles")
    if (!userFound) return res.json({message: "User not found"}) 
    
    console.log(userFound)

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.json(401,{message: "Invalid Password"}) 
    const token = jwt.sign({id:userFound._id},config.SECRET,{
        expiresIn:86400// son 24 horas, oase dura 24 horas
    })
    res.json({token})
}
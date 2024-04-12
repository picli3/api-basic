import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Roles from "../models/Roles";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.json({ message: "no token provided" });
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id; //todas las funciones con acceso al req tienen acceso al userIS
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.json({ message: "User not found" });
    next();
  } catch (error) {
    return res.json({ message: error });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.json({ message: "require moderator role" });
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Roles.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.json({ message: "require admin role" });
};

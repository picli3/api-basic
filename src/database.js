import e from "express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://maykol:123456@mongo-api:27017/companydb?authSource=admin")
  .then((db) => console.log("db conectado"))
  .catch((e) => console.log(e));

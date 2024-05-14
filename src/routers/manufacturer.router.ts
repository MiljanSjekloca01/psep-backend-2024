import { Router } from "express";
import asyncHandler from "express-async-handler"
import { ManufacturerService } from "../services/manufacturer.service";

export const manufacturerRouter = Router()


manufacturerRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await ManufacturerService.getAllManufacturers())
    }
))
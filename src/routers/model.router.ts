import { Router } from "express";
import asyncHandler from "express-async-handler"
import { ModelService } from "../services/model.service";

export const modelRouter = Router()


modelRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.getAllModels())
    }
))
import { Router } from "express";
import asyncHandler from "express-async-handler"
import { ModelService } from "../services/model.service";

export const modelRouter = Router()


modelRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.getAllModels())
    }
))

modelRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.getModelbyId(+req.params.id))
    }
))

modelRouter.get("/:id/simple",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.getModelWithoutRelationsById(+req.params.id))
    }
))

modelRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.createModel(req.body))
    }
))

modelRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.updateModelById(+req.params.id,req.body))
    }
))

modelRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await ModelService.deleteModelById(+req.params.id))
    }
))
import { Router } from "express";
import { TypeService } from "../services/type.service";
import asyncHandler from "express-async-handler"

export const typeRouter = Router()


typeRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await TypeService.getAllTypes())
    }
))

typeRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await TypeService.getTypeById(+req.params.id))
    }
))


typeRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await TypeService.createType(req.body))
    }
))

typeRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await TypeService.updateTypeById(+req.params.id,req.body))
    }
))

typeRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await TypeService.deleteTypeById(+req.params.id))
    }
))



/*
typeRouter.get("/",async (req,res) => {
    try {
        res.json(await TypeService.getAllTypes())
    }catch(e){
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})
*/



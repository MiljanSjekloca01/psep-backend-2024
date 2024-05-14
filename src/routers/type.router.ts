import { Router } from "express";
import { TypeService } from "../services/type.service";
import asyncHandler from "express-async-handler"

export const typeRouter = Router()


typeRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await TypeService.getAllTypes())
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



import { Router } from "express";
import asyncHandler from "express-async-handler"
import { StateService } from "../services/state.service";

export const stateRouter = Router()


stateRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await StateService.getAllStates())
    }
))
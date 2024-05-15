import { Router } from "express";
import asyncHandler from "express-async-handler"
import { StateService } from "../services/state.service";

export const stateRouter = Router()


stateRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await StateService.getAllStates())
    }
))


stateRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await StateService.getStateById(+req.params.id))
    }
))

stateRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await StateService.createState(req.body))
    }
))

stateRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await StateService.updateState(+req.params.id,req.body))
    }
))

stateRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await StateService.deleteStateById(+req.params.id))
    }
))
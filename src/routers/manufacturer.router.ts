import { Router } from "express";
import asyncHandler from "express-async-handler"
import { ManufacturerService } from "../services/manufacturer.service";

export const manufacturerRouter = Router()


manufacturerRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await ManufacturerService.getAllManufacturers())
    }
))

manufacturerRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await ManufacturerService.getManufacturerById(+req.params.id))
    }
))

manufacturerRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await ManufacturerService.createManufacturer(req.body))
    }
))

manufacturerRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await ManufacturerService.updateManufacturerById(+req.params.id,req.body))
    }
))

manufacturerRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await ManufacturerService.deleteManufacturerById(+req.params.id))
    }
))
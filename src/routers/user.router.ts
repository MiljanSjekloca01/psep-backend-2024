import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../services/user.service";

export const userRouter = Router()

userRouter.post("/login",asyncHandler(
    async (req,res) => {
        res.json(await UserService.login(req.body))
    }
))

userRouter.post("/refresh",asyncHandler(
    async (req,res) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        res.json(await UserService.refreshToken(token))
    }
))
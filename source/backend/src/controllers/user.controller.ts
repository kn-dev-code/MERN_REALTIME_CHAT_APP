import {Request, Response} from "express"
import { asyncHandler } from "../middlewares/asyncHandler.middleware"
import { HTTPSTATUS } from "../config/http.config";
import { getUsersService } from "../services/user.service";
import { UnauthorizedException } from "../utils/app-error";

export const getUsersController = asyncHandler(async(req:Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new UnauthorizedException("User not found in request")
  }
  const users = await getUsersService(userId.toString())
  return res.status(HTTPSTATUS.OK).json({
    message: "Users retrieved successfully",
    users,
  })
})


import {Request, Response} from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { sendMessageSchema } from "../validators/message.validator";
import { UnauthorizedException } from "../utils/app-error";
import { sendMessageService } from "../services/message.service";


export const sendMessageController = asyncHandler(async(req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) throw new UnauthorizedException("User not found or not authroized");

  const body = sendMessageSchema.parse(req.body);

  const result = await sendMessageService(userId.toString(), body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Message sent successfully",
    ...result,
  })
})
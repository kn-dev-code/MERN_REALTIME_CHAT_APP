import {Request, Response} from "express"
import { asyncHandler } from "../middlewares/asyncHandler.middleware"
import { HTTPSTATUS } from "../config/http.config"
import { chatIdSchema, createChatSchema } from "../validators/chat.validator"
import { createChatService, getSingleChatService, getUserChatService } from "../services/chat.service"
import { NotFoundException, UnauthorizedException } from "../utils/app-error"


export const createChatController = asyncHandler(async(req: Request, res: Response) => {
const userId = req.user?._id;

if (!userId) throw new UnauthorizedException("User not authorized.");

const body = createChatSchema.parse(req.body)
const chat = await createChatService(userId.toString(), body);


return res.status(HTTPSTATUS.OK).json({
  message: "Chat created or retrieved successfully",
  chat,
})
})


export const getUserChatsController = asyncHandler(async(req: Request, res: Response) => {
const userId = req.user?._id;
if (!userId) throw new UnauthorizedException("User not authorized.");

const chats = await getUserChatService(userId.toString());


return res.status(HTTPSTATUS.OK).json({
  message: "User chats retrieved successfully",
  chats,
})
})

export const getSingleChatController = asyncHandler(async(req: Request, res: Response) => {
const userId = req.user?._id;
if (!userId) throw new UnauthorizedException("User not authorized.");

const {id} = chatIdSchema.parse(req.params);
const {chat, messages} = await getSingleChatService(id, userId.toString());

if (!chat) throw new NotFoundException("Chat not found");

return res.status(HTTPSTATUS.OK).json({
  message: "Chat retrieved successfully",
  chat,
  messages,
})
})




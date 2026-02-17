import cookieParser from "cookie-parser";
import "dotenv/config"
import cors from "cors"
import express, {Request, Response} from "express";
import { HTTPSTATUS } from "./config/http.config";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import connectDatabase from "./config/database.config";
import "./config/passport.config"
import passport from "passport";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(passport.initialize());
app.get("/health", asyncHandler(async(req: Request, res: Response) => {
res.status(HTTPSTATUS.OK).json({
  message: "Server is healthy", status: "OK"
})
}));
app.use("/api", routes);
app.use(errorHandler);

app.listen(Env.PORT, async() => {
  await connectDatabase()
  console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`)
})
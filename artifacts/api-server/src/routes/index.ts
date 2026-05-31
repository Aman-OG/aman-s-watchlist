import { Router, type IRouter } from "express";
import healthRouter from "./health";
import mediaRouter from "./media";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(mediaRouter);
router.use(statsRouter);

export default router;

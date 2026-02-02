import express from "express";
import { generateThumbnail } from "../controllers/ThumbnailController.js";


export const ThumbnailRouter = express.Router();

ThumbnailRouter.post('/generate',generateThumbnail)
ThumbnailRouter.delete('/delete/:id',generateThumbnail)


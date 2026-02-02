import express from 'express';
import { getThumbnailbyId, getUsersThumbnails } from '../controllers/UserControllers.js';

export const UserRouter = express.Router();

UserRouter.get('/thumbanils',getUsersThumbnails)
UserRouter.get('/thumbnail/:id',getThumbnailbyId)
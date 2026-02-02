import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { ConnectDB } from './src/db/db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { AuthRouter } from './src/routes/authRoutes.js';
import { ThumbnailRouter } from './src/routes/Thumbnail.js';
import { UserRouter } from './src/routes/UserRoutes.js';

declare module 'express-session' {
    interface SessionData{
        isLoggIn:boolean;
        userId:String
    }
}
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173' , 'http://localhost:5000'],
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24*7},
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI as string,
        collectionName: 'sessions'
    })
}))

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/auth',AuthRouter);
app.use('/api/thumbnail',ThumbnailRouter);
app.use('/api/user',UserRouter);

ConnectDB();


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
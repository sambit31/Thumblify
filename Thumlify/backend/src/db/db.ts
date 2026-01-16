import mongoose from 'mongoose';

export const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        .then(()=>{
            console.log("MONGODB CONNECTED...");
        })
    } catch (err) {
         console.log("Error connecting to MongoDB:", err);
    }
}
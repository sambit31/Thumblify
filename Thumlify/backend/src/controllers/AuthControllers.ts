import {Request,Response} from 'express'
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req:Request, res:Response)=>{
    try {
        const {name,email,password} = req.body;

        // basic validation
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
        
        // find user by email
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'User already exists'});

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // create user
        const newUser = new User({name, email,  password:hashedPassword});

        //save user
        await newUser.save();

        //for session
        req.session.isLoggIn = true;
        req.session.userId = newUser._id;

        return res.json({
            message: 'Account created Succesfully',
            user: {
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.isLoggIn = true;
        req.session.userId = user._id;
   
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const logoutUser = async (req: Request, res: Response)=>{
    req.session.destroy((error:any)=>{
        if(error){
            console.log(error)
            return res.status(500).json({message:error.message})
        }
    })
    return res.json({message:'logout successful'});
}

export const verifyUser = async (req: Request, res: Response)=>{
    try {
        const {userId} = req.session;
        const user = await User.findById(userId).select('-password')

        if(!user) return res.status(400).json({message: 'Invalid user'});

        return res.json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

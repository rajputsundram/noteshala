import User from "@/models/user";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { request } from "http";
import {NextResponse} from "next/server";

export const POST=async(request)=>{
    const {email,password}=await request.json();
    await connect();

    const existingUser=await User.findOne({email});
    if(existingUser)
    {
        return new NextResponse("Email is already in used",{status:400})
    }

    const hashedPassword =await bcrypt.hash(password,5);
    const newUser=new User({
        email,
        password:hashedPassword,
    })
    try{
        await newUser.save();
        return new NextResponse("user is registered" ,{status:200})


    }
    catch(err){
        return new NextResponse(err,{
            status:500,
        })

    }

}
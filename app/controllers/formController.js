'use server'

import { getCollection } from "@/lib/db";
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";


export const login = async (prevState,formData) => {

    const errors = {};

    const newUser = {
        username : formData.get('username'),
        password : formData.get('password')
    }


    if(newUser.username.length < 3) errors.username = "username must be greater than 3 alphabets!"
    if(newUser.username.length > 30) errors.username = "username cant be greater than 30 alphabets!"
    if(newUser.username.length == "") errors.username = "username cant be empty!"
   
    if(newUser.password.length < 12) errors.password = "password must be greater than 12 caractere!"
    if(newUser.password.length > 50) errors.password = "password cant be greater than 50 caractere!"
    if(newUser.password.length == "") errors.password = "password cant be empty!"


    if(errors.username){
        return {
            status : 'error',
            data : errors
        }
    }


    const failObj = {
        status : false,
        msg : ''
    }

    const collection = await getCollection('users');
    const user = await collection.findOne({username:newUser.username});

    if(!user) {
        return failObj.msg = 'username / password wrong!'
    }
    console.log(user)
    const passwordCheck = bcrypt.compareSync(newUser.password,user.password);

    if(!passwordCheck){
        return failObj.msg = 'username / password wrong!'
    }


    const jwtToken = jwt.sign({userId:user._id},process.env.SECRET_KEY_JWT,{expiresIn : '24h'})


    cookies().set('HaikuUser',jwtToken,{
        secure : true,
        httpOnly : true,
        sameSite : 'strict',
        expires : new Date(Date.now() + 1000 * 60 * 60 * 24)
    })


    redirect('/')
}


export const logout = async () => {
    cookies().delete('HaikuUser');
    redirect('/')
}


export const register = async function (prevState,formData) {
    
    const errors = {};

    const newUser = {
        username : formData.get('username'),
        password : formData.get('password')
    }

    if(newUser.username.length < 3) errors.username = "username must be greater than 3 alphabets!"
    if(newUser.username.length > 30) errors.username = "username cant be greater than 30 alphabets!"
    if(newUser.username.length == "") errors.username = "username cant be empty!"
   
   
    if(newUser.password.length < 12) errors.password = "password must be greater than 12 caractere!"
    if(newUser.password.length > 50) errors.password = "password cant be greater than 50 caractere!"
    if(newUser.password.length == "") errors.password = "password cant be empty!"

    if(errors.username){
        return {
            status : 'error',
            data : errors
        }
    }

    // password hashing
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password,salt)


    const userCollection = await getCollection('users');
    const newInsertedUser = await userCollection.insertOne(newUser);
    const userId = newInsertedUser.insertedId.toString();

    // jsonwebtoken 
    const jsonToken = jwt.sign({userId},process.env.SECRET_KEY_JWT,{expiresIn : '24h'})


    // make a cookie
    cookies().set('HaikuUser', jsonToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true, 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    });

    
    return {
        status : 'success'
    }
}

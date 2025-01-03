'use server'


import { getCollection } from "@/lib/db";
import { verifyToken } from "@/lib/tokenVerfy"
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { use } from "react";




const sharedHaiku = (formData,user) => {
    const errors = {};
    const newHaiku = {
        line1:formData.get('line1'),
        line2:formData.get('line2'),
        line3:formData.get('line3'),
        author : ObjectId.createFromHexString(user.userId) 
    }

    if(newHaiku.line1.length == 0) return errors.line1 = 'You must provide a value!'
    if(newHaiku.line2.length == 0) return errors.line2 = 'You must provide a value!'
    if(newHaiku.line3.length == 0) return errors.line3 = 'You must provide a value!'

    return {
        errors,
        newHaiku
    }
}




export const createHaiku = async (prevState,formData) => {

    const user = await verifyToken();
    if(!user){
        return redirect('/')
    }
    const {newHaiku,errors} = await sharedHaiku(formData,user)

    if(errors.line1 || errors.line2 || errors.line3){
        return {
            errors
        }
    }

    const HaikuCollection = await getCollection('haikus');
    const insertedHaiku = await HaikuCollection.insertOne(newHaiku);
    return redirect('/');
}
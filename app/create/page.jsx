'use server'


import React from 'react'
import { verifyToken } from '@/lib/tokenVerfy'
import { redirect } from 'next/navigation'
import HaikuForm from '../components/HaikuForm'

export default async function page(){

  const user = await verifyToken()
  if(!user){
    return redirect('/')
  }
  return (
    <div>
        <HaikuForm />
    </div>
  )
}

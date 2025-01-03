'use client'

import React, { useActionState } from 'react'
import { createHaiku } from '../controllers/haikuController'



const HaikuForm = () => {
    
    const [formState,formAction] = useActionState(createHaiku,{})

  return (
    <div>
        <form action={formAction} className='max-w-5xl mx-auto'>
            <div className='flex flex-col w-full '>
              <input type="text" name='line1' placeholder="line#1" className=" my-1 input input-bordered w-full max-w-xs" />
              {formState.data?.line1 && (
                <Alertjsx data={formState.data?.username}/>
              )}
            </div>
            <div className='flex flex-col w-full '>
              <input type="text" name='line2' placeholder="line#2" className=" my-1 input input-bordered w-full max-w-xs" />
              {formState.data?.username && (
                <Alertjsx data={formState.data?.line2}/>
              )}
            </div>
            <div className='flex flex-col w-full '>
              <input type="text" name='line3' placeholder="line#3" className=" my-1 input input-bordered w-full max-w-xs" />
              {formState.data?.username && (
                <Alertjsx data={formState.data?.line3}/>
              )}
            </div>
              <button className='btn btn-primary w-full mt-5'>Submit</button>
       </form>
    </div>
  )
}

export default HaikuForm
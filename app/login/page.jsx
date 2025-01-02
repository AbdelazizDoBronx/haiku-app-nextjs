'use client'
import React, { useActionState } from 'react'
import { login } from '../controllers/formController'
import Alertjsx from '../components/Alertjsx'

const FormComponent = () => {
 

  const [formState,formAction] = useActionState(login,{})

  return (
    <form action={formAction} className='max-w-5xl mx-auto'>
      <div className='flex flex-col w-full '>
      <input type="text" name='username' placeholder="Username" className=" my-1 input input-bordered w-full max-w-xs" />
      {formState.data?.username && (
        <Alertjsx data={formState.data?.username}/>
      )}
      </div>
      <div className='my-5 w-full '>
      <input type="password" name='password' placeholder="password" className="input input-bordered w-full max-w-xs" />
      {formState.data?.password && (
        <Alertjsx data={formState.data?.password}/>
      )}
      </div>
      <button className='btn btn-primary w-full mt-5'>Submit</button>
    </form>
  )
}

export default FormComponent
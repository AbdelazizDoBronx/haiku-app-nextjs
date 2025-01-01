'use client'
import React, { useActionState } from 'react'
import { useFormState } from 'react-dom'
import { register } from '../controllers/formController'
import Alertjsx from './Alertjsx'

const FormComponent = () => {
 

  const [formState,formAction] = useActionState(register,{})

  console.log(formState)
  return (
    <form action={formAction} >
      <div className='flex flex-col'>
      <input type="text" name='username' placeholder="Username" className=" my-1 input input-bordered w-full max-w-xs" />
      {formState.data?.username && (
        <Alertjsx data={formState.data?.username}/>
      )}
      </div>
      <div className='my-5'>
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
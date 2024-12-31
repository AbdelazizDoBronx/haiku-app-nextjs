import React from 'react'
import FormComponent from './components/FormComponent'
const Home = () => {
  return (
    <div className='max-w-5xl mx-auto p-5 flex justify-center items-center flex-col gap-5'>
      <h3 className='text-3xl text-center font-semibold'>Login to your account</h3>
      <FormComponent/>
    </div>
  )
}

export default Home
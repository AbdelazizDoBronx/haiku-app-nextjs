import React, { use } from 'react'
import FormComponent from './components/FormComponent'
import { verifyToken } from '@/lib/tokenVerfy';
import Header from './components/Header';
import AllHaikus from './components/AllHaikus';
const Home = async () => {
  const user = await verifyToken();
  return (
    <div className='max-w-5xl mx-auto p-5 flex justify-center items-center flex-col gap-5'>
      <Header/>
      {user && (
        <>
          <h2>Welcome to your Account!</h2>
          <AllHaikus user={user}/>
        </>
      )}
      {!user && (
        <>
          <h3 className='text-3xl text-center font-semibold'>Login to your account</h3>
          <FormComponent/>
        </>
      )}
    </div>
  )
}

export default Home
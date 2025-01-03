import { getCollection } from '@/lib/db'
import { ObjectId } from 'mongodb'
import React from 'react'


async function getHaikus(id) {
  const collection = await getCollection("haikus")
  const results = await collection
    .find({ author: ObjectId.createFromHexString(id) })
    .sort({ _id: -1 })
    .toArray()

  console.log(results)  
  return results
}

const AllHaikus = async ({user}) => {

  const haikus = await getHaikus(user.userId)
  return (
    <div>AllHaikus</div>
  )
}

export default AllHaikus
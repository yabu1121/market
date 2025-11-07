'use client'

import { useRouter } from "next/navigation"

const UpdateButton = () => {
  const router = useRouter();
  const handleGoUpdate = () => {
    router.push("/item/update");
  }
  return (
    <button onClick={handleGoUpdate} className="bg-green-400 hover:bg-green-300 m-4 px-4 rounded text-white">編集</button>
  )
}

export default UpdateButton

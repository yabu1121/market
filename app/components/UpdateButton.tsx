'use client'

import { useRouter } from "next/navigation"

interface Props {
  params:string
}

const UpdateButton = ({params}:Props) => {
  const router = useRouter();
  const handleGoUpdate = () => {
    router.push(`https://market-he6qrhb7k-yabus-projects-9834b47a.vercel.app/item/update/${params}`);
  }
  return (
    <button onClick={handleGoUpdate} className="bg-green-400 hover:bg-green-300 m-4 px-4 rounded text-white">編集</button>
  )
}

export default UpdateButton

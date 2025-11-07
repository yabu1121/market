'use client'

import { useRouter } from "next/navigation"

const ReturnButton = () => {
  const router = useRouter();
  const handleReturnTop = () => {
    router.push("/");
  }
  return (
    <button onClick={handleReturnTop} className="bg-blue-400 hover:bg-blue-300 m-4 px-4 rounded text-white">topに戻る</button>
  )
}

export default ReturnButton

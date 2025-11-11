'use client'

import { useRouter } from "next/navigation"

interface Props {
  params: string
}

const DeleteButton = ({ params }: Props) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("本当にこのアイテムを削除しますか？")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("ログインが必要です")
        router.push("/login")
        return
      }

      const payload = JSON.parse(atob(token.split('.')[1]))

      const res = await fetch(`/api/item/delete/${params}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: payload.email
        })
      })

      const jsonData = await res.json()

      if (res.ok) {
        alert("削除成功")
        router.push("/")
        router.refresh()
      } else {
        alert(jsonData.message || "削除失敗")
      }
    } catch (error) {
      alert("削除に失敗しました")
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      className="bg-red-400 hover:bg-red-300 m-4 px-4 rounded text-white"
    >
      削除
    </button>
  )
}

export default DeleteButton






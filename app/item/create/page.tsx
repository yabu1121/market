'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreatePage = () => {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("ログインが必要です")
        router.push("/login")
        return
      }

      const payload = JSON.parse(atob(token.split('.')[1]))

      const res = await fetch("/api/item/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          price: parseFloat(price),
          image: image || null,
          description: description || null,
          email: payload.email
        })
      })

      const jsonData = await res.json()

      if (res.ok) {
        alert("投稿成功")
        router.push("/")
        router.refresh()
      } else {
        alert(jsonData.message || "投稿失敗")
      }
    } catch (error) {
      alert("投稿に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        placeholder="タイトル"
        className="w-[60vw] border rounded-lg shadow-2xl block m-4 mx-auto"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => { setPrice(e.target.value) }}
        placeholder="値段"
        className="w-[60vw] border rounded-lg shadow-2xl block m-4 mx-auto"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => { setImage(e.target.value) }}
        placeholder="画像url"
        className="w-[60vw] border rounded-lg shadow-2xl block m-4 mx-auto"
      />
      <textarea
        value={description}
        onChange={(e) => { setDescription(e.target.value) }}
        placeholder="詳細"
        className="w-[60vw] h-[40vh] border rounded-lg shadow-2xl block m-4 mx-auto"
      />
      <button type="submit" className="bg-blue-300 mr-20 px-8 py-2 rounded mx-auto block">投稿</button>
    </form>
  )
}

export default CreatePage

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
          image: image,
          description: description
        })
      })
      const jsonData = await res.json()
      if (res.ok) {
        alert("投稿成功")
        router.push("/")
      } else {
        alert(jsonData.message || "投稿失敗")
      }
    } catch (error) {
      alert("投稿失敗")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        placeholder="タイトル"
        className="border rounded-lg shadow-2xl block m-4"
        required
      />
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => { setPrice(e.target.value) }}
        placeholder="値段"
        className="border rounded-lg shadow-2xl block m-4"
        required
      />
      <input
        id="image"
        type="text"
        value={image}
        onChange={(e) => { setImage(e.target.value) }}
        placeholder="画像url"
        className="border rounded-lg shadow-2xl block m-4"
      />
      <textarea
        id="desctipiton"
        value={description}
        onChange={(e) => { setDescription(e.target.value) }}
        placeholder="詳細"
        className="border rounded-lg shadow-2xl block m-4"
      ></textarea>
      <button type="submit" className="bg-blue-300 px-8 py-4 rounded">投稿</button>
    </form>
  )
}

export default CreatePage

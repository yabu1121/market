'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
        const jsonData = await res.json()

        if (jsonData.singleItem) {
          const item = jsonData.singleItem
          setTitle(item.title || "")
          setPrice(item.price?.toString() || "")
          setImage(item.image || "")
          setDescription(item.description || "")
        }
      } catch (error) {
        alert("データの取得に失敗しました")
      }
    }
    if (id) fetchItem()
  }, [id])

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

      const res = await fetch(`/api/item/update/${id}`, {
        method: "PUT",
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
        alert("更新成功")
        router.push(`/item/readsingle/${id}`)
        router.refresh()
      } else {
        alert(jsonData.message || "更新失敗")
      }
    } catch (error) {
      alert("更新に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        placeholder="タイトル"
        className="mx-auto w-[60vw] border rounded-lg shadow-2xl block m-4"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => { setPrice(e.target.value) }}
        placeholder="値段"
        className="mx-auto w-[60vw] border rounded-lg shadow-2xl block m-4"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => { setImage(e.target.value) }}
        placeholder="画像url"
        className="mx-auto w-[60vw] border rounded-lg shadow-2xl block m-4"
      />
      <textarea
        value={description}
        onChange={(e) => { setDescription(e.target.value) }}
        placeholder="詳細"
        className="w-[60vw] h-[40vh] mx-auto border rounded-lg shadow-2xl block m-4"
      />
      <button type="submit" className="mx-auto block text-center bg-blue-300 px-8 py-2 rounded">更新</button>
    </form>
  )
}

export default UpdatePage

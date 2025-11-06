'use client'

import { useState } from "react"

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e :any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/register",{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
      const jsonData = await res.json();
      alert(jsonData.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("ユーザ登録失敗")
    }
  }
  return (
    <div className="w-full h-full m-0 auto">
      <h1>ユーザ登録</h1>
      <form 
        action=""
        onSubmit={handleSubmit}
      >
        <input 
          type="name" 
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          placeholder="名前"
          className="border rounded-lg shadow-2xl block m-4"
          required
        />
        <input 
          type="email" 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          placeholder="メールアドレス"
          className="border rounded-lg shadow-2xl block m-4"
          required
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          placeholder="パスワード"
          className="border rounded-lg shadow-2xl block m-4"
          required
        />   
        <button  
          className="bg-gray-500 text-white px-4 py-4 m-4 hover:bg-gray-400"
        >登録</button>     

      </form>
    </div>
  )
}

export default RegisterPage

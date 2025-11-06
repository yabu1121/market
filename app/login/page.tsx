'use client'

import { useState } from "react"
import { json } from "stream/consumers";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e :any) => {
    e.preventDefault();
    try {
      const res = await fetch("api/user/login", {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email:email,
          password:password
        })
      });
      const jsonData = await res.json();
      console.log(jsonData);
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
    } catch (error) {
      alert("ログイン失敗");
    }
  }
  return (
    <div>
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit}>
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

export default LoginPage

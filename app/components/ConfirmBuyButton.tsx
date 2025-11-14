'use client'

import { useRouter } from "next/navigation";

interface Props {
  itemId: string;
}

const ConfirmBuyButton = ({ itemId }: Props) => {
  const router = useRouter();
  
  const handleBuyButton = async () => {
    const res = confirm("本当に購入しますか？取り消しはできません");
    if (!res) {
      alert("購入がキャンセルされました。");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("ログインが必要です");
        router.push("/login");
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.email;

      const response = await fetch("/api/item/buy", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          itemId: itemId,
          email: email
        })
      });

      const jsonData = await response.json();

      if (response.ok) {
        alert("ご購入ありがとうございました。詳細はマイページにてご確認ください");
        router.push("/");
        router.refresh();
      } else {
        alert(jsonData.message || "購入に失敗しました");
      }
    } catch (error) {
      alert("購入に失敗しました");
      console.error(error);
    }
  }

  return (
    <button 
      className="bg-red-400 px-8 py-4 hover:bg-red-300 m-auto block mb-16 text-center rounded-lg"
      onClick={handleBuyButton}  
    >購入</button>
  )
}

export default ConfirmBuyButton

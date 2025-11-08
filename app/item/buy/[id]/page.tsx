'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

interface ItemData {
  title: string;
  price: number;
  description: string;
}

const BuyPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); 
      try {
        const res = await fetch(`http://localhost:3000/api/item/readsingle/${id}`);
        
        if (!res.ok)throw new Error('データの取得に失敗しました');
        const responseData = await res.json();         
        setData(responseData.singleItem); 

      } catch (error) {
        console.error(error);
        alert("失敗");
      } finally {
        setLoading(false);
      }
    }
    if(id) fetchItem()
  },[id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!data) {
    return <div>アイテムが見つかりません。</div>;
  }

  return (
    <div>
      id: {id}
      <h1>{data.title}</h1>
      <p>{data.price}円</p>
      <p>{data.description}</p>
      <button>購入</button>
    </div>
  )
}

export default BuyPage
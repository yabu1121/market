import BuyButton from "@/app/components/BuyButton"
import DeleteButton from "@/app/components/DeleteButton"
import ReturnButton from "@/app/components/ReturnButton"
import UpdateButton from "@/app/components/UpdateButton"
import Image from "next/image"

interface Props {
  params: Promise<{ id: string }>
}

const ReadSinglePage = async ({ params }: Props) => {
  const { id } = await params
  
  const res = await fetch(`https://market-he6qrhb7k-yabus-projects-9834b47a.vercel.app/api/item/readsingle/${id}`, {
    cache: "no-store"
  })
  const jsonData = await res.json()
  const item = jsonData.singleItem

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-between flex flex-nowrap horizontal">
        <ReturnButton />
        <DeleteButton params={id} />
        <UpdateButton params={id}/>
        <BuyButton params={id}/>
      </div>
      <h1 className="text-3xl font-bold mb-4 overflow-scroll">{item.title}</h1>
      <p className="text-2xl font-bold mb-4">¥{item.price}</p>
      {item.image && (
        <Image
          src={item.image}
          alt={item.title}
          width={200}
          height={200}
          className="mb-4 max-w-wd"
          />
        )}
      <h2 className="text-gray-700 break-all">{item.description}</h2>
      <p className="text-sm text-gray-500 mt-4">ID: {id}</p>
    </div>
  )
}

export default ReadSinglePage

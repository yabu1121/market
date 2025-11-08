import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"

const getAllItems = async () => {
  const res = await fetch("http://localhost:3000/api/item/readall");
  const jsonData = await res.json();
  const allItems = jsonData.allItems;
  return allItems;
}

const ReadAllItems = async () => {
  const allItem = await getAllItems();
  console.log(allItem);
  return (
    <div className="grid grid-cols-3 m-4 gap-4">
      {allItem.map((item :any) => {
        return(
          <div key={item.id}>
            <Link href={`/item/readsingle/${item.id}`}>
              <div className="border relative rounded-2xl hover:shadow-2xl transition-all">
                <Image
                  src={item.image}
                  alt={`${item.title} image`}
                  width={400}
                  height={400}
                  className="rounded-2xl md:w-90 md:h-75"
                  priority
                />
                  <p className="p-8 hidden sm:block w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</p>
                  <p className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-gray-500 md:bg-transparent md:text-black text-white bg:text-black rounded">¥{item.price}</p>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default ReadAllItems

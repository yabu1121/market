import Image from "next/image";
import Link from "next/link";
import supabase from "@/app/utils/database";

export const dynamic = "force-dynamic"

const getAllItems = async () => {
  try {
    const { data, error } = await supabase.from("items").select();
    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error("Failed to get all items:", error);
    return [];
  }
}

const ReadAllItems = async () => {
  const allItem = await getAllItems();
  console.log(allItem);
  return (
    <div className="grid grid-cols-3 m-4 gap-4">
      {allItem.map((item:any) => {
        return(
          <div key={item.id} className="relative">
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
            {item.is_sold && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold z-10">
                購入済み
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ReadAllItems

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
    <div>
      <h1>hello</h1>
      {allItem.map((item :any) => {
        return(
          <Link href={`/item/readsingle/${item.id}`} key={item.id}>
            <Image
              src={item.image}
              alt={`${item.title} image`}
              width={400}
              height={400}
              priority
            />
            <div>
              <p>{item.title}</p>
              <p>{item.price}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ReadAllItems

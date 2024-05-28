import { Item as ResultItem } from "./type";
import Image from "next/image";

export default function Item({ data }: { data: ResultItem }) {
  const thumbnail = data.volumeInfo.imageLinks?.thumbnail;

  return (
    <span className="flex items-center cursor-pointer">
      {thumbnail ? (
        <Image
          src={data.volumeInfo.imageLinks?.thumbnail!}
          alt={`Book cover of ${data.volumeInfo.title}`}
          width={60}
          height={100}
        />
      ) : (
        <div className="w-[60px] h-[83px] bg-gray-200">
          <span className="sr-only">Book cover of {data.volumeInfo.title}</span>
        </div>
      )}

      <span className="ml-2">
        <h3 className="text-lg font-semibold">{data.volumeInfo.title}</h3>
        <p className="text-sm text-gray-500">
          {data.volumeInfo.authors?.join(", ")}
        </p>
      </span>
    </span>
  );
}

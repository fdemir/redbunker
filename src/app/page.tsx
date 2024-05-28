"use client";
import { z } from "zod";

import { useState } from "react";
import SearchForm from "./_components/form/search";
import { outputSchema } from "./schema";
import { Item } from "./_components/search/type";
import Image from "next/image";

type GenerationReturnType = Partial<z.infer<typeof outputSchema>>;

export default function Home() {
  const [output, setOutput] = useState<GenerationReturnType | null>(null);
  const [item, setItem] = useState<Item>();

  const handleGeneration = (data: GenerationReturnType) => {
    try {
      setOutput(JSON.parse(data as string));
    } catch (error) {}
  };

  return (
    <main className="container">
      <h1 className="text-4xl font-semibold text-center py-10">Redbunker</h1>

      <SearchForm onItemSelect={setItem} onGeneration={handleGeneration} />

      {item && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-4 md:p-8">
          <div className="space-y-4 md:order-1 order-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              {item?.volumeInfo.title}
            </h1>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Summary
              </h2>
              <p className="text-gray-700 dark:text-gray-400">
                {output?.summary?.summary}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Key Highlights
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
                {output?.summary?.bulletpoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Fun Facts
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
                {output?.summary?.funfacts?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4 md:order-2 order-1">
            <div className="flex items-center">
              {item?.volumeInfo.imageLinks?.thumbnail ? (
                <Image
                  src={item?.volumeInfo.imageLinks?.thumbnail}
                  alt="Book Cover"
                  width={200}
                  height={120}
                />
              ) : (
                <div className="w-20 h-30 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {output?.summary?.info?.author?.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-400">
                  {output?.summary?.info?.author?.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Genre
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  {item.volumeInfo.categories?.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Page Count
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  {item?.volumeInfo.pageCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

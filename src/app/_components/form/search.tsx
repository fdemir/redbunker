"use client";

import { summary } from "@/app/actions";
import SearchInput from "../search/input";
import { Item } from "../search/type";
import { readStreamableValue } from "ai/rsc";

export default function SearchForm({
  onGeneration,
  onItemSelect,
}: {
  onGeneration: (data: any) => void;
  onItemSelect: (item: Item) => void;
}) {
  const handleSelect = async (item: Item | null) => {
    if (!item) {
      return;
    }

    onItemSelect(item);

    const { object } = await summary(
      item.volumeInfo.title,
      item?.accessInfo.country
    );

    for await (const partialObject of readStreamableValue(object)) {
      if (partialObject) {
        onGeneration(JSON.stringify(partialObject, null, 2));
      }
    }
  };

  return (
    <div className="w-full">
      <SearchInput onSelect={handleSelect} />
    </div>
  );
}

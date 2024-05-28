"use client";

import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useBookSearch } from "./search";
import Item from "./item";
import { Item as ResultItem } from "./type";

export default function InputForm({
  onSelect,
}: {
  onSelect: (item: ResultItem | null) => void;
}) {
  const { data, search, isLoading } = useBookSearch();

  return (
    <div className="relative">
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search book.."
          onValueChange={(value) => search(value)}
        />
        <CommandList>
          {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
          {data?.totalItems === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {data &&
            data?.items?.length >= 0 &&
            data.items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => {
                  onSelect(item);
                }}
              >
                <Item data={item} />
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
}

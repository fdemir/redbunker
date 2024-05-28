import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Root } from "./type";

const fetchBooks = async (query: string): Promise<Root | null> => {
  if (!query) return null;

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};

export const useBookSearch = () => {
  const [query, setQuery] = useState("");

  const result = useQuery(
    {
      queryKey: ["books", query],
      queryFn: () => fetchBooks(query),
      enabled: !!query,
      refetchOnWindowFocus: false,
    },
  );

  return {
    search: setQuery,
    ...result,
  };
};

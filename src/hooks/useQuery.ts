import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const apiKey = "8f2aef6b-6b1f-4c1c-8f6e-6b1f8f6e8f6e";
const url = `https://api.pokemontcg.io/v2`;

const apiUrl = {
  cards: `${url}/cards`,
  types: `${url}/types`,
};

const fetchCard = async ({ pageParam = 1 }) => {
  const limit = 10;
  const response = await fetch(
    `${apiUrl.cards}?page=${pageParam}&pageSize=${limit}`,
    {
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch card data");
  }

  return response.json();
};

const fetchType = async () => {
  const response = await fetch(apiUrl.types, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch card type");
  }

  return response.json();
};

export const useCard = () => {
  return useInfiniteQuery({
    queryKey: ["cards"],
    queryFn: fetchCard,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
};

export const useCardType = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchType,
  });
};

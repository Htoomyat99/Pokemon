import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const apiKey = "8f2aef6b-6b1f-4c1c-8f6e-6b1f8f6e8f6e";
const url = "https://api.pokemontcg.io/v2";
const limit = 14;

const apiUrl = {
  cards: `${url}/cards`,
  types: `${url}/types`,
};

interface Props {
  queryKey: string[];
  pageParam?: number;
}

const fetchfilterCards = async ({ pageParam = 1, queryKey }: Props) => {
  const [_, search, type] = queryKey;

  let query = "";
  if (search) query += `name:${search}*`;
  if (type) query += query ? ` AND types:${type}` : `types:${type}`;

  const response = await fetch(
    `${apiUrl.cards}?page=${pageParam}&pageSize=${limit}&q=${encodeURIComponent(
      query
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch card data");
  }

  return response.json();
};

export const useCardFilter = (search: string, type: string) => {
  console.log("render");
  return useInfiniteQuery({
    queryKey: ["filterCards", search, type],
    queryFn: fetchfilterCards,
    getNextPageParam: (lastPage) => {
      const hasMorePages = lastPage.page * limit < lastPage.totalCount;
      return hasMorePages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
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

export const useCardType = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchType,
  });
};

const fetchCardDetail = async (id: string) => {
  const response = await fetch(`${apiUrl.cards}/${id}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch card detail");
  }

  return response.json();
};

export const useCardDetail = (id: string) => {
  return useQuery({
    queryKey: ["cardDetail", id],
    queryFn: () => fetchCardDetail(id),
  });
};

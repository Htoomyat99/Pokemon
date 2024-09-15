import { fetchRate } from "@/constants/FetchRateLimit";

const apiKey = "8f2aef6b-6b1f-4c1c-8f6e-6b1f8f6e8f6e";
const url = "https://api.pokemontcg.io/v2";
const limit = fetchRate.limit;

const apiUrl = {
  cards: `${url}/cards`,
  types: `${url}/types`,
};

interface Props {
  queryKey: string[];
  pageParam?: number;
}
export const fetchfilterCards = async ({ pageParam = 1, queryKey }: Props) => {
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

export const fetchCardType = async () => {
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

export const fetchCardDetail = async (id: string) => {
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

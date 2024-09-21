import { fetchRate } from "@/constants/FetchRateLimit";

const apiKey = process.env.EXPO_PUBLIC_API_KEY as string;
const url = process.env.EXPO_PUBLIC_API_URL as string;
const limit = fetchRate.limit;

const apiUrl = {
  cards: `${url}/cards`,
  types: `${url}/types`,
  rarities: `${url}/rarities`,
};

interface Props {
  queryKey: string[];
  pageParam?: number;
}
export const fetchfilterCards = async ({ pageParam = 1, queryKey }: Props) => {
  console.log("render");
  const [_, search, type, rarity] = queryKey;

  let url = `${apiUrl.cards}?page=${pageParam}&pageSize=${limit}`;
  let query = [];

  if (search) query.push(`name:"*${encodeURIComponent(search)}*"`);

  if (type) query.push(`types:"${encodeURIComponent(type)}"`);

  if (rarity) query.push(`rarity:"${rarity}"`);

  if (query.length > 0) {
    url += `&q=${query.join(" ")}`; // Combine with space, forming one single `q`
  }

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

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

export const fetchRarities = async () => {
  const response = await fetch(apiUrl.rarities, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch card rarity");
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

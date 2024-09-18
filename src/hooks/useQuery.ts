import { fetchRate } from "@/constants/FetchRateLimit";
import {
  fetchCardDetail,
  fetchCardType,
  fetchfilterCards,
  fetchRarities,
} from "@/src/utils/fetch";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const limit = fetchRate.limit;

export const useCardFilter = (search: string, type: string, rarity: string) => {
  console.log("render");
  return useInfiniteQuery({
    queryKey: ["filterCards", search, type, rarity],
    queryFn: fetchfilterCards,
    getNextPageParam: (lastPage) => {
      const hasMorePages = lastPage.page * limit < lastPage.totalCount;
      return hasMorePages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useCardType = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchCardType,
  });
};

export const useRarities = () => {
  return useQuery({
    queryKey: ["rarities"],
    queryFn: fetchRarities,
  });
};

export const useCardDetail = (id: string) => {
  return useQuery({
    queryKey: ["cardDetail", id],
    queryFn: () => fetchCardDetail(id),
  });
};

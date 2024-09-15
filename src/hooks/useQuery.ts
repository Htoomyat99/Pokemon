import { fetchRate } from "@/constants/FetchRateLimit";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchCardDetail,
  fetchCardType,
  fetchfilterCards,
} from "@/src/utils/fetch";

const limit = fetchRate.limit;

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

export const useCardType = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchCardType,
  });
};

export const useCardDetail = (id: string) => {
  return useQuery({
    queryKey: ["cardDetail", id],
    queryFn: () => fetchCardDetail(id),
  });
};

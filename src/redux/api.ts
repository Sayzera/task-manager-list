const _baseUrl = import.meta.env.VITE_DEV_API_URL as string;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { FiltersState } from "@/redux/filters/filter-slice";

const helper_components_api = createApi({
  reducerPath: "helper_components_api",
  tagTypes: ["helper_components_api"],
  // Her arguman değiştiğinde tekrardan istek atar ve yeni veri getirir
  refetchOnMountOrArgChange: true,
  // herseferinde tekrar istek at
  refetchOnReconnect: true,

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.main?.userData?.token?.token

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    /**
     * @description eğer methoda hiç bir parametre verilmeze post olarak gider
     */
    customAction: builder.mutation({
      query: (args: {
        body?: any;
        url: string;
        method?: "POST" | "DELETE" | "PUT";
        queryString?: string;
      }) => {
        const { body = {}, url, method = "POST", queryString = "" } = args;
        return {
          url: `${_baseUrl}/${url}${queryString}`,
          method: method,
          body: body,
        };
      },
    }),

    // query endpoint
    customGet: builder.query({
      query: (args: { url: string; queryString?: string }) => {
        const { url, queryString = "" } = args;
        return {
          url: `${_baseUrl}/${url}${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCustomActionMutation,
  useLazyCustomGetQuery,
  useCustomGetQuery,
} = helper_components_api;

export default helper_components_api;

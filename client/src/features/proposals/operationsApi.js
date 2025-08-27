import { apiSlice } from "@/services/apiSlice";

export const operationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOperations: builder.query({
            query: () => "/api/operations",
            providesTags: ["Operations"],
        }),
    }),
});

export const { useGetOperationsQuery } = operationsApiSlice;
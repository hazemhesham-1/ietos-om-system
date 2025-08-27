import { apiSlice } from "@/services/apiSlice";

export const siteVisitApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVisits: builder.query({
            query: (params) => `/api/site-visits?${params}`,
            providesTags: (result) => [
                { type: "SiteVisit", id: "LIST" },
                ...(result?.map(({ _id }) => ({ type: "SiteVisit", id: _id })) || [])
            ],
        }),
        addVisit: builder.mutation({
            query: (newVisit) => ({
                url: "/api/site-visits",
                method: "POST",
                body: newVisit
            }),
            invalidatesTags: [{ type: "SiteVisit", id: "LIST" }]
        }),
        updateVisit: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/api/site-visits/${id}`,
                method: "PATCH",
                body: updateData
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: "SiteVisit", id }]
        }),
    }),
});

export const { useGetVisitsQuery, useAddVisitMutation, useUpdateVisitMutation } = siteVisitApiSlice;
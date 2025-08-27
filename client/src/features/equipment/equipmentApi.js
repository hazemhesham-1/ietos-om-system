import { apiSlice } from "@/services/apiSlice";

export const equipmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEquipment: builder.query({
            query: () => "/api/equipment",
            providesTags: ["Equipment"],
        }),
        getEquipmentFields: builder.query({
            query: () => "/api/equipment-fields",
            providesTags: ["EquipmentFields"],
        }),
    }),
});

export const { useGetEquipmentQuery, useGetEquipmentFieldsQuery } = equipmentApiSlice;
import { apiSlice } from "@/services/apiSlice";

export const dataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGovernorates: builder.query({
            query: () => "/api/governorates",
            providesTags: ["Governorates"],
            keepUnusedDataFor: 3600,
        }),
        getCurrencies: builder.query({
            query: () => "/api/currencies",
            providesTags: ["Currencies"],
            transformResponse: (res) => {
                const currencyOptions = res.map((currency) => ({
                    label: currency.name["en"],
                    value: JSON.stringify(currency)
                }));
                
                return currencyOptions;
            },
            keepUnusedDataFor: 3600,
        }),
        getTreatmentTypes: builder.query({
            query: () => "/api/treatment-types",
            providesTags: ["TreatmentTypes"],
            keepUnusedDataFor: 3600,
        }),
    }),
});

export const {
    useGetGovernoratesQuery,
    useGetCurrenciesQuery,
    useGetTreatmentTypesQuery
} = dataApiSlice;
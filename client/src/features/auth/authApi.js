import { apiSlice } from "@/services/apiSlice";
import { removeCredentials, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: credentials
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(removeCredentials());
                    dispatch(apiSlice.util.resetApiState());
                }
                catch(err) {
                    console.error(err);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                }
                catch(err) {
                    console.error(err);
                }
            }
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } = authApiSlice;
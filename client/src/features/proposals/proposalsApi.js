import { apiSlice } from "@/services/apiSlice";

export const proposalsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProposals: builder.query({
            query: () => "/api/proposals/",
            providesTags: ["Proposals"],
            transformResponse: (res) => {
                const proposals = res.map((proposal) => ({
                    ...proposal,
                    proposalId: proposal.id,
                    employee: `${proposal.employeeId.firstName} ${proposal.employeeId.lastName}`,
                    treatmentType: proposal.plantType,
                    submittedOn: proposal.updatedAt,
                }));
                
                return proposals;
            },
        }),
        updateProposal: builder.mutation({
            query: (data) => ({
                url: `/api/proposals/${data.proposalId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Proposals"]
        }),
        submitProposal: builder.mutation({
            query: (formData) => ({
                url: "/api/proposals/submit",
                method: "POST",
                body: formData,
            }),
        }),
        uploadDocument: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append("document", file);

                return {
                    url: "/api/proposals/upload",
                    method: "POST",
                    body: formData,
                };
            },
        }),
        downloadDocument: builder.mutation({
            query: (key) => ({
                url: `/api/proposals/download/${encodeURIComponent(key)}`,
                method: "GET"
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    window.location.href = data.url;
                }
                catch(err) {
                    console.error("Download failed: ", err);
                }
            }
        }),
    }),
});

export const {
    useGetProposalsQuery,
    useUpdateProposalMutation,
    useSubmitProposalMutation,
    useUploadDocumentMutation,
    useDownloadDocumentMutation
} = proposalsApiSlice;
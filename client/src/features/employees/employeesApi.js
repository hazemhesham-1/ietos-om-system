import { apiSlice } from "@/services/apiSlice";

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => "/api/employees",
            providesTags: ["Employees"],
            transformResponse: (res) => {
                const employees = res.map((employee) => ({
                    id: employee._id,
                    name: [employee.firstName, employee.lastName].join(" "),
                    email: employee.email,
                    jobTitle: employee.jobTitle,
                    profilePhoto: employee?.profilePhoto,
                    role: employee.role
                }));
                
                return employees;
            },
        }),
        getCurrentUser: builder.query({
            query: () => "/api/user/",
            providesTags: ["User"],
            transformResponse: (res) => {
                const userData = {
                    id: res._id,
                    name: [res.firstName, res.lastName].join(" "),
                    email: res.email,
                    jobTitle: res.jobTitle,
                    profilePhoto: res?.profilePhoto,
                    role: res.role
                };
                
                return userData;
            },
        }),
    }),
});

export const { useGetEmployeesQuery, useGetCurrentUserQuery } = employeesApiSlice;
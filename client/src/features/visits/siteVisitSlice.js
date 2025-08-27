import { DEFAULT_COORDINATES } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visitId: null,
    employeeId: null,
    siteName: "",
    startTime: null,
    endTime: null,
    locationHistory: [{ ...DEFAULT_COORDINATES, timestamp: new Date().toISOString() }]
};

const siteVisitSlice = createSlice({
    name: "siteVisit",
    initialState,
    reducers: {
        startVisit: (state, action) => {
            const { _id, employeeId, siteName, siteLocation } = action.payload;
            state.visitId = _id;
            state.employeeId = employeeId;
            state.siteName = siteName;
            state.locationHistory = [{ ...siteLocation, zoom: 20, timestamp: new Date().toISOString() }];
        },
        setSiteName: (state, action) => {
            state.siteName = action.payload;
        },
        endVisit: (state) => {
            const { locationHistory, ...cleanState } = initialState;
            for(let key in cleanState) {
                state[key] = cleanState[key];
            }
        },
        updateLocation: (state, action) => {
            const { lat, long } = action.payload;
            state.locationHistory.push({ lat, long, zoom: 20, timestamp: new Date().toISOString() });
        },
    }
});

export const { startVisit, endVisit, setSiteName, updateLocation } = siteVisitSlice.actions;

export const getCurrentLocation = (state) => {
    const { locationHistory } = state.siteVisit;
    if(locationHistory.length < 1) return null;

    return locationHistory.at(-1);
};

export default siteVisitSlice.reducer;
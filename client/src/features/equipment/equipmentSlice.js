import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditModal: false,
    isModalOpen: false,
    currentStep: 1,
    data: {},
};

const equipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {
        setEquipmentData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        resetEquipment: (state) => {
            state.currentStep = 1;
            state.data = {};
        },
        nextStep: (state) => {
            state.currentStep = state.currentStep + 1;
        },
        prevStep: (state) => {
            if(state.currentStep <= 1) return;
            state.currentStep = state.currentStep - 1;
        },
        openEditModal: (state, action) => {
            state.isModalOpen = true;
            state.isEditModal = true;
            state.currentStep = 1;
            state.data = { ...state.data, ...action.payload };
        },
        openModal: (state) => {
            state.isModalOpen = true;
            state.currentStep = 1;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.isEditModal = false;
        },
    }
});

export const { setEquipmentData, resetEquipment, nextStep, prevStep, openModal, openEditModal, closeModal } = equipmentSlice.actions;

export default equipmentSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";

// Spinner Component
const Spinner = () => {
  const loading = useSelector((state) => state.loaders.loading);

  if (!loading) return null;

  // Inline styles for the spinner overlay and animation
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255, 255, 255, 0.3)",
    borderTop: "5px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const keyframesStyle = `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={overlayStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
};

// Redux Slice
const loaderSlice = createSlice({
  name: "loaders", // name of the slice
  initialState: {
    loading: false, // initial state
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;
export { Spinner }; // Export the Spinner component
export default loaderSlice.reducer;

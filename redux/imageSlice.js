import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
};

export const imageSlice = createSlice({
  name: "imageUser",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    deleteImage: (state) => {
      state.image = null;
    },
  },
});

export const { setImage, deleteImage } = imageSlice.actions;
export default imageSlice.reducer;

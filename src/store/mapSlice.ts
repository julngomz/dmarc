import { createSlice } from '@reduxjs/toolkit'

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    contexts: [],
    selectedContextId: 'cities'
  },
  reducers: {
    selectContext: (state, action) => {
      state.selectedContextId = action.payload;
    },
  }
})

export default mapSlice

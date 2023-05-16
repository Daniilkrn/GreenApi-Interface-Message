import { createSlice } from '@reduxjs/toolkit'

export const currentWindowSlice = createSlice({
  name: 'currentWindowSlice',
  initialState: {
    currentPhone: 0,
  },
  reducers: {
    setWindowPhone(state,action) {
      state.currentPhone = action.payload
    }
  },
})

export default currentWindowSlice.reducer

export const {setWindowPhone} = currentWindowSlice.actions
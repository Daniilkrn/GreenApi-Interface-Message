import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    flagAuth: false,
    currentPhone: 0,
    objList: null,
    IdInstance: 0,
    ApiTokenInstance: ''
  },
  reducers: {
    setFlagAuth(state,action) {
      state.flagAuth = action.payload
    },
    setWindowPhone(state,action) {
      state.currentPhone = action.payload
    },
    setObjList(state,action) {
      state.objList = action.payload
    },
    setAuthDataID(state,action) {
      state.IdInstance = action.payload
    },
    setAuthDataToken(state,action) {
      state.ApiTokenInstance = action.payload
    }
  },
})

export default authSlice.reducer

export const {setFlagAuth, setWindowPhone, setObjList, setAuthDataID, setAuthDataToken} = authSlice.actions
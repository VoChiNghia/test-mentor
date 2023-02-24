import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth'
import projectReducer from '../redux/project'
import ModalReducer from '../redux/ModalHoc'
const store = configureStore({
  reducer: {
   authReducer:authReducer,
   projectReducer:projectReducer,
   modalReducer:ModalReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { DispatchType } from '../store/store'
import { http } from '../util/config'
import Swal from 'sweetalert2'



const initialState:any = {
  component:null,
  modalIsOpen:false
}

const ModalReducer = createSlice({
    name: 'modalReducer',
    initialState,
    reducers:{
        componentReducer: (state,action:PayloadAction<any>) =>{
          state.component = action.payload
        },
        setOpentModal:(state,action:PayloadAction<any>)=>{
            state.modalIsOpen = action.payload
        }
    }
})

export const {componentReducer,setOpentModal} = ModalReducer.actions
export default ModalReducer.reducer
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, http, removeStore, saveStore, saveStoreJson } from '../util/config'


import { history } from '../App'


import Swal from 'sweetalert2'
import { AxiosResponse } from 'axios'
import { LoginModel, RegisterModel, SignInModel } from '../type/login'
import { DispatchType } from '../store/store'


type UserLoginState = {
    signIn:SignInModel | null,
   
}

const initialState:UserLoginState = {
    signIn:null,
   
}


const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers:{
        signInReducer:(state:UserLoginState,action:PayloadAction<SignInModel>) =>{
            state.signIn = action.payload
            saveStoreJson(USER_LOGIN,action.payload)
            saveStore(ACCESS_TOKEN,action.payload.accessToken)
            history.push('/')
          
        },
       
     
    }
})

export const {signInReducer} = authReducer.actions
export default authReducer.reducer



export const signInApi = (data:LoginModel) => {
    return async (dispatch:DispatchType) => {
       try {
        const res:AxiosResponse = await http.post('/api/Users/signin',data)
        dispatch(signInReducer(res.data.content))
        
       
       } catch (error) {
        console.log(error)
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "có lỗi xãy ra",
            showConfirmButton: false,
            timer: 1500
          })
       }
    }
} 


export const signUpApi = (data:RegisterModel) => {
    return async (dispatch:DispatchType) => {
        try {
         
         const res:AxiosResponse = await http.post('/api/Users/signup',data)
        
         if(res.data.statusCode == 200){
           
           Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký Thành công',
                showConfirmButton: false,
                timer: 1500
              }) 
           
           
         }
       
        } catch (error) {
            console.log(error);
        
         Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'có lỗi xãy ra',
            showConfirmButton: false,
            timer: 1500
          })
        }
     }
}


import axios from 'axios';
import {history} from '../App'
import { type } from 'os';
export const ACCESS_TOKEN = 'accessToken';
export const USER_LOGIN = 'userLogin'; 
const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjMwLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTQwNDgwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg1NTUyNDAwfQ.-poI4CYh8bBsN-xbPHgcbNrVnKw1fA1r4IuZCUk0rmA'

export const {saveStore,saveStoreJson,getStore,getStoreJson,removeStore} = {
    saveStore:(name:string,stringValue:any)=>{
        localStorage.setItem(name,stringValue)
        return stringValue
    },
    saveStoreJson:(name:string,value:any)=>{
        localStorage.setItem(name,JSON.stringify(value))
        return value
    },
    getStore:(name:string)=>{
        if(localStorage.getItem(name)){
            return localStorage.getItem(name)
        }
        return null
    },
    getStoreJson:(name:any)=>{
       if(localStorage.getItem(name)){
          const dataStore = localStorage.getItem(name)
           if(typeof dataStore === 'string'){
             return JSON.parse(dataStore)
           }
       }
       return null
   },
    removeStore:(name:string)=>{
        if(localStorage.getItem(name)){
            localStorage.removeItem(name)
        }
    }
 
 }



export const http = axios.create({
    baseURL:'https://jiranew.cybersoft.edu.vn',
    headers: {
        common: {
          Accept: 'application/json'
        },
        patch: {
          'Content-Type': 'application/merge-patch+json'
        }
      }
    
})


// http.interceptors.response.use(response => {
   
//     return response
//  },err => {
//    if(err.response.status === 404){
//       history.push('/')
//    }
//    if(err.response.status === 401 || err.response.status === 403){
//     history.push('/login')
//    } 
//    return Promise.reject(err)
//  })


 
 http.interceptors.request.use((config:any) => {
    config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + getStore(ACCESS_TOKEN),
        TokenCybersoft:TOKEN_CYBERSOFT,
       
    }
    return config
 },(err) => {
    return Promise.reject(err)
 })

 

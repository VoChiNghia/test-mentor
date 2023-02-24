import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { DispatchType } from '../store/store'
import { http } from '../util/config'
import Swal from 'sweetalert2'
import { IColumnsFromBackend, LstTask, ProjectDetail, ProjectModal, TaskDetail } from '../type/project'
import { v4 as uuidv4 } from 'uuid';

interface IinitialState {
  allProject:ProjectModal[] | null,
  detailProject:IColumnsFromBackend[] | null,
  taskDetail:TaskDetail
}

const initialState:IinitialState = {
  allProject:null,
  detailProject:null,
  taskDetail:{
    priorityTask: {
      priorityId: 1,
      priority: "High"
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug"
    },
    assigness: [
      {
        id: 4213,
        avatar: "https://ui-avatars.com/api/?name=John",
        name: "John",
        alias: "string"
      }
    ],
    lstComment: [
      {
        id: 8098,
        idUser: 4294,
        name: "cyberlearn",
        avatar: "https://ui-avatars.com/api/?name=cyberlearn",
        commentContent: ""
      }
    ],
    taskId: 9063,
    taskName: "trung",
    alias: "trung",
    description: "<p>trung</p>",
    statusId: "4",
    originalEstimate: 12,
    timeTrackingSpent: 12,
    timeTrackingRemaining: 21,
    typeId: 1,
    priorityId: 1,
    projectId: 11482
  }
}

const projectReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers:{
        getAllProjectReducer: (state:IinitialState,action:PayloadAction<ProjectModal[]>) =>{
          state.allProject = action.payload
        },
        getProjectDetail:(state:IinitialState,action:PayloadAction<ProjectDetail>) => {
     
          const columnsFromBackend:IColumnsFromBackend[] =action.payload ? action.payload?.lstTask?.map((task:LstTask) =>{
            return {
                  name: task.statusName,
                  items: task.lstTaskDeTail
                }
            
         }) : []
         state.detailProject = columnsFromBackend
        },
        getTaskDetail:(state:IinitialState,action:PayloadAction<TaskDetail>) => {
          state.taskDetail = action.payload
        }
    }
})

export const {getAllProjectReducer,getProjectDetail,getTaskDetail} = projectReducer.actions
export default projectReducer.reducer



export const getAllProject = () => {
    return async (dispatch:DispatchType) => {
            const res = await http.get('/api/Project/getAllProject')
            dispatch(getAllProjectReducer(res.data.content))
    }
}

export const getProjectDetailFromApi = (id:number) => {
  return async (dispatch:DispatchType) => {
          try {
            const res = await http.get(`/api/Project/getProjectDetail?id=${id}`)
            console.log(res)
            dispatch(getProjectDetail(res.data.content))
          } catch (error) {
            console.log(error)
          }
  }
}


export const createProjectAuthorize = (data:any) => {
  return async (dispatch:DispatchType) => {
         try {
          const res = await http.post('/api/Project/createProjectAuthorize',data)
        
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          }) 
         } catch (error) {
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


export const updateProjectFromApi = (id:number,data:any) => {
  return async (dispatch:DispatchType) => {
    try {
      const res = await http.put(`/api/Project/updateProject?projectId=${id}`,data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
      }) 
    } catch (error:any) {
    
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.response.data.content,
        showConfirmButton: false,
        timer: 1500
      }) 
    }
  }
}


export const createTaskFromApi = (data:any) => {
  return async (dispatch:DispatchType) => {
         try {
          const res = await http.post('/api/Project/createTask',data)
        
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          }) 
         } catch (error:any) {
          console.log(error)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.response.data.content,
            showConfirmButton: false,
            timer: 1500
          }) 
         }
  }
}


export const getTaskDetailFromApi = (id:number) => {
    return async (dispatch:DispatchType) => {
         try {
          const res = await http.get(`/api/Project/getTaskDetail?taskId=${id}`)
          console.log(res)
         dispatch(getTaskDetail(res.data.content))
         } catch (error) {
          console.log(error)
         }
    }
}
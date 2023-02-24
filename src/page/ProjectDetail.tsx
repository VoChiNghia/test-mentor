import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../store/store'
import project, { getProjectDetailFromApi, getTaskDetailFromApi } from '../redux/project'
import Sidebar from '../components/Sidebar'
import { DragDropContext, DropResult, Droppable, DroppableProvided, DroppableStateSnapshot,Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import Handle from 'rc-slider/lib/Handles/Handle'
import { componentReducer } from '../redux/ModalHoc'
import EditProjectDetail from '../components/EditProjectDetail'
import { setOpentModal } from '../redux/ModalHoc'
import { v4 as uuidv4 } from 'uuid';
type Props = {}

 

const ProjectDetail = (props: Props) => {

    const {detailProject} = useSelector((state:RootState) => state.projectReducer)
      
   console.log(detailProject)

  
    const [columns, setColumns] = useState<any>(detailProject);
    const params = useParams()
    const dispatch:DispatchType = useDispatch()
   

    const createTaskRef = useRef(null)
    const inputTask = useRef(null)
    useEffect(()=>{
      dispatch(getProjectDetailFromApi(Number(params.id)))
    },[])
 

   const HandleShowTasksInput = () => {
    if(createTaskRef.current){
      (createTaskRef.current as HTMLElement).style.display = 'none'
    }
    if(inputTask.current){
      (inputTask.current as HTMLElement).style.display = 'flex'
    }
   }

   const handleClickEdit = (id:number) => {
     console.log(id)
      dispatch(getTaskDetailFromApi(id))
      dispatch(componentReducer(<EditProjectDetail/>))
      dispatch(setOpentModal(true))
   }

   const onDragEnd = (result:DropResult, columns:any, setColumns:any) => {
      if (!result.destination) return;
      const { source, destination } = result;
    
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        });
      } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        });
      }
    };
   
    const color = (key:string):string => {
        if(key === 'BACKLOG'){
          return 'bg-gray-200'
        }
        if(key === 'DONE'){
          return 'bg-green-400/50'
        }
        return 'bg-indigo-200'
    }
 


  return (
    <div className='flex'>
        <Sidebar/>

    
    {
      detailProject 
      ?
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]:any, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
             
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#f3f4f6",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                         <span className={`text-xs ${color(column.name)} px-2 rounded-sm text-white`} >{column.name}</span>
                        {column.items.map((item:any, index:number) => {
                          return (
                            <Draggable
                              key={item.taskId}
                              draggableId={String(item.taskId)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  className='bg-white shadow my-1 py-2 px-2'
                                  onClick={() => handleClickEdit(item.taskId)}
                                  >
                                   <p className='py-2'>{item.taskName.slice(0,30)}</p>
                                   <span className='text-xs bg-slate-200 px-2 rounded-md'>{item.priorityTask.priority}</span>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      : ""
    }

     
      

  
    </div>
  )
}

export default ProjectDetail
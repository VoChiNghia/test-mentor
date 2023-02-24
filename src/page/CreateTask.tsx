import React, { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { createProjectAuthorize, createTaskFromApi, getAllProject } from "../redux/project";
import { DispatchType, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ProjectDetail, ProjectModal } from "../type/project";

const CreateTask = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [name,setName] = useState<string>('')
  const [category,setCategory] = useState<string>('')
  const [taskName,setTaskName] = useState<string>('')
  const [statusId,setStatusId] = useState<string>('')
  const [projectId,setProjectId] = useState<string>('')
  const [priorityId,setPriorityId] = useState<string>('')
  const [timeTrackingSpent,setTimeTrackingSpent] = useState<string>('')
  const [originalEstimate,setOriginalEstimate] = useState<string>('')
  const [timeTrackingRemaining,setTimeTrackingRemaining] = useState<any>(0)
  const [typeId,setTypeId] = useState<string>('')




  const {allProject} = useSelector((state:RootState) => state.projectReducer)
    const dispatch:DispatchType = useDispatch()



    useEffect(() => {
      const getProjects = () =>{
          
          dispatch(getAllProject())
      }
      getProjects()
  },[])


const handleCraete = () => {
    const action = {
      listUserAsign:[0],
      taskName:taskName,
      description:editorState.getCurrentContent,
      statusId:Number(statusId),
      originalEstimate:Number(originalEstimate),
      timeTrackingSpent:Number(timeTrackingSpent),
      timeTrackingRemaining:Number(timeTrackingRemaining),
      projectId:Number(projectId),
      typeId:Number(typeId),
      priorityId:Number(priorityId)
    }
 

    dispatch(createTaskFromApi(action))
}
  return (
    <div className="flex">
      <Sidebar />

      <div className="m-5 ">
        <h1 className="font-bold text-xl">Create Tast</h1>
      <div>
       <h1>Project</h1>
      
   
       <select name="cars" id="cars" className="mt-1 p-1 w-full outline-none border-2 rounded-sm" onChange={e => setProjectId(e.target.value)}>
            {
              allProject?.map((item:ProjectModal,index:number) =>(
                <option key={index} value={item.id}>{item.projectName}</option>
              ))
            }
            </select>
       </div>
       <div>
       <h1>Task Name</h1>
        <input type="text" placeholder="Nam ..." className="w-full outline-none py-1 px-5 border-2" onChange={e => setTaskName(e.target.value)} required/>
       </div>
       <div>
       <h1>Status</h1>
       <select name="cars" id="cars" className="mt-1 p-1 w-full outline-none border-2 rounded-sm" onChange={e => setStatusId(e.target.value)}>
            <option value="1">BACKLOG</option>
            <option value="2">SELECTED FOR DEVELOPMENT</option>
            <option value="3">IN PROCESS</option>
            <option value="4">DONE</option>
            </select>
       </div>

       <div className="flex justify-between">
       <div className="flex-1  mr-2">
       <h1>Priority</h1>
       <select name="cars" id="cars" className=" mt-1 p-1 w-full outline-none border-2 rounded-sm" onChange={e => setPriorityId(e.target.value)}>
            <option value="1">HIGHT</option>
            <option value="2">MIDIUM</option>
            <option value="3">LOW</option>
            <option value="4">LOWEST</option>
            </select>
       </div>
       <div className="flex-1">
       <h1>Task Type</h1>
       <select name="cars" id="cars" className="mt-1 p-1 w-full outline-none border-2 rounded-sm" onChange={e => setTypeId(e.target.value)}>
            <option value="1">BUG</option>
            <option value="2">NEW TASK</option>
     
            </select>
       </div>
       </div>

       <div>
       <h1>Assigners</h1>
        <input type="text" placeholder="Assigners ..." className="w-full outline-none py-1 px-5 border-2" onChange={e => setName(e.target.value)} required/>
       </div>

       <div>
       <h1>Time Tracking Remaining</h1>
        <Slider
           value={timeTrackingRemaining}
           onChange={setTimeTrackingRemaining}
        />
      </div>

        <div className="flex justify-between">
        <div className="flex-1  mr-2">
          <h1>Total Estimated Hours</h1>
          <input type="number" className="w-full outline-none py-1 px-5 border-2" defaultValue={0} onChange={e => setOriginalEstimate(e.target.value)}/>
        </div>
        <div className="flex-1">
          <h1>Hours spent</h1>
          <input type="number"  className="w-full  outline-none py-1 px-5 border-2" defaultValue={0} onChange={e => setTimeTrackingSpent(e.target.value)}/>
        </div>
        </div>

        <div >
            <h1>Description</h1>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="border-2"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
        </div>
        <button className="mt-5 px-12 py-2 rounded bg-green-400 shadow-sm text-white hover:scale-105 cursor-pointer" onClick={handleCraete}>Create</button>
      </div>
      
    </div>
  );
};

export default CreateTask;

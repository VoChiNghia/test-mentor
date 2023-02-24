import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { createProjectAuthorize } from "../redux/project";
import { DispatchType } from "../store/store";
import { useDispatch } from "react-redux";

const CreateProject = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [name,setName] = useState<string>('')
  const [category,setCategory] = useState<string>('')
    const dispatch:DispatchType = useDispatch()

const handleCrete = () => {
    const action = {
        projectName:name,
        description:editorState.getCurrentContent().getPlainText(),
        categoryId:Number(category),
        alias: ""
    }

    dispatch(createProjectAuthorize(action))
}
  return (
    <div className="flex">
      <Sidebar />

      <div className="m-5 ">
        <h1>Name</h1>
        <input type="text" placeholder="Nam ..." className="outline-none py-1 px-5 border-2" onChange={e => setName(e.target.value)}/>
        <div >
            <h1>Description</h1>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="h-[300px]"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
        </div>
        <div>
        <select name="cars" id="cars" className="mt-[100px] p-1 w-full outline-none border-2 rounded-sm" onChange={e => setCategory(e.target.value)}>
            <option value="1">Dự án web</option>
            <option value="2">Dự án di động</option>
            <option value="3">Dự án phần mềm</option>
            </select>
        </div>
        <button className="mt-5 px-12 py-2 rounded bg-green-400 shadow-sm text-white hover:scale-105 cursor-pointer" onClick={handleCrete}>Create</button>
      </div>
      
    </div>
  );
};

export default CreateProject;

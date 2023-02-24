import { EditorState } from 'draft-js';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { Editor } from "react-draft-wysiwyg";
import { DispatchType } from '../store/store';
import { useDispatch } from 'react-redux';
import { setOpentModal } from '../redux/ModalHoc';
import { getAllProject, updateProjectFromApi } from '../redux/project';
import { FormUpdate, ProjectModal } from '../type/project';
type Props = {
  item:ProjectModal
}



const ModalUpdate = ({item}: Props) => {

  console.log(item)
    const [category,setCategory] = useState<string>('')
    const [name,setName] = useState<string>('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const dispatch:DispatchType = useDispatch()
    const closeModal = () => {
      dispatch(setOpentModal(false))
    }
    const handleSubmit = () => {
      const action:FormUpdate = {
        projectName:name,
        description:editorState.getCurrentContent().getPlainText(),
        categoryId:category,
        creator: 0,
      }
      console.log(name)
    dispatch(updateProjectFromApi(item.id,action))
    console.log(action)
    dispatch(setOpentModal(false))
    dispatch(getAllProject())
    }
  return (
    <div className=''>
       
        <div className='flex justify-between '>
          <h2 className='font-bold text-xl'>Edit Project</h2>
        </div>
       <div className='flex justify-between items-center mt-2'>
        <div>
          <h2>ProjectId</h2>
          <input className='outline-none border-2 px-2 mt-1' type="text" defaultValue={item.id} />
        </div>
        <div>
          <h2>Project Name</h2>
          <input className='outline-none border-2 px-2 mt-1' type="text" defaultValue={item.projectName} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
        <div>
          <h2>Category</h2>
        <select name="cars" id="cars" defaultValue={item.categoryId} className="mt-2 p-1 w-full outline-none border-2 rounded-sm" onChange={e => setCategory(e.target.value)}>
            <option value="1">Dự án web</option>
            <option value="2">Dự án phần mềm</option>
            <option value="3">Dự án di động</option>
            </select>
        </div>
        </div>
       </div>
      <div >
      <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="mt-2 border-2 "
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
      </div>

          <div className="flex justify-end">
          <button className="mt-5 mx-2 px-12 py-2 rounded border-2 bg-white shadow-sm text-gray-600 hover:scale-105 cursor-pointer" onClick={closeModal}>Cancel</button>
          <button className="mt-5 px-12 py-2 rounded bg-green-400 shadow-sm text-white hover:scale-105 cursor-pointer" onClick={handleSubmit}>Update</button>
          </div>
     
    </div>
  )
}

export default ModalUpdate




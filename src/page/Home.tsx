import React, {useEffect, useState} from "react";
import { DispatchType, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../redux/project";
import Pagination from "../components/Pagination";
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import Sidebar from "../components/Sidebar";
import ModalUpdate from "../components/ModalUpdate";
import { componentReducer, setOpentModal } from "../redux/ModalHoc";
import { useNavigate } from "react-router-dom";
import { Member, ProjectModal } from "../type/project";


const Home = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage, setpostPerPage] = useState<number>(10);
    const {allProject,detailProject} = useSelector((state:RootState) => state.projectReducer)
    const {component} = useSelector((state:RootState) => state.modalReducer)
    const navigate = useNavigate();
    const dispatch:DispatchType = useDispatch()

 

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;

    useEffect(() => {
        const getProjects = () =>{
            
            dispatch(getAllProject())
        }
        getProjects()
    },[])

    const handleEdit = (item:ProjectModal) => {
   
      dispatch(componentReducer(<ModalUpdate item={item}/>))
      dispatch(setOpentModal(true))
      
    }
  return (
    <div className="">
     
      <section className="relative flex h-full items-start justify-center overflow-y-hidden border-0 bg-white ">
        {/* Sidenav */}
       <Sidebar/>
        {/* Sidenav */}
        {/* Toggler */}
        <button
          className="mt-10 hidden inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          data-te-sidenav-toggle-ref
          data-te-target="#sidenav-8"
          aria-controls="#sidenav-8"
          aria-haspopup="true"
        >
          <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {/* Toggler */}

        {/* table */}
       
    <div className="flex flex-col w-full m-10 mb-0">
    <h1 className="font-bold text-xl">Project Managerment</h1>
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className=" px-6 py-4">ID</th>
              <th scope="col" className=" px-6 py-4">PROJECT</th>
              <th scope="col" className=" px-6 py-4">CATEGORY</th>
              <th scope="col" className=" px-6 py-4">CREATOR</th>
              <th scope="col" className=" px-6 py-4">MEMBER</th>
              <th scope="col" className=" px-6 py-4">ACTION</th>
            </tr>
          </thead>
          <tbody>

            {
                allProject?.slice(firstPostIndex,lastPostIndex).map((item:ProjectModal,index:number)=>(
            <tr className=" shadow-botoom dark:border-neutral-500" key={index} onClick={() => navigate(`/project/${item.id}`)}>
              <td className="whitespace-nowrap  px-6 py-4 font-medium">{item.id}</td>
              <td className="whitespace-nowrap  px-6 py-4 text-blue-500">{item.projectName}</td>
              <td className="whitespace-nowrap  px-6 py-4">{item.categoryName}</td>
              <td className="whitespace-nowrap  px-6 py-4 "><span className="bg-green-500/10 px-2 rounded text-green-500">{item.creator.name}</span></td>
              <td className="whitespace-nowrap  px-6 py-4">{
                <ul className="flex justify-center">
                    {item.members ? item.members.slice(0,2).map((member:Member,index:number) => (
                        <li className="" key={index}>{member.name}</li>
                    )): ''}
                </ul>
              }</td>
              <td>
                <ul className="flex justify-center">
                  <li className="mx-1 p-2 bg-blue-500 rounded shadow-lg hover:scale-105" onClick={() => handleEdit(item)}><AiFillEdit className="text-white"/></li>
                  <li className="mx-1 p-2 bg-red-800 rounded shadow-lg hover:scale-105"><AiFillDelete className="text-white"/></li>
                </ul>
              </td>
            </tr>
                ))
            }
            
            
           
          </tbody>
          
        </table>
        <Pagination totalPages={Number(allProject?.length)} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  </div>
</div>
            
      </section>


      

    </div>
  );
};

export default Home;

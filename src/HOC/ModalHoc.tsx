import React, { useState } from 'react'
import Modal from 'react-modal';
import { DispatchType, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
//import { changeComponent, setIsOpen } from '../redux/modalReducer';
import {GrClose} from 'react-icons/gr'
type Props = {

}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalHoc = () => {

  const {component,modalIsOpen} = useSelector((state:RootState) => state.modalReducer)

  const dispatch:DispatchType = useDispatch()

  return (
    <div className="modal-hoc">
      <Modal
    isOpen={modalIsOpen}

   // onRequestClose={() => dispatch(setIsOpen(false))}
 
    ariaHideApp={false}
    contentLabel="Example Modal"
    style={customStyles}
    
   
  >
    
       {component}
      </Modal>
    </div>
  )
  }

export default ModalHoc
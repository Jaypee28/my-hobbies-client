import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { updateHobby, addHobby, deleteHobby, updateProfile } from '../actions/user';
import { useDispatch } from 'react-redux';
   
interface ModalProps {
    id: number;
    name: string,
    description: string;
    image: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    modalType: string;
}
const Modal: React.FC<ModalProps> = ({ id, name, description, image, title, isOpen, onClose, modalType }) => {
    const outsideRef = React.useRef(null);

    const dispatch: any = useDispatch();

    const [forms, setForms] = useState({
      formID: 0,
      formName: '',
      formDescription: '',
      formImage: '',
      first_name: '',
      last_name: '',
      introduction: ''
    });
    
    const {
      formID,
      formName,
      formDescription,
      formImage,
      first_name,
      last_name,
      introduction
    } = forms;

      const getUserProfile = async () => {
        const res:any = await axios.get('http://localhost:5000/api/user');
        
        const data = await res.data;
    
        await setForms({...data,
          first_name: data.first_name,
          last_name: data.last_name,
          introduction: data.introduction
        });
    
      }

    useEffect(() => {
      if(modalType === "ADD"){
        setForms({ formID: 0, formName: '', formDescription: '', formImage: '', first_name: '', last_name: '', introduction: '' });
      }else if(modalType === "EDIT"){
        setForms({ formID: id, formName: name, formDescription: description, formImage: image, first_name: '', last_name: '', introduction: '' });
      }else{
        getUserProfile();
      }
    }, [id, name, description, image]);

    const onChange = (e: any) => setForms({ ...forms, [e.target.name]: e.target.value });
    
    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current){
            onClose();
            setForms({ formID: 0, formName: '', formDescription: '', formImage: '', first_name: '', last_name: '', introduction: '' });
        } 
    }

    const submitHandler = async (e: SyntheticEvent) => {
      e.preventDefault();

      if(modalType === "EDIT"){
        await dispatch(updateHobby(formID, formName, formDescription, formImage));  
      }

      if(modalType === "ADD"){
        await dispatch(addHobby(formName, formDescription, formImage));

        setForms({
          ...forms,
          formName: '',
          formDescription: '',
          formImage: ''
        })
      }

      if(modalType === "DEL"){
        await dispatch(deleteHobby(id));
      }

      if(modalType === "PROFILE"){
        await dispatch(updateProfile(first_name, last_name, introduction));
      }

      onClose();
      
    };

    return isOpen ? (
        <div className={'modal'}>
            <div
                ref={outsideRef}
                className={'modal-overlay'}
                onClick={handleCloseOnOverlay}
              />
            <div className={'modal-box'}>
             <button
              className={'modal-close'}
              onClick={onClose}
             >
            </button>
            <div className={'modal-title text-center'} style={{ color: modalType === "DEL" ? 'red' : '#41b5cf;' }}>
              {title}
            </div>
            <div className={'modal-content'}>
              {modalType === "EDIT" || modalType === "ADD" ? 
              // Edit and Add Content
                <>
                <form onSubmit={submitHandler}>
                  <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={formName}
                        name="formName"
                        onChange={(e) => onChange(e)}
                    />
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Description
                    </label>
                    <textarea
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={formDescription}
                        name="formDescription"
                        onChange={(e) => onChange(e)}

                    />
                  </div>
                  <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Image {"(Please provide a link only)"}
                    </label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={formImage}
                        name="formImage"
                        onChange={(e) => onChange(e)}
                    />
                    <div className="text-right">
                      <button className="px-4 py-2 mr-2 mt-2 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
                        {modalType === "EDIT" ? "Save Changes" : "Add"}
                      </button>

                      <button className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-red-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={onClose}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </> 
                // /Edit and Add Content
                : modalType === "DEL" ?
                // Delete Content
                <>
                <h1 className='text-center' style={{ fontSize: "30px", color: "black"}}>Delete Hobby?</h1>
                  <div className="text-right">
                    <form onSubmit={submitHandler}>
                      <button className="px-4 py-2 mr-3 mt-3 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
                        Yes
                      </button>

                      <button className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-red-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={onClose}>
                        No
                      </button>
                    </form>
                  </div>
                </>
                  // /Delete Content
                :
                // Profile Content 
                  <form onSubmit={submitHandler}>
                  <div className="mb-2">
                    <label
                        htmlFor="first_name"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={first_name}
                        name="first_name"
                        onChange={(e) => onChange(e)}
                    />
                    <label
                        htmlFor="last_name"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={last_name}
                        name="last_name"
                        onChange={(e) => onChange(e)}
                    />
                    <label
                        htmlFor="introduction"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Introduction
                    </label>
                    <textarea
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={introduction}
                        name="introduction"
                        onChange={(e) => onChange(e)}

                    />
                  </div>
                    <div className="text-right">
                      <button className="px-4 py-2 mr-2 mt-2 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
                        {modalType === "EDIT" || modalType === "PROFILE" ? "Save Changes" : "Add"}
                      </button>

                      <button className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-red-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={onClose}>
                        Cancel
                      </button>
                    </div>
                  </form>
                // /Profile Content
                  }
            </div>
          </div>
        </div>
        ) : null;
}

export default Modal;
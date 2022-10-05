import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { RootState } from '../store';
import Table from '../components/Table';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    first_name: '', 
    last_name: '',
    introduction: '',
  });

  const toggleModal = () => setModalState(!isModalOpen);

  const [isModalOpen, setModalState] = useState(false);

  const [modalType, setModalType] = useState("");

  const getUserProfile = async () => {
    const res:any = await axios.get('http://localhost:5000/api/user');
    
    const data = await res.data;

    await setProfile({
      first_name: data.first_name,
      last_name: data.last_name,
      introduction: data.introduction
    });

  }

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const updateProfileModal = () => {
    setModalType("PROFILE");
    toggleModal();
  }

  return (
    <>
    <Navbar />
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{profile.first_name} {profile.last_name}</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{profile.introduction}</p>
          <div className=" items-center flex-wrap ">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg" onClick={updateProfileModal}>Edit Profile</button>
          </div>
        </div>
      <div>
        <div className="flex flex-col w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">My Hobbies</h1>
          <Table />
        </div>
      </div>
      </div>
      <Modal
        id={0}
        name={''}
        description={''}
        image={''}
        title={modalType === "EDIT" ? 'Edit' : modalType === "ADD" ? "Add" : modalType === "DEL" ? "Delete" : "Update Profile" }
        isOpen={isModalOpen}
        onClose={toggleModal}
        modalType={modalType}
      />
    </section>
    </>
  );
}

const mapState = (state: RootState) => ({
  auth: state.auth
});

const connector = connect(mapState, null);

export default connector(Profile);
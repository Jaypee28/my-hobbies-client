import axios from 'axios';
import Modal from '../components/Modal';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Table: React.FC = () => {
    interface Hobbies {
        id: number,
        name: string,
        description: string,
        img: string
    }
    
    const [hobbies, setHobbies] = useState<Hobbies[]>([]);

    const [sort, setSort] = useState<Hobbies[]>([]);

    const [sorted, setSortID] = useState(false);

    const [query, setQuery] = useState("");

    const [isModalOpen, setModalState] = useState(false);

    const [modalType, setModalType] = useState("");

    const [modalData, setMdodalData] = useState({
        id: 0,
        name: '',
        description: '',
        img: '',
    });

    const toggleModal = () => setModalState(!isModalOpen);

    const getUserHobbies = async () => {
        const res:any = await axios.get('http://localhost:5000/api/hobbies');

        const data = await res.data;

        await setHobbies(data);
    }

    const sortDesc = async () => {
        const res:any = await axios.get('http://localhost:5000/api/hobbies/sort/desc');

        const data = await res.data;

        await setHobbies(data);

        await setSortID(false);
    }

    const sortASC = async () => {
        const res:any = await axios.get('http://localhost:5000/api/hobbies/sort/asc');

        const data = await res.data;
        
        await setSort(data);

        await setSortID(false);

    }

    const sortID = async () => {
        const data = await hobbies.sort((a, b) => {
            if(a.id > b.id){
                return 1;
            }else{
                return -1;
            }
        });

        await setSort(data);
        setSortID(true)
    }

    const openEditModal = (id: number, name: string, description: string, image: string) => {
        setModalType("EDIT");
        toggleModal();
        setMdodalData({
            id: id,
            name: name,
            description: description,
            img: image
        })
        
    }

    const openDeleteModal = (id: number) => {
        setModalType("DEL");
        toggleModal();
        setMdodalData({
            id: id,
            name: '',
            description: '',
            img: ''
        })
        console.log(id)
    }

    const openAddModal = () => {
        setModalType("ADD");
        toggleModal();
    }

    useEffect(() => {
     getUserHobbies();
    }, [getUserHobbies])
    
    function classNames(...classes:any) {
        return classes.filter(Boolean).join(' ');
    }

    const sortedHobbies = sorted ? sort : hobbies

    return (
        
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="flex justify-between py-3 pl-2">
                    <div className="relative max-w-xs">
                        <label htmlFor="hs-table-search" className="sr-only">
                            Search
                        </label>
                        <input
                            type="text"
                            name="hs-table-search"
                            onChange={e => setQuery(e.target.value)}
                            id="hs-table-search"
                            className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500  bg-gradient-to-r from-cyan-200 to-blue-400"
                            placeholder="Search..."
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg
                                className="h-3.5 w-3.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                            <button 
                            className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg"
                            onClick={openAddModal}
                            >
                                Add
                            </button>
                        </div>
                    {/* Dropdown Selection */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Sort
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                            onClick={sortASC}
                                            className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                          )}
                                        >
                                          Sort By Name Ascending
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          onClick={sortDesc}
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                          )}
                                        >
                                          Sort By Name Descending
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          onClick={sortID}
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                          )}
                                        >
                                          Sort By ID
                                        </a>
                                      )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* /Dropdown Selection */}                       
                    </div>
                </div>

                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y table-auto divide-gray-200 text-center">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase "
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase "
                                    >
                                        Image
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    sortedHobbies.filter(post => {
                                        if(query === ''){
                                            return post;
                                        }else if(post.name.toLowerCase().includes(query.toLocaleLowerCase()) || post.id.toString().includes(query.toString())){
                                            return post;
                                        }
                                    }).map((hobby)=>{
                                        
                                        return (
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    {hobby.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {hobby.name}
                                                </td>
                                                <td className="px-6 py-4 mx-auto text-sm text-gray-800 whitespace-nowrap">
                                                    <img src={hobby.img} className="h-20 w-30 mx-auto" alt="hobby-img"/>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <button
                                                     className="text-green-500 hover:text-green-700"
                                                     onClick={ () => { openEditModal(hobby.id, hobby.name, hobby.description, hobby.img) }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={ () => { openDeleteModal(hobby.id) }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <Modal
                            id={modalData.id}
                            name={modalData.name}
                            description={modalData.description}
                            image={modalData.img}
                            title={modalType === "EDIT" ? 'Edit' : modalType === "ADD" ? "Add" : "Delete" }
                            isOpen={isModalOpen}
                            onClose={toggleModal}
                            modalType={modalType}
                        />
                    </div>
                </div>
            </div>
        </div>
  );
}

const mapState = (state: RootState) => ({
    auth: state.auth
  });
  
const connector = connect(mapState, null);

export default connector(Table);
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../actions/auth';
import { RootState } from '../store';

const Login: React.FC = () => {
    const dispatch:any = useDispatch();

    const navigate = useNavigate();

    const isAuthenticated = useSelector<any>(state => state.auth.isAuthenticated);

    if(isAuthenticated){
        navigate("/home");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [registerState, setRegister] = useState(false);

    const submitHandler = async (e: SyntheticEvent) => {
      e.preventDefault();
      
      registerState ? await dispatch(register(firstName, lastName, email, password, passwordConfirm)) 
      : await dispatch(login(email, password));
      
    };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-cyan-700 underline">
               {registerState ? "Register" : "Sign In"}
            </h1>
            <form className="mt-6" onSubmit={submitHandler}>
                {
                registerState ? <>
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                </>: null
                }
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {
                registerState ? <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password Confirm
                    </label>
                    <input
                        type="password"
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:gradient-to-r from-cyan-400 to-blue-400 focus:ring-gradient-to-r from-cyan-400 to-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div> : null
                }
                
                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type='submit'>
                        {registerState ? "Register" : "Login"}
                    </button>
                </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
                <button
                    onClick={() => registerState ? setRegister(false) : setRegister(true)}
                    className="font-medium text-cyan-600 hover:underline"
                >
                    {registerState ? "Login" : "Register"}
                 </button>
            </p>
        </div>
    </div>
  )
}

const mapState = (state: RootState) => ({
    auth: state.auth
});
  
const connector = connect(mapState, null);

export default connector(Login);
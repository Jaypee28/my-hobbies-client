import axios from "axios";

const setAuthToken = ( token: any) => {
    if(token) {
        axios.defaults.headers.common['X-Auth-Token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['X-Auth-Token'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;
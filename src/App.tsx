import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LOGOUT, CLEAR_PROFILE } from './actions/types';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Footer from './components/Footer';

//redux
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import store from './store';

function App() {

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch<any>(loadUser());
    
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT })
        store.dispatch({ type: CLEAR_PROFILE })
      }
    })

  }, []);
  
  return (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  </Provider>
  );
}

export default App;

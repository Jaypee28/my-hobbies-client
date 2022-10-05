import { useEffect } from 'react';
import Hobbies from '../components/Hobbies';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { RootState } from '../store';
import { loadUser } from '../actions/auth';

const Home: React.FC = () => {

  const isAuthenticated = useSelector<any>(state => state.auth.isAuthenticated);

  const navigate = useNavigate();

  const navConfig = {
    replace : true
  }

  useEffect(() => {
    loadUser();

    if(!isAuthenticated){
      navigate('/', navConfig);
    }
  
  });

  return (
    <>
    <Navbar />
    <Hobbies />
    </>
  )
}

const mapState = (state: RootState) => ({
  auth: state.auth
});

const connector = connect(mapState, null);

export default connector(Home)
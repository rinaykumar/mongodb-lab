import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn } from '../redux/actions/userActions';

// {text, setText}
// const text = props.text
// const setText = props.setText
const ComponentA = () => {
  // dispatch sends events to the reducers
  const dispatch = useDispatch(); // must be combined with an action

  // extract a value from the global redux store
  const userName = useSelector(state => state.userReducer.userName);
  return (
    <div>
      <h3>Component A</h3>
      <input 
        value={userName} 
        onChange={e => dispatch(setUserName(e.target.value))}
      />
      <button onClick={() => dispatch(setIsLoggedIn(true))}>
        Log In
      </button>
    </div>
  );
};

const ComponentC = () => {
  // get data directly from redux store, now its stand alone!
  const userName = useSelector(state => state.userReducer.userName);
  return (
    <div>
      <h3>Component C</h3>
      <h2>{userName}</h2>
    </div>
  );
};

const ComponentB = () => {
  return (
    <div>
      <h3>Component B</h3>
      <ComponentC />
    </div>
  );
};

const Home = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const userName = useSelector(state => state.userReducer.userName);
  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn && (
        <div>
          welcome {userName}
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <ComponentA />
          <ComponentB />
        </div>
      )}
    </div>
  );
};

export default Home;

const initState = () => ({
  userName: 'abc',
  isLoggedIn: false,
});

// keep track of the current app state
// modify the state given a request (action) [its an object]
const userReducer = (state = initState(), action) => {
  // all actions have a type
  console.log(action);
  switch(action.type){
    case 'USER_NAME_SET':
      return {
        ...state, // copy old state
        userName: action.userName, // input the new user name
      };
    case 'USER_SET_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      // we don't want to modify state, ignore action
      return state;
  }
};

export default userReducer;
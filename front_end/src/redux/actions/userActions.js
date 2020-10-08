export const setUserName = (userName) => ({
  type: 'USER_NAME_SET',
  userName,
});
// creates an object this:
/*
{
  type: 'USER_NAME_SET',
  userName: 'hello,
}
This object is the action!
*/

export const setIsLoggedIn = (isLoggedIn) => ({
  type: 'USER_SET_LOGGED_IN',
  isLoggedIn,
});
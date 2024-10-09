export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  const token = getToken();
  if(!token) 
    return null;
  else
    return localStorage.getItem('userId');
};

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
};

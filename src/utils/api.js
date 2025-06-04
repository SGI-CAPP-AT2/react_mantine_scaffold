let loggedIn;

export const register = async () => {
  loggedIn = true;
};

export const login = async () => {
  loggedIn = true;
};

export const logout = async () => {
  loggedIn = false;
};

export const getUserDetails = async () =>
  loggedIn
    ? {
        uname: "someone",
        email: "hello@someone.me",
        id: "1",
      }
    : null;

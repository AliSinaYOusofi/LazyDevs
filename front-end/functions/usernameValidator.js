let usernameRegex = /^[a-zA-Z0-9]+$/;
export const usernameValidator  = (username) => usernameRegex.test(String(username).toLowerCase())
let usernameRegex = /^(?=.{1,})[a-zA-Z]+$/;
export const usernameValidator  = (username) => username?.length ? usernameRegex.test(String(username).toLowerCase()) : false
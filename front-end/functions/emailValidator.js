export const emailValidator = (email) => new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(email.toLowerCase() || "")
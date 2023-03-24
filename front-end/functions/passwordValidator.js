let re = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/; // min 8 at least one capital one number
export const passwordValidator = password => re.test(password)
let fullnameRegex = /^[a-zA-Z ]{3,20}$/ // include only letters and spaces length 3, 20.
export const fullnameValidator  = (fullname) => fullnameRegex.test(String(fullname).toLowerCase())
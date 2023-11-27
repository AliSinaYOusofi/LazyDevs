export default function check_cookie(name) {
    return document.cookie.split('; ').some(row => {
        return row.startsWith(name + '=')
    })
}
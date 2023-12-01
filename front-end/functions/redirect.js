// import { useAppContext } from "@/context/useContextProvider"
// import delete_cookie from "./delete_cookie"
// import { redirect } from "next/navigation"

// export default function redirect(route) {
//     const {setCurrentUser} = useAppContext()
//     localStorage.removeItem("currentUser")
//     setCurrentUser(null)
//     delete_cookie("accessToken")
//     delete_cookie("refreshToken")
//     redirect(route)
// }
import React from 'react'
import Social from '../SocialIcons/Social'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import CommunityInfo from '../Community Info/CommunityInfo';
import { useAppContext } from '@/context/useContextProvider';

export default function Sidebar({sidebar}) {

    const pathname = usePathname();
    const {currentUser, setCurrentUser} = useAppContext();
    const router = useRouter()

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        router.push("/");
    }

    return (
        <div className={`transfrom ${sidebar ? "-translate-x-full" : "-translate-x-0"} flex z-[100] justify-center fixed transition-all duration-300 shadow-black/10 shadow-sm bg-gray-100 top-0 left-0 flex-col h-screen w-64  text-black`}>
            
            <nav className="flex-grow w-full mt-12">
                <p className="font-bold tracking-wide text-gray-900 text-3xl mb-3 ml-2">Links</p>
                <ul className="flex flex-col justify-center items-start gap-y-3 w-full">
                    <li className="w-full p-1">
                        <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/" ? "bg-white" : ""}`}  href="/">
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className="w-7 h-7"
                            >
                                <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
                            </svg>
                            Home
                        </Link>
                    </li>

                    <li className="w-full p-1" id="bu-users-accordion">
                        <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/blogs" ? "bg-white" : ""}`}  href="/blogs">
                            <svg
                                viewBox="0 0 64 64"
                                fill="currentColor"
                                className="w-7 h-7"
                                >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    strokeWidth={2}
                                    d="M1 1h46v62H1zM9 63V2M14 15h28M14 21h28M63 3v50l-4 8-4-8V3zM55 7h-4v10"
                                />
                            </svg>
                        Blogs
                        </Link>
                    </li>

                    <li className="w-full p-1" id="bu-users-accordion">
                        {
                            currentUser
                            ?
                            <p onClick={handleLogout} className={`p-2 gap-x-2 cursor-pointer flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/blogs" ? "bg-white" : ""}`}  href="/login">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>

                                Log out
                            </p>
                            :
                            <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/blogs" ? "bg-white" : ""}`}  href="/login">
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    className="w-7 h-7"
                                >
                                    <defs>
                                        <style />
                                    </defs>
                                    <path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 01520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 01270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 010 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z" />
                                </svg>
                                Login
                            </Link>
                        }
                    </li>

                    <li className="w-full p-1" id="bu-users-accordion">

                        {
                            currentUser ?
                            null :
                            <Link className={`p-2 gap-x-2 flex items-center transition-all duration-200 hover:bg-white  text-sm text-slate-700 rounded-md ${pathname === "/create_account" ? "bg-white" : ""}`}  href="/create_account">
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    className="w-7 h-7"
                                    >
                                    <path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
                                </svg>
                            Create Account
                            </Link>
                        }
                    </li>
                </ul>
                <CommunityInfo />
            </nav>
            <div className="ml-2 mb-2">
                <Social />
            </div>
        </div>
    )
}

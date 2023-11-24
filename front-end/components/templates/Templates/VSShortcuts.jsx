import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'

export default function VSShortcuts() {

    const htmlRef = useRef()
    const {setTemplateContent} = useAppContext()
    const router = useRouter()

    const handleClick = () => {
        const markDownContent = (html2md(htmlRef.current.innerHTML))
        setTemplateContent(markDownContent)
        router.push("/create_post")
    }

    
    return (

        <>
            <div ref={htmlRef} className="max-w-2xl mx-auto px-4 py-8 blog">
                <h1> Top 3 Visual Studio Keyboard Shortcuts  </h1>

                <p>
                    Playing with keyboard shortcuts is very interesting and reduce the headache of using the mouse again and again while programming with visual studio IDE. Actually, keyboard shortcuts also enhance your productivity and make your programming life easy and convenient. So, I decided to share a list of top 10 visual studio keyboard shortcuts that's are amazing and very helpful. For more shortcuts refer the article Visual Studio Useful Keyboard Shortcut Keys.
                </p>

                <h1> 1. F5 & Ctrl-F5</h1>
                <p>
                    F5 is used to start your project in debug mode and Ctrl-F5 is used to start your project without debug mode.
                </p>
                <img src="https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort1.png" alt="short 1" />

                <h1> 2. F7 & Shift-F7 </h1>
                <p>
                    F7 is used to show code view of your webpage. 
                </p>

                <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort2_1.png"} alt="short 2" />
                <p>Shift-F7 is used to show design view of your webpage.</p>
                {/* <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort2_1.png"} alt="short 3" /> */}

                <h1> 3. F6 / Shift-F6 / Ctrl-Shift-B </h1>
                <p> All of the above shortcuts are used to build the project or solutions. </p>
                <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort3.png"} alt="short 4" />
            </div>
            
            <button 
                type="button" 
                onClick={handleClick} 
                className=" duration-300 hover:text-white cursor-pointer mx-auto rounded-sm bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10  px-4 mt-[10px] text-lg font-ligh ">
                Apply template
            </button>
        </>
    )
}

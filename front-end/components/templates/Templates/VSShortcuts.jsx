import Link from 'next/link'
import React from 'react'

export default function VSShortcuts() {

    let content = [
        '# Top 3 Visual Studio Keyboard Shortcuts $',
        'Playing with keyboard shortcuts is very interesting and reduce the headache of using the mouse again and again while programming with visual studio IDE. Actually, keyboard shortcuts also enhance your productivity and make your programming life easy and convenient. So, I decided to share a list of top 10 visual studio keyboard shortcuts that\'s are amazing and very helpful. For more shortcuts refer the article Visual Studio Useful Keyboard Shortcut Keys. $',
        '## 1. F5 & Ctrl-F5 $',
        'F5 is used to start your project in debug mode and Ctrl-F5 is used to start your project without debug mode. $',
        '![[straw image!]](https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort1.png) $',
        '# 2. F7 & Shift-F7 $',
        'F7 is used to show code view of your webpage. $',
        '![[straw image!]](https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort2_1.png) $',
        'Shift-F7 is used to show design view of your webpage. $',
        '## 3. F6 / Shift-F6 / Ctrl-Shift-B $',
        'All of the above shortcuts are used to build the project or solutions. $',
        '![[straw image!]](https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort2_1.png) $'
    ]

    content = encodeURIComponent(JSON.stringify(content))
    
    return (
        <div className="max-w-2xl mx-auto px-4 py-8 blog">
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

            {/* <h1> 4. Ctrl-Shift-A & Alt-Shift-A </h1>
            <p> Ctrl-Shift-A is used to add new item to your project.  </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort4_1.png"} alt="image" />

            <p> Alt-Shift-A is used to add existing item to your project.  </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort4_2.png"} />
            
            <h1> 5. Ctrl-K + Ctrl-C & Ctrl-K + Ctrl-U </h1>
            <p> Ctrl-K + Ctrl-C is used to do comment a selected block of code.  </p>
            <img src="https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort5_1.png" />

            <h1> 6. Ctrl-M + Ctrl-O & Ctrl-M + Ctrl-P</h1>
            <p>Ctrl-M + Ctrl-O is used to collapse all code to definitions. </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort6_1.png"} alt="image" />
            <p> Ctrl-M + Ctrl-P is used to expand all code.</p>

            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort6_2.png"} alt="image 2" />
            
            <h1> 7. Ctrl-K + Ctrl-S & Alt-Shift-Arrow(Right,Left,Bottom,Top) </h1>
            <p> Ctrl-K + Ctrl-S is used to surrounded a block of code to an specific block or control.  </p>
            <img src="https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort7_1.png" alt="image" />
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort7_2.png"} alt="image" />
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort7_3.png"} alt="image" />

            <p> Alt-Shift-Arrow(Right,Left,Bottom,Top) are used to copy, paste, write vertically as shown in fig. </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort7_5.png"} alt="image" />
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort7_6.png"} alt="image" />

            <h1>8. Ctrl-(+) + Ctrl-. & F12</h1>
            <p> Ctrl-(+) + Ctrl-. is used to display smarttag under the red line that provides the options for fixing the code problem.  </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort8.png"} alt="image" />

            <h1> 9. Ctrl-Shift-F, Ctrl-F & Ctrl-H  </h1>
            <p> Ctrl-Shift-F is used to find all the ocuurance of a string with in entire solution and display find result window as shown below.  </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort9.png"} alt="image" />
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort9_1.png" } alt="image"/>

            <p> Ctrl-F is used to find a string in the current document, project and all open documents one by one. Ctrl-H is used to replace a string by a new string in current document, project and entire solution as you want to replace. </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort9_2.png"} alt="im" />

            <h1>10.  F4 & Ctrl-Alt-L </h1>
            <p> F4 is used to show property window. </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort10_1.png"} alt="image" />
            <p> Ctrl-Alt-L is used to show solution explorer. </p>
            <img src={"https://dotnettrickscloud.blob.core.windows.net/img/vs/vsshort10_2.png"} alt="image" /> */}
            <Link href={{ pathname:"/create_post", query: {'content' : content} }} className="hover:bg-blue-600 hover:text-white mt-10  flex bg-white/50 p-2 rounded-sm w-fit">
                Apply template
            </Link>
        </div>
    )
}

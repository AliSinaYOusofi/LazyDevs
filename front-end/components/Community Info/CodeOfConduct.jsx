import React from 'react'

export default function CodeOfConduct() {
    return (
        <div className="w-full p-6 md:w-[50%] mx-auto shadow-black/20 shadow-sm">
            <div className="mt-14">
                <h1 className="font-extrabold text-4xl"> Code of Conduct </h1>
                <p className="mt-2"> All participants of Community are expected to abide by our Code of Conduct.</p>
            </div>
            <div>
                <h1 className="font-extrabold text-4xl mt-5">Our Pledge</h1>
                <p className="mt-2">
                    We want to foster a positive and respectful community for all bloggers and readers. 
                    To ensure that everyone feels safe and 
                    comfortable while using our blogging website, 
                    we have established the following Code of Conduct:
                </p>

                <ul className="flex flex-col gap-y-4 mt-5">
                    <li className="flex justify-center items-start gap-x-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M14 1.5V22h-2V3.704L7.5 4.91V2.839l5-1.339z" />
                        </svg>
                        Be respectful and courteous towards all members of the community. 
                        This includes other bloggers, readers, and administrators. Treat others as you would like to be treated.
                    </li>
                    
                    <li className="flex justify-center items-start gap-x-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M16 7.5a4 4 0 10-8 0H6a6 6 0 1110.663 3.776l-7.32 8.723L18 20v2H6v-1.127l9.064-10.802A3.982 3.982 0 0016 7.5z" />
                        </svg>
                        Do not engage in any form of harassment, hate speech, or discrimination. 
                        This includes but is not limited to: racial slurs, derogatory comments, personal attacks, 
                        and any other form of behavior that makes others feel uncomfortable or unwelcome.
                    </li>

                    <li className="flex justify-center items-start gap-x-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18 2v1.362L12.809 9.55a6.501 6.501 0 11-7.116 8.028l1.94-.486A4.502 4.502 0 0016.5 16a4.5 4.5 0 00-6.505-4.03l-.228.122-.69-1.207L14.855 4H6.5V2H18z" />
                        </svg>
                        Do not share or publish any content that is offensive or inappropriate. 
                        This includes content that is sexually explicit, violent, or discriminatory.
                    </li>
                    
                    <li className="flex justify-center items-start gap-x-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7"
                            >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M16 1.5V16h3v2h-3v4h-2v-4H4v-1.102L14 1.5h2zM14 16V5.171L6.968 16H14z" />
                        </svg>
                       Do not engage in any form of spamming or advertising. This includes self-promotion 
                       and promotion of other products or services that are not related to the website.
                    </li>

                    <li className="flex justify-center items-start gap-x-2">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-7 h-7"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18 2v2H9.3l-.677 6.445a6.5 6.5 0 11-2.93 7.133l1.94-.486A4.502 4.502 0 0016.5 16a4.5 4.5 0 00-4.5-4.5c-2.022 0-3.278.639-3.96 1.53l-1.575-1.182L7.5 2H18z" />
                            </svg>
                        Respect the privacy of others. 
                        Do not share any personal information about other users or engage in any form of doxxing.
                    </li>
                </ul>
            </div>

            <p className="mt-4">
                Failure to follow this Code of Conduct may result in warnings or the suspension or 
                termination of your account. We reserve the right to modify this Code of Conduct at any time.
            </p>
        </div>
    )
}

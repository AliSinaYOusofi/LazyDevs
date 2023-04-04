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
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3840/3840653.png"
                            alt="one_image"
                            className="w-6 h-6"
                        />
                        Be respectful and courteous towards all members of the community. 
                        This includes other bloggers, readers, and administrators. Treat others as you would like to be treated.
                    </li>
                    
                    <li className="flex justify-center items-start gap-x-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3840/3840738.png"
                            alt="one_image"
                            className="w-6 h-6"
                        />
                        Do not engage in any form of harassment, hate speech, or discrimination. 
                        This includes but is not limited to: racial slurs, derogatory comments, personal attacks, 
                        and any other form of behavior that makes others feel uncomfortable or unwelcome.
                    </li>

                    <li className="flex justify-center items-start gap-x-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3840/3840739.png"
                            alt="one_image"
                            className="w-6 h-6"
                        />
                        Do not share or publish any content that is offensive or inappropriate. 
                        This includes content that is sexually explicit, violent, or discriminatory.
                    </li>
                    
                    <li className="flex justify-center items-start gap-x-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3840/3840753.png"
                            alt="one_image"
                            className="w-6 h-6"
                        />
                       Do not engage in any form of spamming or advertising. This includes self-promotion 
                       and promotion of other products or services that are not related to the website.
                    </li>

                    <li className="flex justify-center items-start gap-x-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3840/3840754.png"
                            alt="one_image"
                            className="w-6 h-6"
                        />
                        Respect the privacy of others. 
                        Do not share any personal information about other users or engage in any form of doxxing.
                    </li>

                    <li className="flex justify-center items-start gap-x-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3840/3840755.png"
                            alt="one_image"
                            className="w-6 h-6"
                        />
                        Follow all laws and regulations. 
                        Do not engage in any illegal activity, such as copyright infringement or hacking.
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

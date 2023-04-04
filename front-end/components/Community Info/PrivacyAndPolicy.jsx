import React from 'react'

export default function PrivacyAndPolicy() {
    
    return (
        <div className="w-full p-6 md:w-[50%] mx-auto shadow-black/20 shadow-sm">
            <div className="mt-14">
                <h1 className="font-extrabold text-4xl"> Privacy And Policy</h1>
                <p className="mt-2">
                    At our blogging website, we take your privacy very seriously. 
                    We want you to know how we collect and use your personal information. 
                    Please read this privacy policy carefully before using our website.
                </p>
            </div>
            <div>
                <h1 className="font-extrabold text-4xl mt-5">Our Pledge</h1>
                <p className="mt-2">
                    We want to foster a positive and respectful community for all bloggers and readers. 
                    To ensure that everyone feels safe and 
                    comfortable while using our blogging website.
                </p>

                <div className="flex flex-col gap-y-4 mt-5">
                    <div>
                        
                        <h1 className="flex items-center justify-start gap-x-2 text-2xl"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3840/3840653.png"
                                alt="one_image"
                                className="w-6 h-6"
                            />
                            Information we collect 
                        </h1>
                        
                        <p className="mt-2">
                            We collect personal information such as your name and email address when you sign 
                            up for an account on our website. We also collect information 
                            about your browsing behavior and device information when you visit our website.
                        </p>

                    </div>

                    <div>
                        
                        <h1 className="flex items-center justify-start gap-x-2 text-2xl"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3840/3840738.png"
                                alt="one_image"
                                className="w-6 h-6"
                            />
                            How we use your information 
                        </h1>
                        
                        <p className="mt-2">
                            We use your personal information to provide you with a personalized experience on our website. 
                            This includes sending you newsletters, notifications, and other communication related to your account. 
                            We also use your information to analyze your behavior on our website and improve our services.
                        </p>

                    </div>

                    <div>
                        
                        <h1 className="flex items-center justify-start gap-x-2 text-2xl"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3840/3840739.png"
                                alt="one_image"
                                className="w-6 h-6"
                            />
                            Cookies 
                        </h1>
                        
                        <p className="mt-2">
                            We use cookies to collect information about your browsing behavior on our website. 
                            Cookies are small files that are stored on your device. 
                            You can choose to disable cookies in your browser settings.
                        </p>

                    </div>

                    <div>
                        
                        <h1 className="flex items-center justify-start gap-x-2 text-2xl"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3840/3840753.png"
                                alt="one_image"
                                className="w-6 h-6"
                            />
                            Third-party links:
                        </h1>
                        
                        <p className="mt-2">
                            Our website may contain links to third-party websites. 
                            We are not responsible for the privacy policies or practices of these websites.
                        </p>

                    </div>

                    <div>
                        
                        <h1 className="flex items-center justify-start gap-x-2 text-2xl"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3840/3840754.png"
                                alt="one_image"
                                className="w-6 h-6"
                            />
                            Security
                        </h1>
                        
                        <p className="mt-2">
                            We take security seriously and use appropriate measures to protect your personal information 
                            from unauthorized access, disclosure, or use.
                        </p>
                    </div>

                    <div>
                        
                        <h1 className="flex items-center justify-start gap-x-2 text-2xl"> 
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3840/3840755.png"
                                alt="one_image"
                                className="w-6 h-6"
                            />
                            Changes to the Privacy Policy
                        </h1>
                        
                        <p className="mt-2">
                            We reserve the right to modify this privacy 
                            policy at any time. Please check this page regularly for updates.
                        </p>
                    </div>
                </div>

            </div>
            <p className="mt-10">
            If you have any questions or concerns about our privacy policy, 
                please contact us at 
                <a 
                    className="text-blue-600"
                    href="mailto:tinayousofiali@gmail.com"
                    aria-label="Our email"
                    title="Our email"
                >
                   &nbsp; tinayousofiali@gmail.com
                </a>
            </p>
        </div>
    )
}

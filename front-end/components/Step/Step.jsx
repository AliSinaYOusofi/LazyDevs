import Image from "next/image";
import React from "react";
import image from '../../public/13317062_5208993.jpg';

export default function Step () {
    return (
      <div className="px-4 mb-24 flex py-16 h-fit gap-x-10 shadow-black/10 shadow-lg rounded-md flex-col md:flex-row mx-auto sm:max-w-full md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid max-w-2xl mx-auto">
          <div className="flex">
            <div className="flex flex-col items-center mr-6">
              <div className="w-px h-10 opacity-0 sm:h-full" />
              <div>
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                  1
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
              <div className="sm:mr-5">
                <div className="flex items-center justify-center w-8 h-8 my-3 sm:my-0 rounded-full md:bg-indigo-50 bg-transparent sm:w-24 sm:h-24">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3940/3940190.png"
                    alt="research icon"
                    className="w-14"  
                  />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base">
                  Reasearch
                </p>
                <p className="text-sm text-gray-700">
                  Research and plan: Before you start writing, take the time to 
                  research your topic and plan out the structure and main points 
                  of your blog post. This will help ensure that your post is well-organized, informative, and engaging.
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-6">
              <div className="w-px h-10 bg-gray-300 sm:h-full" />
              <div>
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                  2
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
              <div className="sm:mr-5">
                <div className="flex items-center justify-center w-8 h-8 my-3 rounded-full md:bg-indigo-50 sm:bg-transparent sm:w-24 sm:h-24">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2452/2452203.png"
                    alt="research icon"
                    className="w-14"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base">Think clearly</p>
                <p className="text-sm text-gray-700">
                  Write in a clear and concise manner: Use simple language, short sentences, and avoid unnecessary 
                  jargon or complex vocabulary that might confuse your readers. Also, 
                  try to make your writing more engaging by using examples, anecdotes, and relevant images or videos.
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-6">
              <div className="w-px h-10 bg-gray-300 sm:h-full" />
              <div>
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                  3
                </div>
              </div>
              <div className="w-px h-full opacity-0" />
            </div>
            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
              <div className="sm:mr-5">
                <div className="flex items-center justify-center w-10 h-16 my-3 rounded-full md:bg-indigo-50 sm:bg-transparent sm:w-24 sm:h-24">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/440/440741.png"
                    alt="research icon"
                    className="w-14"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base">Edit Revise Publish</p>
                <p className="text-sm text-gray-700">
                  Edit and revise: Once you've finished your first draft, 
                  take some time to edit and revise your blog post.
                  Check for spelling and grammar errors, ensure that your ideas flow logically
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
            <Image
                src={image}
                alt="developer image"
                quality={100}
                placeholder={"blur"}
                fill={"responsive"}
                className="ob object-contain"
            />
        </div>
      </div>
    );
  };
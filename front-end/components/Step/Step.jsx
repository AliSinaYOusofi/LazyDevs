import Image from "next/image";
import React from "react";
import image from '../../public/13317062_5208993.jpg';

export default function Step () {
    return (
      <div className="px-4 flex py-16 h-screen gap-x-10 shadow-black/20 shadow-lg rounded-md flex-col md:flex-row mx-auto sm:max-w-full md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
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
                <div className="flex items-center justify-center w-10 h-10 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                  <svg
                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base">
                  Read the recipe
                </p>
                <p className="text-sm text-gray-700">
                  All recipes are written using certain conventions, which define
                  the characteristics of common ingredients. The rules vary from
                  place to place.
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
                <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                  <svg
                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base">Heart attack</p>
                <p className="text-sm text-gray-700">
                  A flower in my garden, a mystery in my panties. Heart attack
                  never stopped old Big Bear. I didn't even know we were calling
                  him Big Bear.
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
                <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                  <svg
                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base">Never stop</p>
                <p className="text-sm text-gray-700">
                  The first mate and his Skipper too will do their very best to
                  make the others comfortable in their tropic island nest. Michael
                  Knight a young loner.
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
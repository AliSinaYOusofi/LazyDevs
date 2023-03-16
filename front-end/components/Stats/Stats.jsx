import React from "react";

const getDatabaseStats = async () => {
    try {
        const response = await axios.get("http://localhost:3001/database/stats");
        return await response.data.statsArray;
    } catch (error) {
        console.log("Error While Fetching Database Stats: %s", error);
        return null;
    }
}

export default function Statistic () {

    // get the stats of the database: usersRegisterd, likes, posts, and more
    // this should be a server component

    return (
        <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div class="grid grid-cols-2 row-gap-8 md:grid-cols-4">
            <div class="text-center md:border-r">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">144K</h6>
                <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Downloads
                </p>
            </div>
            <div class="text-center md:border-r">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">12.9K</h6>
                <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Subscribers
                </p>
            </div>
            <div class="text-center md:border-r">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">48.3K</h6>
                <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Users
                </p>
            </div>
            <div class="text-center">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">24.5K</h6>
                <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Cookies
                </p>
            </div>
            </div>
        </div>
    );
};
import React from "react";

const ReadingTime = ({ paragraphs }) => {
    
    const calculateReadingTime = () => {
        // Assuming an average reading speed of 200 words per minute

        if (paragraphs) {

            const wordsPerMinute = 200;
    
            // Count the number of words in the paragraphs
            const words = paragraphs.split(" ").length;
    
            // Calculate the reading time in minutes
            const readingTimeInMinutes = words / wordsPerMinute;
    
            // Round up the reading time to the nearest whole number
            const roundedReadingTime = Math.ceil(readingTimeInMinutes);
    
            return roundedReadingTime;
        }
        return "UK"
    };

    return (
        <div>
            <i className="flex items-center justify-center mb-4 gap-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reading Time: {calculateReadingTime()} minute(s)
            </i>
            <hr />
        </div>
    );
};

export default ReadingTime;
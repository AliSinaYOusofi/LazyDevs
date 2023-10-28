import React from "react";

const ReadingTime = ({ paragraphs }) => {
    
    const calculateReadingTime = () => {

        if (paragraphs) {

            const wordsPerMinute = 200;
    
            const words = paragraphs.split(" ").length;
    
            const readingTimeInMinutes = words / wordsPerMinute;
    
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
            
        </div>
    );
};

export default ReadingTime;
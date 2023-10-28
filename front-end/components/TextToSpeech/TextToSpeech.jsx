import React, { useRef, useState } from 'react';

export default function TextToSpeech({ text }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const utteranceRef = useRef();

    const speak = () => {
        if (isPlaying) {
            if (utteranceRef.current) {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                } else {
                    window.speechSynthesis.pause();
                    setIsPlaying(false);
                }
            }
        } else {
            if (!utteranceRef.current) {
                utteranceRef.current = new SpeechSynthesisUtterance(text);
                utteranceRef.current.onend = () => {
                    setIsPlaying(false);
                    console.log('Speech synthesis completed in seconds:', (Date.now() - startTime) / 1000);
                };
            }

            const startTime = Date.now();

            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            } else {
                window.speechSynthesis.speak(utteranceRef.current);
            }

            setIsPlaying(true);
        }
    };

    return (
        <div className="w-full h-fit flex items-center justify-center shadow-gray-200 shadow-md outline-none border-none rounded-sm p-4">
            <div onClick={speak} className="cursor-pointer w-fit">
                {!isPlaying ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                )}
            </div>
                <div className="h-1 bg-black w-full"> </div>


        </div>
    );
}

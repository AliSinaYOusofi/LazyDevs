import Footer from "@/components/Footer/Footer";
import Navbar from '../../components/Navbar/Navbar';

import React from "react";
import About from "@/components/Community Info/About";

export default function layout({ children }) {
    return (
      <html lang="en">
        <body className="w-full h-full">
            <Navbar />
            <div className="flex items-center justify-center w-full ">
                <About />
            </div>
            <Footer />
            {children}
        </body>
      </html>
    );
}
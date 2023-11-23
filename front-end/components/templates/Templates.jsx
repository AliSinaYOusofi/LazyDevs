"use client"
import React from 'react'
import TemplateCard from './TemplateCard'

export default function Templates() {


    // this should show some cards of some templates used for
    // creating a blog template
    return (
        <div className="w-full h-full mt-10 mx-auto gap-x-10">
            <div className="flex flex-wrap  items-center justify-center gap-x-10 gap-y-4 mt-4">
                <TemplateCard 
                    image={"https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"To become a better programmer, you need to be good at the data structure, algorithms, designing using OOP, multi-threading, and various programming concepts like Recursion, divide and conquer, prototyping, and unit testing. Programming is a combination of many skills, which means it’s not possible to learn"} 
                    longTitle={"5 Tips to Become a Better Programmer or Software Developer in 2023"} 
                    title={"Programming"}
                    number={1}
                />
                <TemplateCard 
                    image={"https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Burgers are a classic culinary creation that brings together juicy meat. Burgers are an all-time favorite for many people, offering a satisfying and flavorful meal. The combination of juicy beef, fresh vegetables, and a soft bun creates a delightful taste and texture experience. Let\'s dive into making a delicious burger with a homemade patty and mouthwatering toppings."} 
                    longTitle={"Delicious and Juicy Burger"}
                    title={"Burgers"}
                    number={2} 
                />
                <TemplateCard 
                    image={"https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Our ultimate pick of the best laptops for programming money can buy, chosen by our expert reviewers. These laptops are perfect for coding, with glorious screens and ample battery life. This roundup of the best laptops for programming is ideal if you do a lot of coding. All the laptops on this guide combine portability, flexibility and power in a thin and light package."} 
                    longTitle={"The best laptops for programming in 2023"}
                    title={"Computers"} 
                    number={3}
                />
            </div>
            
            <div  className="flex flex-wrap items-start justify-center gap-x-10 gap-y-4 mt-4">
                <TemplateCard 
                    image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"How to choose between IDE for programming. If you\'re looking to build a Jakarta EE (formerly Java EE) Application, you\'re going to need a few things to get started. Whether you\'re building a web application with Java Server Faces (JSF), a web service using REST, an Enterprise Java Beans (EJB) application, or interacting with a database using Java Persistence API (JPA)"} 
                    longTitle={"The Top 8 IDEs for Programmers"}
                    title={"IDE"}
                    number={4} 
                />
                <TemplateCard 
                    image={"https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Strawberries are not only delicious but also incredibly healthy. They are low in calories and high in vitamins, fiber, and antioxidants. This wonderful fruit can be enjoyed in various ways. Today, let\'s explore a light and refreshing recipe - Strawberry Salad with Balsamic Dressing. This salad combines the sweetness of strawberries with the tanginess of balsamic"} 
                    longTitle={"Light and Refreshing Strawberry Delight"}
                    title={"Strawberry"} 
                    number={5}
                />
                <TemplateCard 
                    image={"https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Playing with keyboard shortcuts is very interesting and reduce the headache of using the mouse again and again while programming with visual studio IDE. Actually, keyboard shortcuts also enhance your productivity and make your programming life easy and convenient. So, I decided to share a list of top 10 visual studio keyboard shortcuts that\'s are amazing and very helpful."} 
                    longTitle={"Top 3 Visual Studio Keyboard Shortcuts"}
                    title="VS" 
                    number={6}
                />
            </div>
            
            <div  className="flex flex-wrap items-start justify-center gap-x-10 gap-y-4 mt-4">
                <TemplateCard 
                    image={"https://images.pexels.com/photos/2985167/pexels-photo-2985167.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Protein powders have become a staple in the nutritional regimens of competitive athletes and recreational gym-goers alike. These products serve as a convenient and high quality source of protein. Yet, with seemingly endless options to choose from, you may wonder which is best for building muscle."} 
                    longTitle={"The Best Protein Powder to Build Muscle in 2023"}
                    title={"Protein"} 
                    number={7}
                />
                <TemplateCard 
                    image={"https://images.pexels.com/photos/6941871/pexels-photo-6941871.png?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Millions of people use Google search every day for a variety of reasons. Students use it for school, business people use it for research, and millions more use it for entertainment. But most people may not be using Google search to its full potential. Want to use Google search more efficiently and get the search results you want quickly?"} 
                    longTitle={"4 Google Search Tips to Use Google More Efficiently"} 
                    title={"Google"}
                    number={8}
                />
                <TemplateCard 
                    image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                    content={"Programming is the art of creating innovative solutions in the form of computer programs for solving problems that vary across a wide spectrum of fields, ranging from classic mathematical puzzles and everyday life issues to weather forecasting and seeking and understanding novel marvels across the cosmos."} 
                    longTitle={"7 Best Programming Books You Need to Read"} 
                    title={"Books"}
                    number={9}
                    />
            </div>
        </div>
    )
}
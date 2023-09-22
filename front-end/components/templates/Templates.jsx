"use client"
import React from 'react'
import TemplateCard from './TemplateCard'

export default function Templates() {


    // this should show some cards of some templates used for
    // creating a blog template
    return (
        <div className="w-full h-full mt-10 mx-auto">
            <div className="flex flex-wrap  items-center justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"Programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"Burgers are a classic culinary creation that brings together juicy meat nestled between two soft."} title={"Burgers"} />
                <TemplateCard image={"https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"How to choose the best programming based on you preferences."} title={"Computers"} />
            </div>
            
            <div  className="flex flex-wrap items-start justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"How to choose between IDE for programming. Find out which one suits you better."} title={"IDE"} />
                <TemplateCard image={"https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"Strawberries are juicy and vibrant red fruits that are packed with a sweet and slightly tart flavor."} title={"Strawberry"} />
                <TemplateCard image={"https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"Visual studio shortcuts that makes developing easy and smooth. Master these shortcuts."} title={"VS"} />
            </div>
            
            <div  className="flex flex-wrap items-start justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/2985167/pexels-photo-2985167.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"Protein is an essential macronutrient that plays a crucial role in building and repairing tissues."} title={"Protein"} />
                <TemplateCard image={"https://images.pexels.com/photos/6941871/pexels-photo-6941871.png?auto=compress&cs=tinysrgb&w=600"} content={"In this blog you will learn how to google like a pro. Fundamentals of google search."} title={"Google"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"These books can take your programming skill to a new level. These books are a must read books."} title={"Books"} />
            </div>
        </div>
    )
}
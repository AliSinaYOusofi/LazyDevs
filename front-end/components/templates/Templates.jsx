"use client"
import React from 'react'
import TemplateCard from './TemplateCard'

export default function Templates() {


    // this should show some cards of some templates used for
    // creating a blog template
    return (
        <div className="w-full h-full mt-10 mx-auto">
            <div className="flex flex-wrap  items-center justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"Strawberry"} />
                <TemplateCard image={"https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"Burgers"} />
                <TemplateCard image={"https://images.pexels.com/photos/2985167/pexels-photo-2985167.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"Protein"} />
            </div>
            
            <div  className="flex flex-wrap items-start justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"Programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
            </div>
            
            <div  className="flex flex-wrap items-start justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
            </div>
        </div>
    )
}
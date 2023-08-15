"use client"
import React from 'react'
import TemplateCard from './TemplateCard'

export default function Templates() {


    // this should show some cards of some templates used for
    // creating a blog template
    return (
        <div className="w-full h-full mt-10">
            <h1 className="text-[3rem] font font-bold text-center"> Food Templates </h1>
            <div className="flex flex-wrap w-[90%] items-start justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
            </div>
            <h1 className="text-[3rem] font font-bold text-center mt-3"> Programming Templates </h1>
            <div  className="flex flex-wrap w-[90%] items-start justify-center gap-x-2 gap-y-4 mt-4">
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
                <TemplateCard image={"https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"You can get good at programming by practicing alot and by asking the elites."} title={"How to get good at programming"} />
            </div>
        </div>
    )
}
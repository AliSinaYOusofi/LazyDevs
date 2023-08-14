"use client"
import React from 'react'
import TemplateCard from './TemplateCard'

export default function Templates() {


    // this should show some cards of some templates used for
    // creating a blog template
    return (
        <div className="w-full h-full bg-black/20 mt-10">
            <h1> Food Templates </h1>
            <div>
                <TemplateCard image={"https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"} content={"The food we eat defines who we are"} title={"The food we want"} />
            </div>
        </div>
    )
}
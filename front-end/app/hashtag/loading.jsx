import LoadingBlogCard from "@/components/BlogCard/LoadingBlogCard";
import React from "react";

export default function loading({width}) {
    return (
        <>
            <LoadingBlogCard />
            <LoadingBlogCard />
            <LoadingBlogCard />
        </>
    )
}
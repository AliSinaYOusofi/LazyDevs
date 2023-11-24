import React, { useRef } from 'react'
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'


export default function Strawberry() {

    const htmlRef = useRef()
    const {setTemplateContent} = useAppContext()
    const router = useRouter()

    const handleClick = () => {
        const markDownContent = (html2md(htmlRef.current.innerHTML))
        setTemplateContent(markDownContent)
        router.push("/create_post")
    }

    return (

        <>
            <div ref={htmlRef} className="max-w-2xl mx-auto px-4 py-8">
                <img src={"https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Strawberry" className="rounded-lg mb-4" />

                <h1 className="text-3xl font-semibold mb-2">Light and Refreshing Strawberry Delight</h1>

                <p className="text-gray-700 mb-4">
                    Strawberries are not only delicious but also incredibly healthy. They are low in
                    calories and high in vitamins, fiber, and antioxidants. This wonderful fruit can
                    be enjoyed in various ways. Today, let's explore a light and refreshing recipe - 
                    Strawberry Salad with Balsamic Dressing.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Strawberry Salad with Balsamic Dressing</h2>

                <p className="text-gray-700 mb-4">
                    This salad combines the sweetness of strawberries with the tanginess of balsamic
                    dressing, creating a delightful blend of flavors. Here's how you can make it:
                </p>

                <h3 className="text-xl font-semibold mb-1">Ingredients:</h3>

                <ul className="list-disc list-inside mb-4 ml-3">
                    <li>2 cups fresh strawberries, sliced</li>
                    <li>4 cups mixed salad greens</li>
                    <li>1/4 cup crumbled feta cheese</li>
                    <li>1/4 cup sliced almonds, toasted</li>
                    <li>2 tablespoons balsamic vinegar</li>
                    <li>1 tablespoon extra virgin olive oil</li>
                    <li>1 teaspoon honey</li>
                    <li>Salt and black pepper to taste</li>
                </ul>

                <h3 className="text-xl font-semibold mb-1">Instructions:</h3>

                <ol className="list-decimal list-inside mb-4">
                    <li>In a large salad bowl, combine the salad greens, sliced strawberries, and 
                    crumbled feta cheese.</li>
                    <li>In a small mixing bowl, whisk together balsamic vinegar, olive oil, honey, 
                    salt, and black pepper to create the dressing.</li>
                    <li>Pour the dressing over the salad and toss gently to coat.</li>
                    <li>Sprinkle toasted almonds on top for added crunch.</li>
                    <li>Serve immediately and enjoy this refreshing strawberry salad!</li>
                </ol>

                <p className="text-gray-700">
                    With its vibrant colors and burst of flavors, this strawberry salad makes a
                    perfect light meal or a side dish for any occasion. Feel free to customize it
                    by adding your favorite ingredients like grilled chicken or avocado slices.
                    Enjoy the refreshing goodness of strawberries!
                </p>
            </div>
            <button 
                type="button" 
                onClick={handleClick} 
                className=" duration-300 hover:text-white cursor-pointer mx-auto rounded-sm bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10  px-4 mt-[10px] text-lg font-ligh ">
                Apply template
            </button>
        </>
    )
}

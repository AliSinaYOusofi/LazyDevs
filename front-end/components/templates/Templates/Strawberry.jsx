import RenderVideos from '@/components/RenderVideo/RenderVideos'
import Link from 'next/link'
import React from 'react'

export default function Strawberry() {

    let content = [
        '![book image !]](https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600) $',
        "# Light and Refreshing Strawberry Delight $",
        'Strawberries are not only delicious but also incredibly healthy. They are low in calories and high in vitamins, fiber, and antioxidants. This wonderful fruit can be enjoyed in various ways. Today, let\'s explore a light and refreshing recipe - Strawberry Salad with Balsamic Dressing.',
        '## Strawberry Salad with Balsamic Dressing',
        'This salad combines the sweetness of strawberries with the tanginess of balsamic dressing, creating a delightful blend of flavors. Here\'s how you can make it: $',
        '![[straw image!]](https://images.pexels.com/photos/701798/pexels-photo-701798.jpeg?auto=compress&cs=tinysrgb&w=600) $',
        '## Ingredients: $',
        '*  cups fresh strawberries, sliced $',
        '*  4 cups mixed salad greens $',
        '* 1/4 cup crumbled feta cheese $',
        '* 1/4 cup sliced almonds, toasted $',
        '* 2 tablespoons balsamic vinegar $',
        '* 1 tablespoon extra virgin olive oil $',
        '* 1 teaspoon honey $',
        '* Salt and black pepper to taste $',
        '## Instructions: $',
        '1. In a large salad bowl, combine the salad greens, sliced strawberries, and crumbled feta cheese.$',
        '2. In a small mixing bowl, whisk together balsamic vinegar, olive oil, honey, salt, and black pepper to create the dressing. $',
        '3. Pour the dressing over the salad and toss gently to coat. $',
        '4. Sprinkle toasted almonds on top for added crunch. $',
        '5. Serve immediately and enjoy this refreshing strawberry salad! $',
        'With its vibrant colors and burst of flavors, this strawberry salad makes a perfect light meal or a side dish for any occasion. Feel free to customize it by adding your favorite ingredients like grilled chicken or avocado slices. Enjoy the refreshing goodness of strawberries!'
    ]

    content = encodeURIComponent(JSON.stringify(content))

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
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

            <div className="flex flex-wrap gap-x-1">
                <img src={"https://images.pexels.com/photos/701798/pexels-photo-701798.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Strawberry" className="rounded-lg w-[45%] h-1/2 mb-4" />
                {/* <img src={"https://images.pexels.com/photos/701798/pexels-photo-701798.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Strawberry" className="rounded-lg w-[45%] h-1/2 mb-4" />
                <img src={"https://images.pexels.com/photos/701798/pexels-photo-701798.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Strawberry" className="rounded-lg w-[45%] h-1/2 mb-4" />
                <img src={"https://images.pexels.com/photos/701798/pexels-photo-701798.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Strawberry" className="rounded-lg w-[45%] h-1/2 mb-4" /> */}
            </div>

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

            {/* <h1 className="text-2xl font-semibold mb-2"> A video might help you: </h1> */}
            {/* <RenderVideos videoUrl={"https://player.vimeo.com/external/343935136.sd.mp4?s=f8bcb74cb4c994e098f14e8d29d7848031c0901c&profile_id=164&oauth2_token_id=57447761"} /> */}

            <p className="text-gray-700">
                With its vibrant colors and burst of flavors, this strawberry salad makes a
                perfect light meal or a side dish for any occasion. Feel free to customize it
                by adding your favorite ingredients like grilled chicken or avocado slices.
                Enjoy the refreshing goodness of strawberries!
            </p>
            <Link href={{ pathname:"/create_post", query: {'content' : content} }} className="hover:bg-blue-600 hover:text-white mt-10  flex bg-white/50 p-2 rounded-sm w-fit">
                Apply template
            </Link>
        </div>
    )
}

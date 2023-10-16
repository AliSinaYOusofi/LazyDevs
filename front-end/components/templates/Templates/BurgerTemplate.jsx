import RenderVideos from '@/components/RenderVideo/RenderVideos';
import Link from 'next/link';
import React from 'react';


const Burger = () => {
    
    let content = [
        '# Delicious and Juicy Burger $',
        'Burgers are an all-time favorite for many people, offering a satisfying and flavorful meal. The combination of juicy beef, fresh vegetables, and a soft bun creates a delightful taste and texture experience. Let\'s dive into making a delicious burger with a homemade patty and mouthwatering toppings. $',
        '## Homemade Beef Patty Burger $',
        'This burger recipe features a homemade beef patty grilled to perfection and complemented with classic toppings. Follow these steps to create your burger masterpiece: $',
        '![Burger !]](https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600) $',
        '### Ingredients: $',
        '- 1 pound ground beef $',
        '- 1/2 teaspoon salt $',
        '- 1/4 teaspoon black pepper $',
        '- 4 burger buns $',
        '- Lettuce leaves $',
        '- Sliced tomatoes $',
        '- Sliced onions $',
        '- Cheese slices (optional) $',
        '- Ketchup, mustard, and mayo for the sauce $',
        '### Instructions: $',
        '1. In a bowl, combine the ground beef, salt, and black pepper. Mix well. $',
        '2. Divide the mixture into four equal portions and shape them into burger patties. $',
        '3. Preheat a grill or a skillet over medium-high heat. $',
        '4. Cook the burger patties for about 4-5 minutes on each side or until cooked to your desired level of doneness. $',
        '5. Toast the burger buns on the grill or in a toaster. $',
        '6. Assemble the burger by placing a lettuce leaf, a burger patty, tomato slices, onion slices, cheese (if desired), and sauce on each bun. $',
        '7. Serve immediately with your favorite side dishes or enjoy it on its own $',
        'Customize your burger by adding your favorite toppings and condiments. You can also experiment with different types of cheese or add bacon for extra flavor. Whether enjoyed at a BBQ party or a casual dinner, this delicious burger will surely satisfy your cravings.'
    ]

    content = encodeURIComponent(JSON.stringify(content))

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">

            <h1 className="text-3xl font-semibold mb-2 mt-2">Delicious and Juicy Burger</h1>

            <p className="text-gray-700 mb-4 mt-3">
                Burgers are an all-time favorite for many people, offering a satisfying and flavorful meal. 
                The combination of juicy beef, fresh vegetables, and a soft bun creates a delightful taste and texture 
                experience. Let's dive into making a delicious burger with a homemade patty and mouthwatering toppings.
            </p>

            <h2 className="text-2xl font-semibold mb-2">Homemade Beef Patty Burger</h2>

            <p className="text-gray-700 mb-4">
                This burger recipe features a homemade beef patty grilled to perfection and complemented with 
                classic toppings. Follow these steps to create your burger masterpiece:
            </p>

            <div className="flex flex-wrap gap-x-1">
                <img src={"https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="Burger" className="rounded-lg w-[45%] h-1/2 mb-4" />
            </div>

            <h3 className="text-xl font-semibold mb-1">Ingredients:</h3>

            <ul className="list-disc list-inside mb-4 ml-3">
                <li>1 pound ground beef</li>
                <li>1/2 teaspoon salt</li>
                <li>1/4 teaspoon black pepper</li>
                <li>4 burger buns</li>
                <li>Lettuce leaves</li>
                <li>Sliced tomatoes</li>
                <li>Sliced onions</li>
                <li>Cheese slices (optional)</li>
                <li>Ketchup, mustard, and mayo for the sauce</li>
            </ul>

            <h3 className="text-xl font-semibold mb-1">Instructions:</h3>

            <ol className="list-decimal list-inside mb-4">
                <li>In a bowl, combine the ground beef, salt, and black pepper. Mix well.</li>
                <li>Divide the mixture into four equal portions and shape them into burger patties.</li>
                <li>Preheat a grill or a skillet over medium-high heat.</li>
                <li>Cook the burger patties for about 4-5 minutes on each side or until cooked to your desired level of doneness.</li>
                <li>Toast the burger buns on the grill or in a toaster.</li>
                <li>Assemble the burger by placing a lettuce leaf, a burger patty, tomato slices, onion slices, cheese (if desired), and sauce on each bun.</li>
                <li>Serve immediately with your favorite side dishes or enjoy it on its own!</li>
            </ol>

            <p className="text-gray-700">
                Customize your burger by adding your favorite toppings and condiments. You can also experiment with different types of cheese or add bacon for extra flavor. Whether enjoyed at a BBQ party or a casual dinner, this delicious burger will surely satisfy your cravings.
            </p>
            <Link href={{ pathname:"/create_post", query: {'content' : content} }} className="hover:bg-blue-600 hover:text-white mt-10  flex bg-white/50 p-2 rounded-sm w-fit">
                Apply template
            </Link>
        </div>
  );
};

export default Burger;
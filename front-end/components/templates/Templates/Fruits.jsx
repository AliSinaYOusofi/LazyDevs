import React, { useRef } from 'react';
import Link from 'next/link';
import html2md from 'html-to-md';
import { useAppContext } from '@/context/useContextProvider';
import { useRouter } from 'next/navigation'

const Protein = () => {

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
            <div ref={htmlRef} className="max-w-2xl mx-auto px-4 py-8 blog">
                
                <h1 className="text-3xl font-semibold mb-4">The Best Protein Powder to Build Muscle in 2023</h1>
                <p>
                    Protein powders have become a staple in the nutritional regimens of competitive athletes and recreational gym-goers alike. 
                </p>

                <p className="mt-4">
                    These products serve as a convenient and high quality source of protein. Yet, with seemingly endless options to choose from, you may wonder which is best for building muscle.
                </p>

                <h1 className="mt-4"> A quick look at the best protein powders for building muscle </h1>
                
                <ol className="mt-4 list-decimal ml-10">
                    <li> Best whey: Momentous Essential Grass-Fed Whey Protein </li>
                    <li> Best unflavored whey: Naked Whey</li>
                    <li> Best casein: Ascent Native Fuel Micellar Casein </li>
                    <li> Best vegetarian: TrueNutrition RBGH/Soy-Free Whey Protein Isolate </li>
                    <li> Best vegan: Momentous Essential Plant-Based Protein </li>
                    <li> Best grass-fed: Garden of Life Sport Grass-Fed Whey </li>
                    <li> Best taste: Ghost Whey Protein </li>
                </ol>

                <h1 className="mt-4 text-2xl font-bold"> How we chose </h1>
                <p className="mt-4">
                    When looking for the best protein powders for building muscle, we considered the following criteria:
                </p>

                <ul className="mt-4 list-disc ml-10">
                    <li> <span> Formulation: </span> To support muscle gains, we chose products that contain at least 20 g of protein per serving and have evidence-backed ingredients such as whey protein and branched-chain amino acids (BCAAs) (1Trusted Source). </li>
                    <li> <span> Quality:  </span> We looked for powders that are made with high quality ingredients and contain minimal additives and fillers. </li>
                    <li> <span>Taste: </span> From dessert-inspired flavors to unflavored varieties, we included powders to suit a range of preferences. We also looked for products that have mostly positive reviews for taste and texture</li>
                </ul>

                <h1 className="mt-10 list-disc text-2xl font-bold "> Momentous Essential Grass-Fed Whey Protein </h1>

                <img src={"https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/06/Momentous-Essential-Grass-Fed-Whey-Protein-Isolate_With_BG.png?w=525"} alt="Protein Shake" className="rounded-lg mb-4" />
                
                <p className="mt-4">
                    Specifically, the powder contains whey isolate sourced from milk produced by grass-fed cows.
                </p>
                <p className="mt-4">
                    Whey isolate contains more than 90% protein by weight and is relatively low in lactose, whereas whey concentrate contains 25–89% protein and more lactose (2).
                </p>

                <p className="mt-4">
                    The powder also includes an enzyme blend that the company claims helps improve the absorption of protein and reduce stomach upset, though research doesn’t currently support these claims (3Trusted Source).
                </p>

                <p className="mt-4">
                    Momentous Protein is third-party tested and is both NSF Certified for Sport and Informed Sport Certified, which means it’s a good option for competitive athletes. It’s also certified gluten-free.
                </p>

                <p className="mt-4">
                    Nutrition facts per 1 scoop, or 28.7 grams (g), of Chocolate Momentous Essential Grass-Fed Whey Protein
                </p>
                
                <ul className="mt-4 list-disc ml-10">
                    <li> Calories: 1000</li>
                    <li> Carbs: 3</li>
                    <li> Added sugars: 0 g</li>
                    <li> Protein: 20 g</li>
                </ul>

                <p className="text-gray-700 mb-4">
                    Protein shakes are a convenient and effective way to supplement your workouts and build muscle. 
                    They provide a quick and easily digestible source of quality protein that supports muscle recovery and growth. 
                    
                </p>
            </div>
            <button 
                type="button" 
                onClick={handleClick} 
                className=" duration-300 hover:text-white cursor-pointer mx-auto rounded-sm bg-gray-800 text-white transition-all hover:bg-gray-900 py-1 h-8 md:h-10  px-4 mt-[10px] text-lg font-ligh ">
                Apply template
            </button>
        </>
    );
};

export default Protein;
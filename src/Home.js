import React from 'react';
import  './Home.css';
import  Product from './Product';

function Home() {
  return (
    <div className="home">
        <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/PD22/LU/PChero/3000/IN-PD-22-teaser-GW_3000x1200_rtb_eng._CB632706317_.jpg" alt="" />
        <div className="Products">
            <Product
                    id =  "1"
                    title = "hello this is the first product and its name is sabji katne ki machine"
                    image = "https://m.media-amazon.com/images/I/515Mlm5DPrL._AC_UL480_FMwebp_QL65_.jpg"
                    rating = {4}
                    price = {3.55}

            />
            <Product
                    id =  "2"
                    title = "SOLARA Unbreakable Water Bottle with Motivational Time Marker, Sipper Bottle with Straw for Gym Office, Mobile app with Drinking Water Reminder, Detoxing ebook Included, Pearly Pink, Silicone, 1 Piece"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/286/2865444986789304102/previews/G03-200x200.jpg"
                    rating = {5}
                    price = {99.00}

            />
            <Product
                    id =  "154368923456"
                    title = "OM Export Small Electric Handy Room Heater Compact Plug-in | Wall Outlet Space Heater 400 W Garage Bathroom Home | Handy Air Warmer Blower for Office/Camper"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/244/2446557522799105197/previews/G03-400x400.jpg"
                    rating = {1}
                    price = {19.63}

            />
            <Product
                    id =  "125478083456"
                    title = "Hookahs 22 Inch Glass and Metal Smoking Hookah Waterpipe with Ceramic Chillum Glass Hookah (Black) Glass Hookah Pot Size (Standard) Set of 1 Made Up of Premium Glass"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/281/2819803550484272180/previews/G03-400x400.jpg"
                    rating = {4}
                    price = {25.78}

            />
            <Product
                    id =  "1223048693456"
                    title = "Sandhya Home Collections Krishna Playing Flute Decorative Metal Wall Hangings for Wall Decor – Round Iron Metal Wall Hanging for Home Decoration and Café Decoration"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/272/2722126025503807332/previews/G03-400x400.jpg"
                    rating = {3}
                    price = {69.99}

            />
            <Product
                    id =  "129806832323456"
                    title = "ASIAN Delta-20 Sports Running,Walking & Gym Shoes with Eva Sole Extra Jump Casual Sneaker Lightweight Shoes for Men's & Boy's"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/253/2534956492650452495/previews/G03-200x200.jpg"
                    rating = {2}
                    price = {37.55}

            />
            <Product
                    id =  "12312776796552"
                    title = "Shifa Wood Art Rocking Chair Recliner Solid Wood Elderly Pregnant Woman Balcony Single Sofa Chair Lazy Sofa Single Chaise Lounge Chair Leisure Lunch Break Chair (Green)"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/271/2714059023019153102/previews/G03-400x400.jpg"
                    rating = {3}
                    price = {200.00}

            />
            <Product
                    id =  "12312776796552"
                    title = "Shifa Wood Art Rocking Chair Recliner Solid Wood Elderly Pregnant Woman Balcony Single Sofa Chair Lazy Sofa Single Chaise Lounge Chair Leisure Lunch Break Chair (Green)"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/271/2714059023019153102/previews/G03-400x400.jpg"
                    rating = {3}
                    price = {200.00}

            />
            <Product
                    id =  "12312776796552"
                    title = "Shifa Wood Art Rocking Chair Recliner Solid Wood Elderly Pregnant Woman Balcony Single Sofa Chair Lazy Sofa Single Chaise Lounge Chair Leisure Lunch Break Chair (Green)"
                    image = "https://atlas-content-cdn.pixelsquid.com/assets_v2/271/2714059023019153102/previews/G03-400x400.jpg"
                    rating = {3}
                    price = {200.00}

            />
        </div>
    </div>
  )
}

export default Home;
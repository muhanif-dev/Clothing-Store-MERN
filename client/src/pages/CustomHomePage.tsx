import { Hero } from "../components/Hero";
import {LatestCollections} from "../components/LatestCollections.tsx";
import { Bestsellers } from "../components/Bestsellers.tsx";
import { OurPolicy } from "../components/OurPolicy.tsx";
import { Footer } from "../components/Footer";
import { Cart } from "./customer/Cart.tsx"


const CustomHomePage = () => {
    return (
        <>
        <Hero />
        <LatestCollections />
        <Bestsellers />
        <OurPolicy />
        <Cart />
        <Footer />
        </>
    )
}

export default CustomHomePage;
import { Hero } from "../components/Hero";
import {LatestCollections} from "../components/LatestCollections.tsx";
import { Bestsellers } from "../components/Bestsellers.tsx";
import { OurPolicy } from "../components/OurPolicy.tsx";
import { Footer } from "../components/Footer";


const CustomHomePage = () => {
    return (
        <>
        <Hero />
        <LatestCollections />
        <Bestsellers />
        <OurPolicy />
        <Footer />
        </>
    )
}

export default CustomHomePage;
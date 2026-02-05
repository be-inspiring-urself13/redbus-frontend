
import HeroSearch from "../components/HeroSearch";
import Offers from "../components/Offers";
import PosterStrip from "../components/PosterStrip";
import GovBus from "../components/GovBus";
import WhatsNew from "../components/WhatsNew";
import Testimonials from "../components/Testimonials";
import AppBanner from "../components/AppBanner";


export default function Home() {
  return (
    <div className="flex flex-col md:gap-y-14 gap-y-5">
      <HeroSearch />
      <div className="hidden md:block lg:hidden md:h-12"></div>
       <Offers />
      <PosterStrip />
      <GovBus /> 
      <WhatsNew />
      <Testimonials />
      <AppBanner />
    </div>
  );
}



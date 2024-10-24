import FeaturedProperties from "./components/featured-properties";
import Hero from "./components/hero";
import HomeProperties from "./components/home-properties";
import InfoBoxes from "./components/info-boxes";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}

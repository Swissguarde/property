import connectDB from "@/config/database";
import Hero from "./components/hero";
import HomeProperties from "./components/home-properties";
import InfoBoxes from "./components/info-boxes";

export default async function Home() {
  await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
}

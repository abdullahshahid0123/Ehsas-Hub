import React from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import { AboutSection } from "./AboutSection";
import { ServiceSection } from "./ServiceSection";
import { HowItsWork } from "./HowItsWork";
import { CallToAction } from "./CallToAction";
import { Footer } from "./Footer";





const Main = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <ServiceSection />
      <HowItsWork />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Main;

import { About } from "@/components/boilerplate/landing/about";
import { Cta } from "@/components/boilerplate/landing/cta";
import { FAQ } from "@/components/boilerplate/landing/faq";
import { Features } from "@/components/boilerplate/landing/features";
import { Footer } from "@/components/boilerplate/landing/footer";
import { Hero } from "@/components/boilerplate/landing/hero";
import { HowItWorks } from "@/components/boilerplate/landing/how-it-works";
import { Newsletter } from "@/components/boilerplate/landing/newsletter";
import { Pricing } from "@/components/boilerplate/landing/pricing";
import { ScrollToTop } from "@/components/boilerplate/landing/scroll-to-top";
import { Services } from "@/components/boilerplate/landing/services";
import { Sponsors } from "@/components/boilerplate/landing/sponsors";
import { Team } from "@/components/boilerplate/landing/team";
import { Testimonials } from "@/components/boilerplate/landing/testimonial";
import LandingLayout from "./landingLayout";

export default function Home() {
  return (
    <LandingLayout>
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Newsletter />
      <Testimonials />
      <Team />
      <Pricing />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </LandingLayout>
  );
}

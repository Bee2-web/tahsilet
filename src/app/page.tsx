import { Header } from "@/components/layout/Header";
import { AiLabel } from "@/components/layout/AiLabel";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Metrics } from "@/components/sections/Metrics";
import { ProductCapabilities } from "@/components/sections/ProductCapabilities";
import { Differentiation } from "@/components/sections/Differentiation";
import { EatSection } from "@/components/sections/EatSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Integrations } from "@/components/sections/Integrations";
import { FinalCTA } from "@/components/sections/FinalCTA";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <AiLabel />
      <main className={styles.main}>
        <Hero />
        <TrustedBy />
        <Metrics />
        <ProductCapabilities />
        <Differentiation />
        <EatSection />
        <Testimonials />
        <Integrations />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

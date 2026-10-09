import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { Header } from "@/components/layout/Header";
import { AiLabel } from "@/components/layout/AiLabel";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { References } from "@/components/sections/References";
import { Metrics } from "@/components/sections/Metrics";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductCapabilities } from "@/components/sections/ProductCapabilities";
import { WhyTahsilet } from "@/components/sections/WhyTahsilet";
import { EatSection } from "@/components/sections/EatSection";
import { TrustControl } from "@/components/sections/TrustControl";
import { Audience } from "@/components/sections/Audience";
import { Integrations } from "@/components/sections/Integrations";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import styles from "./page.module.css";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <>
      <Header content={content} />
      <AiLabel content={content} />
      <main className={styles.main}>
        <Hero content={content} />
        <References content={content} />
        <Metrics content={content} />
        <HowItWorks content={content} />
        <ProductCapabilities content={content} />
        <WhyTahsilet content={content} />
        <EatSection content={content} />
        <TrustControl content={content} />
        <Audience content={content} />
        <Integrations content={content} />
        <Faq content={content} />
        <FinalCTA content={content} />
        <Footer content={content} />
      </main>
    </>
  );
}

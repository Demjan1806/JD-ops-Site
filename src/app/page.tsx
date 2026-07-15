import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Validators from "@/components/Validators";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Validators />
        <Services />
        <About />
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ElDesarrollo from "@/components/ElDesarrollo";
import Estructura from "@/components/Estructura";
import Fachada from "@/components/Fachada";
import Ubicacion from "@/components/Ubicacion";
import Espacios from "@/components/Espacios";
import Amenidades from "@/components/Amenidades";
import Galeria from "@/components/Galeria";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ElDesarrollo />
        <Ubicacion />
        <Espacios />
        <Amenidades />
        <Estructura />
        <Fachada />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

import Hero from "@/components/Hero";
import ElDesarrollo from "@/components/ElDesarrollo";
import Estructura from "@/components/Estructura";
import Fachada from "@/components/Fachada";
import Ubicacion from "@/components/Ubicacion";
import Espacios from "@/components/Espacios";
import Amenidades from "@/components/Amenidades";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
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
  );
}

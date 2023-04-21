import Graphic from "@/components/Graphic/Graphic";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import EvolutionNav from "@/components/Premium/EvolutionNav/EvolutionNav";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);

  return (
    <PremiumLayout>
      <EvolutionNav />
      <section className="flex flex-col items-center gap-2 px-4 py-4">
        <h1 className="mb-10 text-3xl font-bold">Progress</h1>
        <span>Aca cada mes, opcionalmente puedo agregar mi nuevo peso</span>
        <span>
          Y al momento de agregar por 1era vez, automaticamente se guarda aca su
          primera vez
        </span>
        <Graphic />
      </section>
    </PremiumLayout>
  );
}

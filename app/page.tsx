import ConfigForm from "@/components/ConfigForm";
import CalcForm from "@/components/CalcForm";

export default function Home() {
  return (
    <main className="mx-auto max-w-md space-y-8 p-4">
      <h1 className="text-xl font-semibold">
        Precificação com Drone Agrícola
      </h1>

      <ConfigForm />
      <CalcForm />
    </main>
  );
}

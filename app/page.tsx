"use client";

import { useEffect, useState } from "react";
import ConfigForm from "@/components/ConfigForm";
import CalcForm from "@/components/CalcForm";
import { Config } from "@/lib/pricing";

const STORAGE_KEY = "pricing-config";

const defaultConfig: Config = {
  areaDificil: false,
  modAreaDificil: 10,
  volumePadrao: 12,
  adicionalLitro: 10,
  tamAreaP: 50,
  tamAreaM: 100,
  precoAreaP: 130,
  precoAreaM: 120,
  precoAreaG: 110,
};

export default function Home() {
  const [config, setConfig] = useState<Config>(defaultConfig);

  // carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(saved) });
      } catch { }
    }
  }, []);

  // persistir
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  return (
    <main className="mx-auto max-w-md space-y-8 p-4">
      <h1 className="text-xl font-semibold">
        Precificação com Drone Agrícola
      </h1>

      <ConfigForm config={config} onChange={setConfig} />
      <CalcForm config={config} />
    </main>
  );
}

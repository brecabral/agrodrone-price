"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import { calcularPreco, Config } from "@/lib/pricing";

const STORAGE_KEY = "pricing-config";

export default function CalcForm() {
    const [config, setConfig] = useState<Config | null>(null);

    const [dados, setDados] = useState({
        area: 10,
        altura: 5,
        obstaculos: 0,
        volume: 12,
    });

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setConfig(JSON.parse(saved));
    }, []);

    function set<K extends keyof typeof dados>(key: K, value: number) {
        setDados((d) => ({ ...d, [key]: value }));
    }

    if (!config) return null;

    const preco = calcularPreco(config, dados);

    return (
        <section className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 font-semibold">Cálculo</h2>

            <div className="space-y-2">
                <Input label="Área" value={dados.area} onChange={(v) => set("area", v)} suffix="ha" />
                <Input label="Diferença de altura" value={dados.altura} onChange={(v) => set("altura", v)} suffix="m" />
                <Input label="Obstáculos" value={dados.obstaculos} onChange={(v) => set("obstaculos", v)} />
                <Input label="Volume de calda" value={dados.volume} onChange={(v) => set("volume", v)} suffix="L/ha" />
            </div>

            <div className="mt-6 rounded bg-zinc-100 p-3 text-center">
                <div className="text-sm">Preço sugerido</div>
                <div className="text-2xl font-bold">R$ {preco} / ha</div>
            </div>
        </section>
    );
}

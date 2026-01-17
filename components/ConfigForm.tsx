"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import { Config } from "@/lib/pricing";

const STORAGE_KEY = "pricing-config";

const defaultConfig: Config = {
    maxAltura: 20,
    obstaculosAceitos: 2,
    modAreaDificil: 20,
    volumePadrao: 12,
    adicionalLitro: 10,
    areaPequena: 50,
    areaMedia: 100,
    precoPeq: 150,
    precoMed: 120,
    precoGra: 100,
};

export default function ConfigForm() {
    const [config, setConfig] = useState<Config>(defaultConfig);

    // carregar do localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setConfig(JSON.parse(saved));
        }
    }, []);

    // salvar automaticamente
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }, [config]);

    function set<K extends keyof Config>(key: K, value: number) {
        setConfig((c) => ({ ...c, [key]: value }));
    }

    return (
        <section className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 font-semibold">Configurações</h2>

            <div className="space-y-2">
                <Input label="Altura máxima" value={config.maxAltura} onChange={(v) => set("maxAltura", v)} suffix="m" />
                <Input label="Obstáculos aceitáveis" value={config.obstaculosAceitos} onChange={(v) => set("obstaculosAceitos", v)} />
                <Input label="Área difícil (adicional)" value={config.modAreaDificil} onChange={(v) => set("modAreaDificil", v)} suffix="%" />
                <Input label="Volume padrão" value={config.volumePadrao} onChange={(v) => set("volumePadrao", v)} suffix="L/ha" />
                <Input label="Adicional por litro" value={config.adicionalLitro} onChange={(v) => set("adicionalLitro", v)} />
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
                <Input label="Até área pequena" value={config.areaPequena} onChange={(v) => set("areaPequena", v)} suffix="ha" />
                <Input label="Até área média" value={config.areaMedia} onChange={(v) => set("areaMedia", v)} suffix="ha" />
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
                <Input label="Preço pequena" value={config.precoPeq} onChange={(v) => set("precoPeq", v)} suffix="R$" />
                <Input label="Preço média" value={config.precoMed} onChange={(v) => set("precoMed", v)} suffix="R$" />
                <Input label="Preço grande" value={config.precoGra} onChange={(v) => set("precoGra", v)} suffix="R$" />
            </div>
        </section>
    );
}

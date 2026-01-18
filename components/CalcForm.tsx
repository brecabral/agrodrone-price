"use client";

import { useState } from "react";
import Input from "./Input";
import { calcularPreco, Config } from "@/lib/pricing";

type Props = {
    config: Config;
};

export default function CalcForm({ config }: Props) {
    const [dados, setDados] = useState({
        tamArea: 10,
        volumeEfetivo: 12,
    });

    function set<K extends keyof typeof dados>(
        key: K,
        value: number
    ) {
        setDados((d) => ({ ...d, [key]: value }));
    }

    const resultado = calcularPreco(config, dados);

    return (
        <section className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 font-semibold">Cálculo</h2>

            {/* Inputs */}
            <div className="space-y-3">
                <Input
                    label="Área total"
                    value={dados.tamArea}
                    onChange={(v) => set("tamArea", v)}
                    suffix="ha"
                />

                <Input
                    label="Volume de calda"
                    value={dados.volumeEfetivo}
                    onChange={(v) => set("volumeEfetivo", v)}
                    suffix="L/ha"
                />
            </div>

            {/* Resultado detalhado */}
            <div className="mt-6 rounded bg-zinc-100 p-4 text-sm space-y-2">
                <div className="font-semibold text-center text-base">
                    Detalhamento do preço
                </div>

                <div>
                    Área considerada: <strong>{resultado.tamanhoArea}</strong>
                </div>

                <div>
                    Valor base por hectare: R$ {resultado.basePorHa}
                </div>

                {config.areaDificil && (
                    <div>
                        Adicional por dificuldade (
                        {config.modAreaDificil}%):{" "}
                        <strong>
                            + R$ {resultado.adicionalDificuldade} / ha
                        </strong>
                    </div>
                )}

                {resultado.adicionalVolume > 0 && (
                    <div>
                        Adicional por volume:{" "}
                        <strong>
                            + R$ {resultado.adicionalVolume} / ha
                        </strong>
                    </div>
                )}

                <hr />

                <div className="text-base font-semibold">
                    Preço final por hectare: R$ {resultado.precoFinalPorHa}
                </div>

                <div className="text-lg font-bold text-center">
                    Valor total do serviço: R$ {resultado.total}
                </div>
            </div>
        </section>
    );
}

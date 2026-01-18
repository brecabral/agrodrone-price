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
        areaDificil: false,
    });

    function set<K extends keyof typeof dados>(
        key: K,
        value: typeof dados[K]
    ) {
        setDados((d) => ({ ...d, [key]: value }));
    }

    const resultado = calcularPreco(config, dados);

    return (
        <section className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 font-semibold">Cálculo</h2>

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

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={dados.areaDificil}
                        onChange={(e) =>
                            set("areaDificil", e.target.checked)
                        }
                    />
                    Área difícil
                </label>
            </div>

            <div className="mt-6 rounded bg-zinc-100 p-4 text-sm space-y-2">
                <div className="font-semibold text-center">
                    Detalhamento do preço
                </div>

                <div>
                    Tamanho da área:{" "}
                    <strong>{resultado.tamanhoArea}</strong>
                </div>

                <div>
                    Valor base: R$ {resultado.basePorHa} / ha
                </div>

                {dados.areaDificil && (
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

                <div className="font-semibold">
                    Preço final: R$ {resultado.precoFinalPorHa} / ha
                </div>

                <div className="text-lg font-bold text-center">
                    Total: R$ {resultado.total}
                </div>
            </div>
        </section>
    );
}

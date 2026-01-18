"use client";

import Input from "./Input";
import { Config } from "@/lib/pricing";

type Props = {
    config: Config;
    onChange: (c: Config) => void;
};

export default function ConfigForm({ config, onChange }: Props) {
    function set<K extends keyof Config>(
        key: K,
        value: Config[K]
    ) {
        onChange({ ...config, [key]: value });
    }

    return (
        <section className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 font-semibold">Configurações</h2>

            <div className="space-y-2">
                <Input
                    label="Área pequena até"
                    value={config.tamAreaP}
                    onChange={(v) => set("tamAreaP", v)}
                    suffix="ha"
                />
                <Input
                    label="Área média até"
                    value={config.tamAreaM}
                    onChange={(v) => set("tamAreaM", v)}
                    suffix="ha"
                />
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
                <Input
                    label="Preço área pequena"
                    value={config.precoAreaP}
                    onChange={(v) => set("precoAreaP", v)}
                    suffix="R$ / ha"
                />
                <Input
                    label="Preço área média"
                    value={config.precoAreaM}
                    onChange={(v) => set("precoAreaM", v)}
                    suffix="R$ / ha"
                />
                <Input
                    label="Preço área grande"
                    value={config.precoAreaG}
                    onChange={(v) => set("precoAreaG", v)}
                    suffix="R$ / ha"
                />
            </div>

            <hr className="my-4" />

            <Input
                label="Adicional por dificuldade"
                value={config.modAreaDificil}
                onChange={(v) => set("modAreaDificil", v)}
                suffix="%"
            />

            <hr className="my-4" />

            <div className="space-y-2">
                <Input
                    label="Volume padrão"
                    value={config.volumePadrao}
                    onChange={(v) => set("volumePadrao", v)}
                    suffix="L/ha"
                />
                <Input
                    label="Adicional por litro excedente"
                    value={config.adicionalLitro}
                    onChange={(v) => set("adicionalLitro", v)}
                    suffix="R$"
                />
            </div>
        </section>
    );
}

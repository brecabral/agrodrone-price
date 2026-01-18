"use client";

type Props = {
    label: string;
    value: number;
    onChange: (v: number) => void;
    suffix?: string;
};

export default function Input({ label, value, onChange, suffix }: Props) {
    return (
        <label className="flex items-center justify-between gap-3 text-sm">
            <span>{label}</span>

            <div className="flex items-center gap-1">
                <input
                    type="number"
                    className="w-20 rounded border border-zinc-300 px-2 py-1 text-right"
                    value={value}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        onChange(isNaN(v) ? 0 : v);
                    }}
                />
                {suffix && (
                    <span className="text-xs text-zinc-500">{suffix}</span>
                )}
            </div>
        </label>
    );
}

export type Config = {
  areaDificil: boolean;          // ← AGORA AQUI
  modAreaDificil: number;
  volumePadrao: number;
  adicionalLitro: number;
  tamAreaP: number;
  tamAreaM: number;
  precoAreaP: number;
  precoAreaM: number;
  precoAreaG: number;
};

export type Dados = {
  tamArea: number;
  volumeEfetivo: number;
};

export type DetalheCalculo = {
  tamanhoArea: string;
  basePorHa: number;
  adicionalDificuldade: number;
  adicionalVolume: number;
  precoFinalPorHa: number;
  total: number;
};

export function calcularPreco(
  config: Config,
  dados: Dados
): DetalheCalculo {
  let base = config.precoAreaG;
  let areaEfetiva = "Grande"

  if (dados.tamArea <= config.tamAreaP) {
    base = config.precoAreaP;
    areaEfetiva = "Pequena"
  }
  else if (dados.tamArea <= config.tamAreaM) {
    base = config.precoAreaM;
    areaEfetiva = "Média"
  }

  let adicionalDificuldade = 0;
  if (config.areaDificil) {
    adicionalDificuldade = base * (config.modAreaDificil / 100);
  }

  let adicionalVolume = 0;
  if (dados.volumeEfetivo > config.volumePadrao) {
    adicionalVolume =
      (dados.volumeEfetivo - config.volumePadrao) *
      config.adicionalLitro;
  }

  const precoFinalPorHa = Math.round(
    base + adicionalDificuldade + adicionalVolume
  );

  const total = Math.round(precoFinalPorHa * dados.tamArea);

  return {
    tamanhoArea: areaEfetiva,
    basePorHa: base,
    adicionalDificuldade: Math.round(adicionalDificuldade),
    adicionalVolume,
    precoFinalPorHa,
    total,
  };
}

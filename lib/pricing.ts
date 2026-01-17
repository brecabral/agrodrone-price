export type Config = {
  maxAltura: number;
  obstaculosAceitos: number;
  modAreaDificil: number;
  volumePadrao: number;
  adicionalLitro: number;
  areaPequena: number;
  areaMedia: number;
  precoPeq: number;
  precoMed: number;
  precoGra: number;
};

export type Dados = {
  area: number;
  altura: number;
  obstaculos: number;
  volume: number;
};

export function calcularPreco(config: Config, dados: Dados): number {
  let base = config.precoGra;

  if (dados.area <= config.areaPequena) base = config.precoPeq;
  else if (dados.area <= config.areaMedia) base = config.precoMed;

  if (
    dados.altura > config.maxAltura ||
    dados.obstaculos > config.obstaculosAceitos
  ) {
    base *= 1 + config.modAreaDificil / 100;
  }

  if (dados.volume > config.volumePadrao) {
    base += (dados.volume - config.volumePadrao) * config.adicionalLitro;
  }

  return Math.round(base);
}

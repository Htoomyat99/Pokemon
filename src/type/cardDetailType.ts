export interface TCardDetail {
  artist: string;
  attacks: TDetailAttack[];
  cardmarket: TCardMarket;
  convertedRetreatCost: number;
  evolvesTo: string[];
  flavorText: string;
  hp: string;
  id: string;
  images: TDetailImages;
  legalities: TDetailLegalities;
  name: string;
  nationalPokedexNumbers: number[];
  number: string;
  retreatCost: string[];
  set: TDetailSet;
  subtypes: string[];
  supertype: string;
  tcgplayer: TDetailTcgplayer;
  types: string[];
  weaknesses: TDetailWeakness[];
}

interface TDetailWeakness {
  type: string;
  value: string;
}

interface TDetailTcgplayer {
  prices: Prices2;
  updatedAt: string;
  url: string;
}

interface Prices2 {
  holofoil: TCardDetailPrices;
}

interface TCardDetailPrices {
  directLow: null | number;
  high: number;
  low: number;
  market: number;
  mid: number;
}

interface TDetailSet {
  id: string;
  images: Images2;
  legalities: TDetailLegalities;
  name: string;
  printedTotal: number;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}

interface Images2 {
  logo: string;
  symbol: string;
}

interface TDetailLegalities {
  expanded: string;
  unlimited: string;
}

interface TDetailImages {
  large: string;
  small: string;
}

interface TCardMarket {
  prices: Prices;
  updatedAt: string;
  url: string;
}

interface Prices {
  averageSellPrice: number;
  avg1: number;
  avg30: number;
  avg7: number;
  germanProLow: number;
  lowPrice: number;
  lowPriceExPlus: number;
  reverseHoloAvg1: number;
  reverseHoloAvg30: number;
  reverseHoloAvg7: number;
  reverseHoloLow: number;
  reverseHoloSell: number;
  reverseHoloTrend: number;
  suggestedPrice: number;
  trendPrice: number;
}

interface TDetailAttack {
  convertedEnergyCost: number;
  cost: TCardDetailPrices[];
  damage: string;
  name: string;
  text: string;
}

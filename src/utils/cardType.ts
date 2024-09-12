export interface TUser {
  userName: string;
  password: string;
}

export interface TAuthError {
  status: boolean;
  errMsg?: string;
}

export interface TCard {
  artist: string;
  attacks: TAttack[];
  cardmarket: TCardmarket;
  convertedRetreatCost: number;
  evolvesTo: string[];
  flavorText: string;
  hp: string;
  id: string;
  images: TImages;
  legalities: TLegalities;
  level: string;
  name: string;
  nationalPokedexNumbers: number[];
  number: string;
  rarity: string;
  retreatCost: string[];
  set: TSet;
  subtypes: string[];
  supertype: string;
  tcgplayer: Tcgplayer;
  types: string[];
  weaknesses: TWeakness[];
}

interface TSet {
  id: string;
  images: TImages2;
  legalities: TLegalities;
  name: string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}

interface TImages2 {
  logo: string;
  symbol: string;
}

interface TImages {
  large: string;
  small: string;
}

interface TCardmarket {
  prices: TPrices;
  updatedAt: string;
  url: string;
}

interface TPrices {
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

interface TAttack {
  convertedEnergyCost: number;
  cost: Function[];
  damage: string;
  name: string;
  text: string;
}

interface Tcgplayer {
  url: string;
  updatedAt: string;
}

interface TLegalities {
  unlimited: string;
  expanded?: string;
}

interface TWeakness {
  type: string;
  value: string;
}

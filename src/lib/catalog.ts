import type { Lang } from "./i18n";

export type Purpose = "office" | "study" | "gaming" | "workstation";

export const PURPOSES: Purpose[] = ["office", "study", "gaming", "workstation"];

export const PURPOSE_META: Record<
  Purpose,
  { code: string; from: number; accent?: "primary" | "accent" }
> = {
  office: { code: "OFF", from: 285000 },
  study: { code: "EDU", from: 420000 },
  gaming: { code: "ULT", from: 780000, accent: "accent" },
  workstation: { code: "MAX", from: 1450000 },
};

export function formatTenge(v: number, lang: Lang) {
  const locale = lang === "ru" ? "ru-RU" : "en-US";
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v) + " ₸";
}

export const BUILD_SPECS: Record<Purpose, { ru: string[]; en: string[] }> = {
  office: {
    ru: [
      "AMD Ryzen 5 5600G · Vega 7",
      "16 ГБ DDR4 3200",
      "SSD NVMe 512 ГБ",
      "Корпус тихий 550 Вт 80+ Bronze",
      "Windows 11 Pro · офисный пакет",
    ],
    en: [
      "AMD Ryzen 5 5600G · Vega 7",
      "16 GB DDR4 3200",
      "512 GB NVMe SSD",
      "Silent case, 550 W 80+ Bronze PSU",
      "Windows 11 Pro · office suite",
    ],
  },
  study: {
    ru: [
      "Intel Core i5-13400F",
      "RTX 3050 6 ГБ",
      "32 ГБ DDR4 3200",
      "SSD NVMe 1 ТБ",
      "БП 650 Вт 80+ Bronze",
    ],
    en: [
      "Intel Core i5-13400F",
      "RTX 3050 6 GB",
      "32 GB DDR4 3200",
      "1 TB NVMe SSD",
      "650 W 80+ Bronze PSU",
    ],
  },
  gaming: {
    ru: [
      "AMD Ryzen 7 7700X",
      "RTX 4070 Super 12 ГБ",
      "32 ГБ DDR5 6000",
      "SSD NVMe 2 ТБ Gen4",
      "Жидкостное охлаждение 240 мм",
    ],
    en: [
      "AMD Ryzen 7 7700X",
      "RTX 4070 Super 12 GB",
      "32 GB DDR5 6000",
      "2 TB NVMe Gen4 SSD",
      "240 mm AIO liquid cooler",
    ],
  },
  workstation: {
    ru: [
      "Intel Core i9-14900K / Threadripper",
      "RTX 4090 24 ГБ",
      "64–128 ГБ DDR5 ECC",
      "SSD NVMe 4 ТБ Gen5",
      "БП 1000 Вт 80+ Platinum",
    ],
    en: [
      "Intel Core i9-14900K / Threadripper",
      "RTX 4090 24 GB",
      "64–128 GB DDR5 ECC",
      "4 TB NVMe Gen5 SSD",
      "1000 W 80+ Platinum PSU",
    ],
  },
};

export type PriceRow = { cat: string; name: string; stock: "in" | "low"; price: number };
export const PRICE_ROWS: PriceRow[] = [
  { cat: "CPU", name: "AMD Ryzen 7 7700X", stock: "in", price: 215000 },
  { cat: "CPU", name: "Intel Core i7-14700K", stock: "in", price: 265000 },
  { cat: "CPU", name: "Intel Core i9-14900K", stock: "low", price: 345000 },
  { cat: "GPU", name: "ASUS DUAL RTX 4060 Ti 8GB", stock: "in", price: 260000 },
  { cat: "GPU", name: "MSI Ventus RTX 4070 Super 12GB", stock: "in", price: 415000 },
  { cat: "GPU", name: "Gigabyte RTX 4090 Gaming OC", stock: "low", price: 1250000 },
  { cat: "RAM", name: "Kingston Fury Beast 32GB DDR5-6000", stock: "in", price: 78000 },
  { cat: "RAM", name: "G.Skill Trident Z5 64GB DDR5-6400", stock: "in", price: 165000 },
  { cat: "SSD", name: "Samsung 990 PRO 2TB NVMe", stock: "in", price: 115000 },
  { cat: "SSD", name: "WD Black SN850X 4TB", stock: "low", price: 235000 },
  { cat: "PSU", name: "Corsair RM850e 850W 80+ Gold", stock: "in", price: 88000 },
  { cat: "PSU", name: "Seasonic Prime PX-1000 Platinum", stock: "in", price: 165000 },
  { cat: "CASE", name: "Lian Li Lancool 216 Black", stock: "in", price: 65000 },
  { cat: "CASE", name: "Fractal Design Torrent", stock: "low", price: 145000 },
];

export type CfgOption = { id: string; label: string; price: number };
export type CfgStep = { id: "cpu" | "gpu" | "ram" | "storage" | "case"; options: CfgOption[] };

export const CFG_STEPS: CfgStep[] = [
  {
    id: "cpu",
    options: [
      { id: "r5", label: "AMD Ryzen 5 7600", price: 145000 },
      { id: "r7", label: "AMD Ryzen 7 7700X", price: 215000 },
      { id: "i7", label: "Intel Core i7-14700K", price: 265000 },
      { id: "i9", label: "Intel Core i9-14900K", price: 345000 },
    ],
  },
  {
    id: "gpu",
    options: [
      { id: "rx7600", label: "RX 7600 8GB", price: 175000 },
      { id: "rtx4060", label: "RTX 4060 Ti 8GB", price: 260000 },
      { id: "rtx4070s", label: "RTX 4070 Super 12GB", price: 415000 },
      { id: "rtx4090", label: "RTX 4090 24GB", price: 1250000 },
    ],
  },
  {
    id: "ram",
    options: [
      { id: "16", label: "16 GB DDR5-5600", price: 42000 },
      { id: "32", label: "32 GB DDR5-6000", price: 78000 },
      { id: "64", label: "64 GB DDR5-6000", price: 145000 },
    ],
  },
  {
    id: "storage",
    options: [
      { id: "1tb", label: "1 TB NVMe Gen4", price: 55000 },
      { id: "2tb", label: "2 TB NVMe Gen4", price: 115000 },
      { id: "4tb", label: "4 TB NVMe Gen5", price: 235000 },
    ],
  },
  {
    id: "case",
    options: [
      { id: "lancool", label: "Lian Li Lancool 216 + 750W Gold", price: 130000 },
      { id: "torrent", label: "Fractal Torrent + 850W Gold", price: 210000 },
      { id: "o11", label: "Lian Li O11 Dynamic + 1000W Plat.", price: 320000 },
    ],
  },
];
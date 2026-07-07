export type PortfolioCategory = "Personal" | "Curated" | "Community" | "Political";

export type PortfolioCard = {
  name: string;
  author: string;
  category: PortfolioCategory;
  desc: string;
  return: number;
  holdings: number;
  value: number;
  div: string;
  trend: "up" | "down";
};

export const topPortfolio = {
  name: "Savings",
  author: "You",
  category: "Personal" as const,
  desc: "Conservative portfolio focused on stable dividend-paying stocks and bonds. Ideal for long-term wealth building.",
  totalReturn: 12.34,
  holdings: 8,
  value: 89820,
  diversification: "8 sectors",
  bestDay: 5.2,
  worstDay: -3.8,
};

export const marketTickers = [
  { symbol: "S&P 500", value: "7,499.36", change: 0.79 },
  { symbol: "NASDAQ", value: "26,213.71", change: 1.52 },
  { symbol: "DOW", value: "52,319.20", change: 0.26 },
  { symbol: "BTC", value: "58,604.60", change: -2.75 },
  { symbol: "GOLD", value: "4,021.80", change: -0.41 },
  { symbol: "ETH", value: "3,112.40", change: 1.08 },
];

export const myPortfolios: PortfolioCard[] = [
  {
    name: "Tech Growth",
    author: "You",
    category: "Personal",
    desc: "High-growth technology stocks targeting 15-20% annual returns. Heavy exposure to AI and semiconductor names.",
    return: 23.56,
    holdings: 12,
    value: 156300,
    div: "3 sectors",
    trend: "up",
  },
  {
    name: "Global Markets Mix",
    author: "You",
    category: "Personal",
    desc: "International exposure with mix of developed and emerging markets. Includes ETFs and individual stocks.",
    return: -2.15,
    holdings: 9,
    value: 67420,
    div: "5 countries",
    trend: "down",
  },
  {
    name: "Emerging Markets Growth",
    author: "You",
    category: "Personal",
    desc: "Emerging market stocks and funds focusing on e-commerce, fintech, and consumer sectors.",
    return: 15.42,
    holdings: 14,
    value: 110200,
    div: "12 countries",
    trend: "up",
  },
];

export const curatedPortfolios: PortfolioCard[] = [
  {
    name: "Healthcare Innovation",
    author: "Dr. Michael Park",
    category: "Curated",
    desc: "Focused on healthcare and biotech companies with strong R&D pipelines. Higher risk, higher reward strategy.",
    return: 18.73,
    holdings: 11,
    value: 98750,
    div: "6 sectors",
    trend: "up",
  },
  {
    name: "Value Bargain Hunt",
    author: "Warren Collector",
    category: "Curated",
    desc: "Undervalued companies trading below intrinsic value. Long-term value investing approach.",
    return: 9.54,
    holdings: 16,
    value: 105600,
    div: "8 sectors",
    trend: "up",
  },
];

export const communityPortfolios: PortfolioCard[] = [
  {
    name: "Dividend Income",
    author: "Sarah Chen",
    category: "Community",
    desc: "Curated portfolio of high-dividend yield stocks. Generates passive income with 4.5% yield.",
    return: 8.92,
    holdings: 15,
    value: 124500,
    div: "10 sectors",
    trend: "up",
  },
  {
    name: "Sustainable Investing",
    author: "Emma Rodriguez",
    category: "Community",
    desc: "ESG-focused portfolio of environmentally responsible companies. Filter by sustainability metrics.",
    return: 11.08,
    holdings: 20,
    value: 142800,
    div: "9 sectors",
    trend: "up",
  },
];

export const politicalPortfolios: PortfolioCard[] = [
  {
    name: "Nancy Pelosi Political Portfolio",
    author: "Nancy Pelosi",
    category: "Political",
    desc: "High-profile public disclosure portfolio reconstructed from congressional filings. Tracks insider trades.",
    return: 245.6,
    holdings: 24,
    value: 892300,
    div: "12 sectors",
    trend: "up",
  },
  {
    name: "Wasserman Schultz Portfolio",
    author: "Debbie Wasserman Schultz",
    category: "Political",
    desc: "Public disclosure portfolio tracking congressional trades and investment patterns.",
    return: 162.9,
    holdings: 18,
    value: 612400,
    div: "9 sectors",
    trend: "up",
  },
];

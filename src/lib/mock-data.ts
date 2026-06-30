export const user = {
  name: "Alex Morgan",
  firstName: "Alex",
  email: "alex@investwhat.com",
  initials: "AM",
  dailyPnl: 1550,
};

export const markets = [
  { symbol: "S&P 500", value: "5,234.18", change: 1.76 },
  { symbol: "NASDAQ", value: "16,742.39", change: 2.14 },
  { symbol: "DOW", value: "39,512.84", change: 0.92 },
  { symbol: "VIX", value: "14.23", change: -3.18 },
];

export const portfolios = [
  { name: "Retirement Fund", value: 27450, change: 12.4, holdings: 5, status: "On track" as const },
  { name: "Growth Portfolio", value: 14200, change: 5.8, holdings: 3, status: "On track" as const },
  { name: "Dividend Income", value: 9800, change: 8.1, holdings: 4, status: "On track" as const },
];

export const trending = ["NVDA", "AAPL", "TSLA", "BTC-USD", "AMZN", "MSFT", "META", "GOOGL"];

export const samplePrompts = [
  "Give me a fundamentals overview for AAPL",
  "What are the support and resistance levels for TSLA?",
  "Show my portfolios",
  "Best semiconductor plays right now",
  "Latest news and sentiment for NVDA",
  "Compare AAPL to its top 3 peers",
];

export const bankAccounts = [
  { name: "Chase Checking", balance: 8420.5, type: "Checking", last4: "4821" },
  { name: "Amex Gold", balance: -1240.18, type: "Credit", last4: "1007" },
  { name: "Marcus Savings", balance: 22300, type: "Savings", last4: "9913" },
];

export const spendingCategories = [
  { name: "Groceries", amount: 642, color: "oklch(0.74 0.17 160)" },
  { name: "Dining", amount: 380, color: "oklch(0.78 0.15 70)" },
  { name: "Transport", amount: 215, color: "oklch(0.65 0.18 240)" },
  { name: "Subscriptions", amount: 142, color: "oklch(0.68 0.2 320)" },
];

export const realHoldings = [
  { ticker: "AAPL", name: "Apple Inc.", shares: 42, price: 224.18, change: 1.2 },
  { ticker: "NVDA", name: "Nvidia Corp.", shares: 18, price: 138.42, change: 3.4 },
  { ticker: "VTI", name: "Vanguard Total Market", shares: 65, price: 268.5, change: 0.4 },
  { ticker: "MSFT", name: "Microsoft", shares: 12, price: 442.1, change: -0.6 },
];

export const investIdeas = [
  { title: "AI Infrastructure Leaders", desc: "Picks & shovels of the AI buildout", tag: "Thematic", perf: 18.4 },
  { title: "Quality Dividend Growers", desc: "Compounders with 10y+ dividend growth", tag: "Income", perf: 9.2 },
  { title: "Emerging Markets Value", desc: "Underowned EM equities at discount", tag: "Value", perf: 6.1 },
  { title: "Clean Energy Transition", desc: "Renewables, grid & storage", tag: "Thematic", perf: -2.3 },
];

export const fantasyPortfolios = [
  { name: "Moonshot Bets", value: 12500, change: 22.1, holdings: 6, age: "3 weeks" },
  { name: "Defensive Picks", value: 10800, change: 1.2, holdings: 8, age: "2 months" },
  { name: "Crypto Sleeve", value: 5200, change: -4.6, holdings: 4, age: "1 month" },
];

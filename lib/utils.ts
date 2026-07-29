export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isValidEIN(ein: string) {
  const digits = ein.replace(/[^0-9]/g, "");
  if (digits.length !== 9) return false;
  const prefixes = [
    "01", "02", "03", "04", "05", "06", "10", "11", "12", "13", "14", "15",
    "16", "20", "21", "22", "23", "24", "25", "26", "27", "30", "31", "32",
    "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44",
    "45", "46", "47", "48", "50", "51", "52", "53", "54", "55", "56", "57",
    "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "71",
    "72", "73", "74", "75", "76", "77", "80", "81", "82", "83", "84", "85",
    "86", "87", "88", "90", "91", "92", "93", "94", "95", "98", "99",
  ];
  return prefixes.includes(digits.slice(0, 2));
}

export function formatEIN(ein: string) {
  const digits = ein.replace(/[^0-9]/g, "").slice(0, 9);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

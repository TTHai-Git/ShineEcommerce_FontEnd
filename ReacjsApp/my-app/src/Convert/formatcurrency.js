export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(Math.round(amount));
};

export const parseCurrency = (formattedCurrency) => {
  // Remove currency symbols and spaces
  const numericString = formattedCurrency
    .replace(/[^\d,.-]/g, "") // Keep numbers, commas, dots, and negative sign
    .replace(/\./g, "") // Remove thousands separators (.)
    .replace(",", "."); // Replace comma with dot for decimals

  return parseFloat(numericString) || 0; // Convert to float, or return 0 if invalid
};

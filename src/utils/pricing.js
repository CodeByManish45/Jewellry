export const GOLD_TYPES = {
  '18k': 5500, // INR per gram approx
  '22k': 6700,
  '24k': 7300,
};

export const calcPrice = (baseWeight, goldType) => {
  return baseWeight * (GOLD_TYPES[goldType] || GOLD_TYPES['22k']);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

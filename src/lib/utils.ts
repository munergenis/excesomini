export const formatDateTimeLocal = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};

export const round05 = (number: number): number => {
  let wholeNum = Math.floor(number * 100);
  wholeNum = wholeNum - (wholeNum % 5);
  return wholeNum / 100;
};

export const calculateSurchargePrice = (minutes: number): number => {
  const pricePerMinute = 0.04396;
  const minutesPerDay = 1440;
  const maxPricePerDay = 10;

  const wholeDays = Math.floor(minutes / minutesPerDay);
  const minutesLastDay = minutes % minutesPerDay;

  let total = wholeDays * maxPricePerDay;
  const parcial = minutesLastDay * pricePerMinute;
  const roundedParcial = round05(parcial);

  total += Math.min(roundedParcial, maxPricePerDay);
  return parseFloat(total.toFixed(2));
};

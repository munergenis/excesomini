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

const minutesPerDay = 1440;

export const calculateSurchargePrice = (minutes: number): number => {
  const pricePerMinute = 0.04396;
  const maxPricePerDay = 10;

  const { days: wholeDays, minutes: minutesLastDay } =
    getTotalDaysAndMinutes(minutes);

  let total = wholeDays * maxPricePerDay;
  const parcial = minutesLastDay * pricePerMinute;
  const roundedParcial = round05(parcial);

  total += Math.min(roundedParcial, maxPricePerDay);
  return parseFloat(total.toFixed(2));
};

export const getTotalDaysAndMinutes = (
  totalMinutes: number
): { days: number; minutes: number } => {
  const days = Math.floor(totalMinutes / minutesPerDay);
  const minutes = totalMinutes % minutesPerDay;

  return { days, minutes };
};

export const getStringResult = (
  checkInMinutesSurcharge: number,
  checkOutMinutesSurcharge: number
): { checkInString: string; checkOutString: string } => {
  const { days: checkInDays, minutes: checkInMinutes } = getTotalDaysAndMinutes(
    checkInMinutesSurcharge
  );
  const { days: checkOutDays, minutes: checkOutMinutes } =
    getTotalDaysAndMinutes(checkOutMinutesSurcharge);

  const daysString = (days: number) => `${days} día${days !== 1 ? 's' : ''}`;
  const hours = (hours: number) => `${hours} hora${hours !== 1 ? 's' : ''}`;

  const checkInString =
    checkInDays === 0 && checkInMinutes === 0
      ? '-'
      : `${daysString(checkInDays)} y ${hours(
          Math.round(checkInMinutes / 60)
        )}`;
  const checkOutString =
    checkOutDays === 0 && checkOutMinutes === 0
      ? '-'
      : `${daysString(checkOutDays)} y ${hours(
          Math.round(checkOutMinutes / 60)
        )}`;

  return {
    checkInString,
    checkOutString,
  };
};

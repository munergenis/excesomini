import { CONFIG } from './config';
import type { FormInputs } from '@/interfaces/Inputs';
import type { Info } from '@/interfaces/Info';

const MS_IN_MINUTE = 1000 * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

export const getInfo = (data: FormInputs): Info => {
  // 1) Tiempos iniciales y finales en ms
  const t0Book = data.inicioReserva.toDate().getTime();
  const t1Book = data.finReserva.toDate().getTime();
  const t0Real = data.entradaReal.toDate().getTime();
  const t1Real = data.salidaReal.toDate().getTime();

  // 2) Duraciones en ms y en días enteros
  const durBookingMs = t1Book - t0Book;
  const durRealMs = t1Real - t0Real;
  const daysBooking = Math.floor(durBookingMs / MS_IN_DAY);
  const daysReal = Math.floor(durRealMs / MS_IN_DAY);

  // 3) Es Tarifa Plana?
  const isTarifaPlana =
    daysBooking > CONFIG.FLAT_MIN_DAYS && daysBooking < CONFIG.FLAT_MAX_DAYS;

  // 4) Cáclulo base de excesos (minutos)
  const inSurchargeMs = Math.max(t0Book - t0Real - 2 * MS_IN_HOUR, 0);
  const outSurchargeMs = Math.max(t1Real - t1Book - 2 * MS_IN_HOUR, 0);
  const inSurchargeMinutes = Math.floor(inSurchargeMs / MS_IN_MINUTE);
  let outSurchargeMinutes = Math.floor(outSurchargeMs / MS_IN_MINUTE);

  // 5) Ajustes por tarifa plana
  if (data.tarifasPlanas && isTarifaPlana) {
    if (daysReal < CONFIG.FLAT_MAX_DAYS) {
      // hasta 21 días reales, sin sobrecargos
      // TODO: verificar si aunque sea tarifa plana y duración REAL menor a 21 dias que pasa si entra mucho antes?
      outSurchargeMinutes = 0;
    } else {
      const thresholdMs = t0Book + CONFIG.FLAT_MAX_DAYS * MS_IN_DAY;
      const extraOutMs = Math.max(t1Real - thresholdMs, 0);
      outSurchargeMinutes = Math.floor(extraOutMs / MS_IN_MINUTE);
    }
  }

  return {
    bookingPrice: data.precioOriginal,
    isTarifaPlana,
    totalBookingDays: daysBooking,
    totalRealDays: daysReal,
    checkInTimeSurcharge: inSurchargeMinutes,
    checkOutTimeSurcharge: outSurchargeMinutes,
  };
};

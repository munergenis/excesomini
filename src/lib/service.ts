import type { FormInputs } from '@/interfaces/Inputs';
import type { Info } from '@/interfaces/Info';

const MS_IN_MINUTE = 1000 * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;
const FLAT_MIN_DAYS = 7;
const FLAT_MAX_DAYS = 21;

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
    daysBooking > FLAT_MIN_DAYS && daysBooking < FLAT_MAX_DAYS;

  // 4) Cáclulo base de excesos (minutos)
  const inSurchargeMs = Math.max(t0Book - t0Real - 2 * MS_IN_HOUR, 0);
  const outSurchargeMs = Math.max(t1Real - t1Book - 2 * MS_IN_HOUR, 0);
  const inSurchargeMinutes = Math.floor(inSurchargeMs / MS_IN_MINUTE);
  let outSurchargeMinutes = Math.floor(outSurchargeMs / MS_IN_MINUTE);

  // 5) Ajustes por tarifa plana
  if (data.tarifasPlanas && isTarifaPlana) {
    if (daysReal < FLAT_MAX_DAYS) {
      // hasta 21 días reales, sin sobrecargos
      // TODO: verificar si aunque sea tarifa plana y duración REAL menor a 21 dias que pasa si entra mucho antes?
      outSurchargeMinutes = 0;
    } else {
      const thresholdMs = t0Book + FLAT_MAX_DAYS * MS_IN_DAY;
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

// export const getInfo = (data: FormInputs): Info => {
//   const initBookingTime = data.inicioReserva.toDate().getTime();
//   const endBookingTime = data.finReserva.toDate().getTime();
//   const initRealTime = data.entradaReal.toDate().getTime();
//   const endRealTime = data.salidaReal.toDate().getTime();
//   const totalBookingTime = endBookingTime - initBookingTime;
//   const totalRealTime = endRealTime - initRealTime;
//   const isBookingTarifaPlana =
//     totalBookingTime / (1000 * 60 * 60 * 24) > 7 &&
//     totalBookingTime / (1000 * 60 * 60 * 24) < 21;

//   const checkinTimeSurcharge_ms = Math.max(
//     initBookingTime - initRealTime - 1000 * 60 * 60 * 2,
//     0
//   );
//   const checkoutTimeSurcharge_ms = Math.max(
//     endRealTime - endBookingTime - 1000 * 60 * 60 * 2,
//     0
//   );

//   const checkInTimeSurcharge = Math.floor(
//     checkinTimeSurcharge_ms / (1000 * 60)
//   );
//   const checkOutTimeSurcharge = Math.floor(
//     checkoutTimeSurcharge_ms / (1000 * 60)
//   );

//   const totalBookingDays = Math.floor(totalBookingTime / (1000 * 60 * 60 * 24));
//   const totalRealDays = Math.floor(totalRealTime / (1000 * 60 * 60 * 24));

//   // const totalSurchargeTime = checkinTimeSurcharge_ms + checkoutTimeSurcharge_ms;
//   // let totalSurchargeTimeMinutes = Math.floor(totalSurchargeTime / (1000 * 60));

//   const info: Info = {
//     checkInTimeSurcharge,
//     checkOutTimeSurcharge,
//     bookingPrice: data.precioOriginal,
//     isTarifaPlana: isBookingTarifaPlana,
//     totalBookingDays,
//     totalRealDays,
//   };

//   if (data.tarifasPlanas && isBookingTarifaPlana && totalRealDays < 21) {
//     info.checkInTimeSurcharge = 0;
//     info.checkOutTimeSurcharge = 0;
//   } else if (
//     data.tarifasPlanas &&
//     isBookingTarifaPlana &&
//     totalRealDays >= 21
//   ) {
//     info.checkOutTimeSurcharge =
//       checkOutTimeSurcharge -
//       (initBookingTime + 1000 * 60 * 60 * 24 * 21) / (1000 * 60);
//   }

//   return { ...info };
// };

import { type ZonedDateTime } from '@internationalized/date';
import { z } from 'zod';

export type FormInputs = z.infer<typeof inputsSchema>;
export const inputsSchema = z.object({
  tarifasPlanas: z.boolean(),
  inicioReserva: z.custom<ZonedDateTime>(),
  finReserva: z.custom<ZonedDateTime>(),
  entradaReal: z.custom<ZonedDateTime>(),
  salidaReal: z.custom<ZonedDateTime>(),
  prepago: z.boolean(),
  precioOriginal: z.number().nonnegative(),
});

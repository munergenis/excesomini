import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inputsSchema, type FormInputs } from '@/interfaces/Inputs';
import { Button, Checkbox, DatePicker, Input } from '@heroui/react';
import { now, getLocalTimeZone } from '@internationalized/date';
import { useEffect } from 'react';
import { Form } from './Form';

interface InputFormProps {
  onSubmit: (
    minutes: number,
    prePrice: number,
    isBookingTarifaPlana: boolean
  ) => void;
}

export const InputForm = ({ onSubmit }: InputFormProps) => {
  const { handleSubmit, watch, setError, setValue, control } =
    useForm<FormInputs>({
      defaultValues: {
        tarifasPlanas: true,
        inicioReserva: now(getLocalTimeZone()),
        finReserva: now(getLocalTimeZone()),
        entradaReal: now(getLocalTimeZone()),
        salidaReal: now(getLocalTimeZone()),
        prepago: false,
        precioOriginal: 0,
      },
      resolver: zodResolver(inputsSchema),
      mode: 'onTouched',
    });

  const isPrepago = watch('prepago');

  useEffect(() => {
    if (isPrepago) {
      setValue('precioOriginal', 0);
    }
  }, [isPrepago, setValue]);

  const calculate: SubmitHandler<FormInputs> = (data) => {
    if (data.inicioReserva.toDate() >= data.finReserva.toDate()) {
      setError('inicioReserva', { message: 'Inicio debe ser anterior a Fin' });
      return;
    }
    if (data.entradaReal.toDate() >= data.salidaReal.toDate()) {
      setError('entradaReal', {
        message: 'Entrada debe ser anterior a Salida',
      });
      return;
    }
    const initBookingTime = data.inicioReserva.toDate().getTime();
    const endBookingTime = data.finReserva.toDate().getTime();
    const initRealTime = data.entradaReal.toDate().getTime();
    const endRealTime = data.salidaReal.toDate().getTime();
    const totalBookingTime = endBookingTime - initBookingTime;
    const totalRealTime = endRealTime - initRealTime;
    const isBookingTarifaPlana =
      totalBookingTime / (1000 * 60 * 60 * 24) > 7 &&
      totalBookingTime / (1000 * 60 * 60 * 24) < 21;

    const checkinTimeSurcharge = Math.max(
      initBookingTime - initRealTime - 1000 * 60 * 60 * 2,
      0
    );
    const checkoutTimeSurcharge = Math.max(
      endRealTime - endBookingTime - 1000 * 60 * 60 * 2,
      0
    );

    const totalSurchargeTime = checkinTimeSurcharge + checkoutTimeSurcharge;
    let totalSurchargeTimeMinutes = Math.floor(
      totalSurchargeTime / (1000 * 60)
    );

    if (
      data.tarifasPlanas &&
      isBookingTarifaPlana &&
      totalRealTime / (1000 * 60 * 60 * 24) < 21
    ) {
      totalSurchargeTimeMinutes = 0;
    }

    onSubmit(
      totalSurchargeTimeMinutes,
      data.precioOriginal,
      isBookingTarifaPlana
    );

    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(calculate)}>
      <Controller
        control={control}
        name="tarifasPlanas"
        render={({ field }) => (
          <Checkbox
            isSelected={field.value}
            onValueChange={field.onChange}
            color="success"
          >
            Tarifas Planas
          </Checkbox>
        )}
      />

      <div className="flex flex-col gap-2 shadow-lg bg-gradient-to-br from-white to-green-100 p-4 rounded-xl">
        <h2 className="text-xl">Reserva</h2>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="inicioReserva"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                variant="bordered"
                label="Inicio Reserva"
                hourCycle={24}
                hideTimeZone
                showMonthAndYearPickers
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="finReserva"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                variant="bordered"
                label="Fin Reserva"
                hourCycle={24}
                hideTimeZone
                showMonthAndYearPickers
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="prepago"
          render={({ field }) => (
            <Checkbox
              color="default"
              isSelected={field.value}
              onValueChange={field.onChange}
            >
              Pre-Pago
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name="precioOriginal"
          render={({ field }) => (
            <Input
              variant="faded"
              label="Precio Original"
              type="number"
              endContent="€"
              isDisabled={isPrepago}
              value={isNaN(field.value) ? '0' : field.value.toString()}
              onChange={(e) => field.onChange(+e.target.value)}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2 shadow-lg bg-gradient-to-br from-white to-green-100 p-4 rounded-xl">
        <h2 className="text-xl">Estancia Real</h2>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="entradaReal"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                variant="bordered"
                label="Entrada Real"
                hourCycle={24}
                hideTimeZone
                showMonthAndYearPickers
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="salidaReal"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                variant="bordered"
                label="Salida Real"
                hourCycle={24}
                hideTimeZone
                showMonthAndYearPickers
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
      </div>

      <Button
        variant="shadow"
        type="submit"
      >
        Calcular
      </Button>
    </Form>
  );
};

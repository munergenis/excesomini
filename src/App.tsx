import { calculateSurchargePrice, getStringResult } from './lib/utils';

import type { Info } from './interfaces/Info';
import { InputForm } from './components/InputForm';
import { useState } from 'react';

const App = () => {
  // const [prePrice, setPrePrice] = useState(0);
  // const [surcharge, setSurcharge] = useState(0);
  // const [isTarifaPlana, setIsTarifaPlana] = useState(false);
  // const [StringResult, setStringResult] = useState('');
  const [info, setInfo] = useState<Info | null>(null);

  const onSubmit = (info: Info) => {
    // setSurcharge(
    //   calculateSurchargePrice(checkInTimeSurcharge + checkOutTimeSurcharge)
    // );
    // setPrePrice(bookingPrice);
    // setIsTarifaPlana(isTarifaPlana);
    // setStringResult(getStringResult(minutes));
    setInfo({ ...info });
  };

  const surcharge = calculateSurchargePrice(
    (info?.checkInTimeSurcharge || 0) + (info?.checkOutTimeSurcharge || 0)
  );
  const { checkInString, checkOutString } = getStringResult(
    info?.checkInTimeSurcharge || 0,
    info?.checkOutTimeSurcharge || 0
  );

  return (
    <div>
      <div>
        <InputForm onSubmit={onSubmit} />
        <div className="p-4 grid grid-cols-2 text-center place-items-center container max-w-lg mx-auto gap-4">
          <div className="w-full py-2 border-2 border-gray-200 rounded-xl">
            <div className="text-xs">Dias Total Reserva</div>
            <div className="font-bold">{info?.totalBookingDays}</div>
          </div>

          <div className="w-full py-2 border-2 border-gray-200 rounded-xl">
            <div className="text-xs">Dias Total Real</div>
            <div className="font-bold">{info?.totalRealDays}</div>
          </div>
        </div>
      </div>

      <hr className="mt-4 ring-1 text-gray-100 max-w-lg mx-auto" />
      <hr className="mt-2 ring-1 text-gray-100 max-w-lg mx-auto" />

      {/* Output */}
      <div className="p-4 grid grid-cols-3 container max-w-lg mx-auto gap-4 bg-gradient-to-br from-white to-green-100 rounded-lg my-4 shadow-xl">
        {info?.isTarifaPlana && (
          <div className="col-span-3 bg-green-300 p-2 text-center text-xl rounded-lg">
            Tarifa Plana!
          </div>
        )}
        <div className="bg-gradient-to-br from-white to-green-200 py-4 text-2xl text-center rounded-lg">
          <div className="text-sm">Exceso</div>
          <div className="text-lg font-semibold">{surcharge}€</div>
        </div>
        <div className="bg-gradient-to-br from-white to-green-300 py-4 text-2xl text-center rounded-lg">
          <div className="text-lg font-bold">Total</div>
          <div className="text-3xl font-bold">
            {surcharge + (info?.bookingPrice || 0)}€
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-green-200 py-4 text-2xl text-center rounded-lg">
          <div className="text-sm">Reserva</div>
          <div className="text-lg font-semibold">
            {info?.bookingPrice || 0}€
          </div>
        </div>
      </div>

      <hr className="mt-8 ring-1 text-gray-100 max-w-lg mx-auto" />
      <hr className="mt-2 ring-1 text-gray-100 max-w-lg mx-auto" />

      <div className="p-4 grid grid-cols-2 container max-w-lg mx-auto gap-4 bg-gradient-to-br from-white to-green-100 rounded-lg my-4 shadow-xl">
        <div className="bg-gradient-to-br from-white to-green-200 p-4 text-center rounded-lg">
          <div className="text-sm">Exceso Entrada</div>
          <div className="font-bold">{checkInString}</div>
        </div>
        <div className="bg-gradient-to-br from-white to-green-200 p-4 text-center rounded-lg">
          <div className="text-sm">Exceso Salida</div>
          <div className="font-bold">{checkOutString}</div>
        </div>
      </div>
    </div>
  );
};
export default App;

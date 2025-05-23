import { InputForm } from './components/InputForm';
import { calculateSurchargePrice } from './lib/utils';
import { useState } from 'react';

const App = () => {
  const [prePrice, setPrePrice] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [isTarifaPlana, setIsTarifaPlana] = useState(false);

  const onSubmit = (
    minutes: number,
    prePrice: number,
    isBookingTarifaPlana: boolean
  ) => {
    setSurcharge(calculateSurchargePrice(minutes));
    setPrePrice(prePrice);
    setIsTarifaPlana(isBookingTarifaPlana);
  };

  return (
    <div>
      <div>
        <InputForm onSubmit={onSubmit} />
      </div>

      {/* Output */}
      <div className="p-4 grid grid-cols-3 container max-w-lg mx-auto gap-4">
        {isTarifaPlana && (
          <div className="col-span-3 bg-gradient-to-br from-white to-green-100 p-2 text-center text-xl rounded-lg">
            Tarifa Plana!
          </div>
        )}
        <div className="bg-gradient-to-br from-white to-green-100 py-4 text-2xl text-center rounded-lg">
          <div className="text-sm">Exceso</div>
          <div className="text-lg font-semibold">{surcharge}€</div>
        </div>
        <div className="bg-gradient-to-br from-white to-green-100 py-4 text-2xl text-center rounded-lg">
          <div className="text-lg font-bold">Total</div>
          <div className="text-3xl font-bold">{surcharge + prePrice}€</div>
        </div>
        <div className="bg-gradient-to-br from-white to-green-100 py-4 text-2xl text-center rounded-lg">
          <div className="text-sm">Reserva</div>
          <div className="text-lg font-semibold">{prePrice}€</div>
        </div>
      </div>
    </div>
  );
};
export default App;

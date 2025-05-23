import type { Info } from '@/interfaces/Info';

interface PriceTotalsProps {
  info: Info | null;
  surcharge: number;
}

export const PriceTotals = ({ info, surcharge }: PriceTotalsProps) => {
  return (
    <div className="p-4 grid grid-cols-3 items-center container max-w-lg mx-auto gap-4 bg-gradient-to-br from-white to-green-100 rounded-lg my-4 shadow-xl">
      {info?.isTarifaPlana && (
        <div className="col-span-3 bg-green-300 p-2 text-center text-xl rounded-lg">
          Tarifa Plana!
        </div>
      )}

      <div className="bg-gradient-to-br from-white to-green-200 hover:to-green-300 py-2 text-2xl text-center rounded-lg transition-colors duration-200">
        <div className="text-sm">Exceso</div>
        <div className="text-lg font-semibold">{surcharge}€</div>
      </div>

      <div className="bg-gradient-to-br from-white to-green-300 hover:to-green-400 transition-colors duration-200 py-4 text-2xl text-center rounded-lg">
        <div className="text-lg font-bold">Total</div>
        <div className="text-3xl font-bold">
          {surcharge + (info?.bookingPrice || 0)}€
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-green-200 hover:to-green-300 py-2 text-2xl text-center rounded-lg transition-colors duration-200">
        <div className="text-sm">Reserva</div>
        <div className="text-lg font-semibold">{info?.bookingPrice || 0}€</div>
      </div>
    </div>
  );
};

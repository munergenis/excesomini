import type { Info } from '@/interfaces/Info';

interface InfoBookingProps {
  info: Info | null;
}

export const InfoBooking = ({ info }: InfoBookingProps) => {
  return (
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
  );
};

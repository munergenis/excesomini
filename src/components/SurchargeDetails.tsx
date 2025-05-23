interface SurchargeDetailsProps {
  checkInString: string;
  checkOutString: string;
}

export const SurchargeDetails = ({
  checkInString,
  checkOutString,
}: SurchargeDetailsProps) => {
  return (
    <div className="p-4 grid grid-cols-2 container max-w-lg mx-auto gap-4 bg-gradient-to-br from-white to-green-100 rounded-lg my-4 shadow-xl">
      <div className="bg-gradient-to-br from-white to-green-200 p-4 text-center rounded-lg hover:to-green-300 transition-colors duration-200">
        <div className="text-sm">Exceso Entrada</div>
        <div className="font-bold">{checkInString}</div>
      </div>
      <div className="bg-gradient-to-br from-white to-green-200 p-4 text-center rounded-lg hover:to-green-300 transition-colors duration-200">
        <div className="text-sm">Exceso Salida</div>
        <div className="font-bold">{checkOutString}</div>
      </div>
    </div>
  );
};

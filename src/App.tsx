import { calculateSurchargePrice, getStringResult } from './lib/utils';

import type { Info } from './interfaces/Info';
import { InfoBooking } from './components/InfoBooking';
import { InputForm } from './components/InputForm';
import { PriceTotals } from './components/PriceTotals';
import { Separator } from './components/Separator';
import { SurchargeDetails } from './components/SurchargeDetails';
import { useState } from 'react';

const App = () => {
  const [info, setInfo] = useState<Info | null>(null);

  const onSubmit = (info: Info) => {
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
        <InfoBooking info={info} />
      </div>

      <Separator />

      <PriceTotals
        info={info}
        surcharge={surcharge}
      />

      <Separator marginTop="8" />

      <SurchargeDetails
        checkInString={checkInString}
        checkOutString={checkOutString}
      />
    </div>
  );
};
export default App;

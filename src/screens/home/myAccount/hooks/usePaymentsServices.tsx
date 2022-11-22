import { useCallback, useEffect, useState } from 'react';
import { ServicePaymentInterface } from 'rtk';
import { vtexServicesPayments } from 'services';

export const useServicesPayments = () => {
  const [servicesPayments, setServicesPayments] = useState<ServicePaymentInterface[]>();

  const fetchServicesPayments = useCallback(async () => {
    let data: ServicePaymentInterface[] = await vtexServicesPayments.getServicesPayments();
    data = data
      .filter((i: ServicePaymentInterface) => i.isActive === true)
      .sort((a: ServicePaymentInterface, b: ServicePaymentInterface) => {
        return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
      });
    setServicesPayments(data);
  }, []);

  useEffect(() => {
    fetchServicesPayments();
  }, [fetchServicesPayments]);

  return {
    fetchServicesPayments,
    servicesPayments
  };
};

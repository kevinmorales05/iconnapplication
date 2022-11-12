import { useCallback, useEffect, useState } from 'react';
import { ServicePaymentInterface } from 'rtk';
import { vtexServicesPayments } from 'services';

export const useServicesPayments = () => {
  const [servicesPayments, setServicesPayments] = useState<ServicePaymentInterface[]>();

  const fetchServicesPayments = useCallback(async () => {
    const data = await vtexServicesPayments.getServicesPayments();
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

import React, { useEffect } from 'react';
import { useInConstruction } from 'context';

const InConstructionController: React.FC = () => {
  const inConstruction = useInConstruction();

  useEffect(() => {
    inConstruction.show();
  }, []);

  return <></>;
};

export default InConstructionController;

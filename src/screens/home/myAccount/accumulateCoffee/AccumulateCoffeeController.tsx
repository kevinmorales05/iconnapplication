import React, { useState } from 'react';
import { RootState, useAppSelector } from 'rtk';
import AccumulateCoffeeScreen from './AccumulateCoffeeScreen';

const AccumulateCoffeeController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [coffees, setCoffees] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressQR = () => {
    if (coffees === 6) {
      setCoffees(coffees);
    } else {
      setCoffees(coffees + 1);
    }
  };

  const onPressOpen = () => {
    setModalVisible(true);
  };

  const onPressClose = () => {
    setModalVisible(false);
  };

  return (
    <AccumulateCoffeeScreen
      userId={user.userId as string}
      onPressQR={onPressQR}
      coffees={coffees}
      onPressClose={onPressClose}
      onPressOpen={onPressOpen}
      modalVisible={modalVisible}
    />
  );
};

export default AccumulateCoffeeController;

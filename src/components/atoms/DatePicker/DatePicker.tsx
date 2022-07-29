import React from 'react';
import Input, { Props } from '../Input/Input';

const DatePicker = (props: Props) => {
  return <Input {...props} keyboardType="numeric" placeholder={'dd/mm/aaaa'} maxLength={'dd/mm/yyyy'.length} datePicker />;
};

export default DatePicker;

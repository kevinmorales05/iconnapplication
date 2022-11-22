import React, { ForwardedRef, forwardRef } from 'react';
import Input, { Props } from '../Input/Input';

const DatePicker = forwardRef((props: Props, ref: ForwardedRef<any>) => {
  return <Input ref={ref} {...props} keyboardType="numeric" placeholder={'dd/mm/aaaa'} maxLength={'dd/mm/yyyy'.length} datePicker />;
});

export default DatePicker;

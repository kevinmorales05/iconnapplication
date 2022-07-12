import { NativeSyntheticEvent, TextInputChangeEventData, TextStyle } from 'react-native';
import { Input } from '../Input';
import React, { useEffect, useState } from 'react';
import { Control, FieldValues } from 'react-hook-form';

type DatePickerResponse = {
  value: string;
  day?: string;
  month?: string;
  year?: string;
};

type Props = {
  label: string;
  value?: string;
  testID?: string;
  style?: TextStyle;
  onFocus?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  editable?: boolean;
  format?: 'dd/mm/aaaa' | 'dd/mm/yy';
  onChangeText?: (text: DatePickerResponse) => void;
  placeholderTextColor?: string;
	name?: string;
  control: Control<FieldValues, object>;
  onPressDatePickerIcon: () => void;
};

const DatePicker = ({
  label,
  value,
  testID = 'datepicker',  
  onFocus = () => {},
  onBlur = () => {},
  editable = true,
  format = 'dd/mm/aaaa',
  onChangeText = () => {},
	name,
  control,  
  onPressDatePickerIcon
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const maxLength = format.length;
  const dateDictionary: { [key: string]: string } = {
    D: 'day',
    M: 'month',
    Y: 'year',
  };

  useEffect(() => {
    if (value && value !== '') {
      const response = setInputDateMask(value);
      setInputValue(response.value);
    }
  }, []);

  const prepareRegex = () => {
    let regexString = '';
    format
      .split('/')
      .map((section) => (regexString += `(\\d{0,${section.length}})`));
    regexString += '$';
    return new RegExp(regexString, 'g');
  };

  const regex = prepareRegex();

  const setInputDateMask = (text: string): DatePickerResponse => {
    const plainText = typeof text === 'string' ? text.split('/').join('') : text;
    const result = regex.exec(plainText) || [];
    let response: DatePickerResponse = { value: '' };

    const dateArr: string[] = [];

    // Loop the groups made by the regex
    for (let i in result) {
      if (result[Number(i) + 1]) {
        // push the correct pivots to new array
        dateArr.push(result[Number(i) + 1]);
      }
    }

    const date = dateArr.join('/');

    /**
     * Split format to get order and date sections
     * as it is generic
     */
    format.split('/').map((section, index) => {
      // loop dateDictionary keys
      Object.keys(dateDictionary).map((key) => {
        /**
         * look for key in the format section to prepare
         * date response obj
         */
        if (section.includes(key)) {
          response = {
            ...response,
            [dateDictionary[key]]: result[index + 1],
          };
        }
      });
    });

    response = { ...response, value: date };
    return response;
  };

  return (
    <Input
    	name={name!}
    	control={control}
			defaultValue={inputValue}
      testID={testID}
      label={label}
      onFocus={(e) => onFocus(e)}
      onBlur={(e) => onBlur(e)}
      editable={editable}
      keyboardType="numeric"			
      placeholder={format}
      maxLength={maxLength}
      onChangeText={(text) => {
        const response = setInputDateMask(text);
        setInputValue(response.value);
        onChangeText(response);
      }}
      datePicker
      onPressDatePickerIcon={onPressDatePickerIcon}
    />
  );
};

export default DatePicker;

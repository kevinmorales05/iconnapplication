import React, { useState } from 'react'
import {SafeArea} from '../../../../components/atoms/SafeArea';
import ScannerScreen from './ScannerScreen';
import theme from 'components/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


import { HomeStackParams } from 'navigation/types';

const ScannerController: React.FC = () => {
    const [scannerCode, setScannerCode] = useState("");
    const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
   
  return (
        <ScannerScreen setBarcode={setScannerCode} />
  )
}

export default ScannerController
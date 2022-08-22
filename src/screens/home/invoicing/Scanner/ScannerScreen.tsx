import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from 'components';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';




interface Props {
    
    setBarcode: (data:string) => void
}

const ScannerScreen: React.FC<Props> = ({ setBarcode }) => {

    const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

    const onSuccess = (e:any) => {
        console.log("This is the data read ", e.data);
        setBarcode(e.data);
        navigate("ContinueWith");
    }

    return (
        
           
              <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to{' '}
                            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                            your computer and scan the QR code.
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>Salir</Text>
                        </TouchableOpacity>
                    }
                />
            
        

    )
}

export default ScannerScreen;

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
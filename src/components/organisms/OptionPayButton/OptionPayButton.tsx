import { Container } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {
    image: any;
    text: string;
    amount?: string;
    icon?: boolean;
}

const OptionPayButton = ({ image, text, amount, icon }: Props) => {
    return(
        <Container style={styles.container}>
            <Container style={styles.containerText}>
                <Image source={image} style={styles.containerImage} resizeMode='contain' />
                <TextContainer text={text} fontSize={moderateScale(14)} marginLeft={moderateScale(12)} />
            </Container>
            {
                amount ?
                    <Container style={styles.containerAmount}>
                        <TextContainer text={`$${amount}`} fontSize={moderateScale(14)} marginLeft={moderateScale(12)} />
                    </Container>
                :
                    icon ?
                        <Container style={styles.containerAmount}>
                            <MaterialIcons name={'arrow-forward-ios'} size={moderateScale(24)}/>
                        </Container>
                    :
                        null
            }
        </Container>
    );
}

export default OptionPayButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(64),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(12),
        marginTop: moderateScale(8),
        backgroundColor: theme.brandColor.iconn_white
    },
    containerImage: {
        width: moderateScale(32),
        height: verticalScale(32)
    },
    containerText: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 0.76
    },
    containerAmount: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});
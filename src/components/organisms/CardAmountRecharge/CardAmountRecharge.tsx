import { Container } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

type Props = {
    image: any;
    text: string;
    amount: string;
    subTitle: string
}

const CardAmountRecharge = ({ image, text, amount, subTitle }: Props) => {
    return(
        <Container style={styles.container}>
            <Image source={image} style={styles.containerImage} resizeMode='contain' />
            <TextContainer text={text} fontSize={moderateScale(12)} textColor={theme.fontColor.placeholder} marginTop={moderateScale(8)}/>
            <TextContainer text={subTitle} fontSize={moderateScale(12)} textColor={theme.fontColor.placeholder} marginTop={moderateScale(8)}/>
            <Container style={styles.containerAmount}>
            <TextContainer text={`$${amount}`} fontSize={moderateScale(16)} fontBold/>
            </Container>
        </Container>
    );
}

export default CardAmountRecharge;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(90),
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(8),
        marginTop: moderateScale(12),
        backgroundColor: theme.brandColor.iconn_white,
        overflow: 'hidden'
    },
    containerImage: {
        width: moderateScale(145),
        height: verticalScale(19),
        left: -moderateScale(22)
    },
    containerAmount: {
        right: moderateScale(25),
        top: moderateScale(15),
        position: 'absolute'
    }
});
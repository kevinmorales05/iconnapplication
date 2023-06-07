import { Container } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

type Props = {
    image: any;
    text: string;
}

const OptionModalButton = ({ image, text }: Props) => {
    return(
        <Container style={styles.container}>
            <Image source={image} style={styles.containerImage} resizeMode='contain' />
            <TextContainer text={text} fontSize={moderateScale(14)} marginLeft={moderateScale(12)} />
        </Container>
    );
}

export default OptionModalButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(64),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: '#dadadb',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(12),
        marginTop: moderateScale(12)
    },
    containerImage: {
        width: moderateScale(32),
        height: verticalScale(32)
    }
});
import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText } from 'components/atoms';
import { StyleSheet, Text } from 'react-native';
import theme from '../../theme/theme';
import { moderateScale } from 'utils/scaleMetrics';

interface PriceWithDiscountProps {
  price: number;
  costDiscountPrice?: string;
  promotionType?: string;
}

const PriceWithDiscount: React.FC<PriceWithDiscountProps> = ({ price, costDiscountPrice, promotionType }: PriceWithDiscountProps) => {
  return (
    <Container>
      <Container row style={styles.container}>
        {promotionType ? (
          promotionType == 'campaign' || promotionType == 'regular' ? (
            <Container style={{ marginRight: 15 }}>
              <CustomText
                fontSize={theme.fontSize.h5}
                fontWeight={'900'}
                text={
                  promotionType
                    ? promotionType == 'campaign' || promotionType == 'regular'
                      ? '$' +
                        Number.parseFloat(costDiscountPrice)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      : ''
                    : ''
                }
              />
            </Container>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        {promotionType ? (
          promotionType == 'campaign' || promotionType == 'regular' ? (
            <Text
              style={{
                fontWeight: 'bold',
                textDecorationLine: 'line-through',
                color: theme.brandColor.iconn_grey,
                fontSize: theme.fontSize.h6
              }}
            >
              {`$${price}`}
            </Text>
          ) : (
            <>
              <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={`$${price}`} />
            </>
          )
        ) : (
          <>
            <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={`$${price}`} />
          </>
        )}
      </Container>
    </Container>
  );
};

export default PriceWithDiscount;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(5),
    alignItems: 'center'
  },
  containerText: {
    marginLeft: moderateScale(5)
  },
  containerLine: {
    width: '100%',
    height: moderateScale(0.8),
    position: 'absolute',
    top: '45%',
    backgroundColor: theme.fontColor.placeholder
  }
});

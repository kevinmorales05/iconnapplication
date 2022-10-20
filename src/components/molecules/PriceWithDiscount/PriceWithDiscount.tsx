import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText } from 'components/atoms';
import { StyleSheet, Text } from 'react-native';
import theme from '../../theme/theme';
import { moderateScale } from 'utils/scaleMetrics';

interface PriceWithDiscountProps {
  price: number;
  oldPrice?: number;
  productPromotions: Object;
  productId: string;
}

const PriceWithDiscount: React.FC<PriceWithDiscountProps> = ({ price, oldPrice, productPromotions, productId }: PriceWithDiscountProps) => {
  return (
    <Container>
      <Container row style={styles.container}>
        {
          (productPromotions != undefined && productPromotions.has('' + productId)) ?
            (
              (productPromotions.get('' + productId).promotionType == 'campaign' || productPromotions.get('' + productId).promotionType == 'regular') ?
                (
                  <Container style={{marginRight:15}}>
                  <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={(productPromotions != undefined && productPromotions.has('' + productId)) ?
                    ((productPromotions.get('' + productId).promotionType == 'campaign' || productPromotions.get('' + productId).promotionType == 'regular') ? ( '$'+ (price - ( (parseInt(price) * productPromotions.get('' + productId).percentualDiscountValue) / 100 ) ) ) : '') : ''} />
                    </Container>
                ) :
                <></>
            )
            :
            <></>
        }
        
        {
          (productPromotions != undefined && productPromotions.has('' + productId)) ?
            (
              (productPromotions.get('' + productId).promotionType == 'campaign' || productPromotions.get('' + productId).promotionType == 'regular') ?
                (
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
                ) :
                <>
                  <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={`$${price}`} />
                  {oldPrice && oldPrice != price && (
                    <Container style={styles.containerText}>
                      <CustomText fontSize={theme.fontSize.h6} textColor={theme.fontColor.placeholder} text={`$${oldPrice}`} />
                      <Container style={styles.containerLine} />
                    </Container>
                  )}
                </>
            )
            :
            <>
              <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={`$${price}`} />
              {oldPrice && oldPrice != price && (
                <Container style={styles.containerText}>
                  <CustomText fontSize={theme.fontSize.h6} textColor={theme.fontColor.placeholder} text={`$${oldPrice}`} />
                  <Container style={styles.containerLine} />
                </Container>
              )}
            </>
        }
      </Container>
    </Container>
  );
};

export default PriceWithDiscount;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(9),
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

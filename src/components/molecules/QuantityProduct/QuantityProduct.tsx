import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText, Touchable } from 'components/atoms';
import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'utils/scaleMetrics';

interface QuantityProductProps {
  quantity: number;
  onPressDeleteCart: () => void;
  onPressAddQuantity: () => void;
  onPressDecreaseQuantity: () => void;
}

const QuantityProduct: React.FC<QuantityProductProps> = ({
  quantity,
  onPressDeleteCart,
  onPressAddQuantity,
  onPressDecreaseQuantity
}: QuantityProductProps) => {
  return (
    <Container style={styles.container}>
      <Container style={styles.containerDelete}>
        {quantity === 1 ? (
          <Touchable onPress={onPressDeleteCart}>
            <Container style={styles.touchableContainerLeft}>
              <Feather name="trash-2" size={theme.iconSize.small} color={theme.brandColor.iconn_red_original} />
            </Container>
          </Touchable>
        ) : (
          <Touchable onPress={onPressDecreaseQuantity}>
            <Container style={styles.touchableContainerLeft}>
              <Feather name="minus" size={theme.iconSize.small} color={theme.brandColor.iconn_green_original} />
            </Container>
          </Touchable>
        )}
      </Container>
      <Container style={styles.containerText}>
        <CustomText text={quantity.toString()} fontWeight={'900'} fontSize={theme.fontSize.h5} />
      </Container>
      <Container style={styles.containerAdd}>
        <Touchable onPress={onPressAddQuantity}>
         <Container style={styles.touchableContainerRight}>
           <Feather name="plus" size={theme.iconSize.small} color={theme.brandColor.iconn_green_original} />
          </Container>
       </Touchable>
      </Container>
    </Container>
  );
};

export default QuantityProduct;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    padding: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: moderateScale(1), 
    flex: 1
  },
  containerDelete: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  containerAdd: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1
  },
  touchableContainerLeft:{
  },
  touchableContainerRight:{
    alignItems:'flex-end',
  }
});

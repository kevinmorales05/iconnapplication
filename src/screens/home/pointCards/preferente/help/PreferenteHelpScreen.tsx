import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { TextContainer, Container } from 'components';
import theme from 'components/theme/theme';
import { RootState, useAppSelector } from 'rtk';
import { ICONN_PREFERENTE_HELP } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  itemId: string;
}

const PreferenteHelpScreen: React.FC<Props> = ({
  itemId
}) => {
  const { detailSelected, cart } = useAppSelector((state: RootState) => state.cart);

  itemId = detailSelected;

  useEffect(() => {

  }, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
      <Image source={ICONN_PREFERENTE_HELP} style={{ width: '100%', height: moderateScale(200) }} />
      <Container center style={{ width: '90%', marginTop: moderateScale(30), marginLeft: moderateScale(17) }}>
        <TextContainer
          marginTop={8}
          fontSize={14}
          text={
            `Lorem ipsum tollere odium autem in nostra potevate sint, ab omnibus et contra naturam transferre in nobis. Sed interim toto desiderio supprimuntn: si.`
          }
        />
      </Container>
      <Container style={{ width: '100%', height:4, backgroundColor: theme.brandColor.iconn_light_grey, marginTop:moderateScale(40) }}>
      </Container>
      <Container style={{ width: '90%', marginTop: moderateScale(20), marginLeft: moderateScale(20) }}>
        <TextContainer typography="h6" fontSize={14} fontBold text={`Beneficios`} marginTop={20} />
        <TextContainer typography="h6" fontSize={14} text={`1.-Tollere odium autem in nostra`} marginTop={20} />
        <TextContainer typography="h6" fontSize={14} text={`2.-potestate sint, ab omnibus et contra`} />
        <TextContainer typography="h6" fontSize={14} text={`3.-naturam transferre in nobis. Sed`} />
        <TextContainer typography="h6" fontSize={14} text={`4.-interim toto desiderio supprimunt: s`} />
      </Container>

    </Container>

  );
};

export default PreferenteHelpScreen;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    minHeight: moderateScale(254),
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: moderateScale(16),
    borderRadius: moderateScale(10),
    padding: moderateScale(8)
  },
  containerPorcentDiscount: {
    width: moderateScale(84),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  }
});

import { ICONN_ACCUMULATE_LITRES_LOGO, ICONN_ACCUMULATE_LITRES_NOPROMOS } from 'assets/images';
import { Button, Container, CustomText, PromosCard, TabTwoElements, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LitresPromoInterface, TabItem } from 'rtk';

const tabNames: TabItem[] = [
  {
    id: '1',
    name: 'Canjear litros'
  },
  {
    id: '2',
    name: 'Mis recompensas'
  }
];

interface NoPromosProps {
  type: string;
}

const NoPromosContainer: React.FC<NoPromosProps> = ({ type }) => {
  return (
    <Container center backgroundColor={theme.brandColor.iconn_grey_background}>
      <Image source={ICONN_ACCUMULATE_LITRES_NOPROMOS} style={{ height: 40, width: 40, marginTop: 64 }} />
      <TextContainer text={type === '1' ? 'No hay recompensas disponibles' : 'Sin recompensas'} fontBold fontSize={16} marginTop={9} />
      <TextContainer
        text={
          type === '1'
            ? 'Sigue acumulando litros y espera las próximas recompensas que tendremos para ti'
            : 'Canjea las recompensas disponibles con tus litros acumulados.'
        }
        fontSize={12}
        textAlign="center"
        marginTop={12}
        marginHorizontal={type === '1' ? 46 : 80}
        marginBottom={70}
      />
    </Container>
  );
};

interface Props {
  promos: LitresPromoInterface[];
  reclaimed: LitresPromoInterface[];
  onPressDetail: (promo: LitresPromoInterface) => void;
  onPressAdd: () => void;
}

const AccumulateLitresScreen: React.FC<Props> = ({ promos, reclaimed, onPressDetail, onPressAdd }) => {
  const insets = useSafeAreaInsets();
  const [idSelected, setIdSelected] = useState('1');
  console.log('promos', promos);

  const onPressTab = (tab: TabItem) => {
    if (tab.id) {
      setIdSelected(tab.id);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.brandColor.iconn_white }}
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Image source={ICONN_ACCUMULATE_LITRES_LOGO} style={{ width: 125, height: 115, marginTop: 3.5, zIndex: -1, position: 'absolute' }} />
        <Container center>
          <Container row center style={{ marginTop: 50 }}>
            <MaterialCommunityIcons name="water" color={theme.brandColor.iconn_green_original} size={50} />
            <CustomText text="10" fontWeight="800" fontSize={48} />
          </Container>
          <TextContainer text="Litros acumulados" fontSize={14} />
        </Container>
        <Container style={{ marginHorizontal: 56, marginBottom: 20 }}>
          <Button round fontBold fontSize="buttonDark" onPress={onPressAdd}>
            + Registra tus tickets
          </Button>
          <TextContainer text="Y acumula tus litros para canjearlos por recompensas exclusivas." fontSize={14} textAlign="center" marginTop={12} />
        </Container>
        <Container style={{ maxHeight: '50%', minHeight: '50%' }}>
          <TabTwoElements onPressItem={onPressTab} idSelected={idSelected} items={tabNames} />
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {idSelected === '1' ? (
              promos.length === 0 ? (
                <NoPromosContainer type="1" />
              ) : (
                <Container backgroundColor={theme.brandColor.iconn_grey_background} style={{ paddingTop: 24, paddingHorizontal: 16, paddingBottom: 10 }}>
                  {promos.map((item, index) => {
                    return (
                      <Touchable key={index} onPress={() => onPressDetail(item)}>
                        <PromosCard amount={item.costLitres} expiry={item.expiry} promoPic={item.picture} title={item.name} />
                      </Touchable>
                    );
                  })}
                </Container>
              )
            ) : reclaimed.length === 0 ? (
              <NoPromosContainer type="2" />
            ) : (
              <Container backgroundColor={theme.brandColor.iconn_grey_background} style={{ paddingTop: 24, paddingHorizontal: 16, paddingBottom: 50 }}>
                {reclaimed.length > 0 && reclaimed.find(item => item.status === 'ACTIVO') ? (
                  <Container>
                    <TextContainer text="Activos" fontBold fontSize={12} marginBottom={12} />
                    {reclaimed.map((item, index) => {
                      if (item.status === 'ACTIVO') {
                        return (
                          <PromosCard
                            key={index}
                            amount={item.costLitres}
                            expiry={item.expiry}
                            promoPic={item.picture}
                            title={item.name}
                            status={item.status}
                          />
                        );
                      }
                    })}
                  </Container>
                ) : (
                  <></>
                )}
                {reclaimed.length > 0 && reclaimed.find(item => item.status !== 'ACTIVO') ? (
                  <Container>
                    <TextContainer text="Anteriores" fontBold fontSize={12} marginBottom={12} marginTop={24} />
                    {reclaimed.map((item, index) => {
                      if (item.status !== 'ACTIVO') {
                        return (
                          <PromosCard
                            key={index}
                            amount={item.costLitres}
                            expiry={item.expiry}
                            promoPic={item.picture}
                            title={item.name}
                            status={item.status}
                          />
                        );
                      }
                    })}
                  </Container>
                ) : (
                  <></>
                )}
              </Container>
            )}
          </ScrollView>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default AccumulateLitresScreen;

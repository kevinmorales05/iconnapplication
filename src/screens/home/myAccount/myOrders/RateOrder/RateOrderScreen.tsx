import { ICONN_STAR } from 'assets/images';
import { Button, Container, TextContainer } from 'components';
import PillContainer from 'components/molecules/PillContainer';
import theme from 'components/theme/theme';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SuggestionInterface } from 'rtk';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  pressedRating: number;
  onPressStar: (rating: number) => void;
  toComment: () => void;
  improvementsOptions: SuggestionInterface[];
  wellDoneOptions: SuggestionInterface[];
  findOptionSelect: (option: string) => boolean;
  onPressPill: (option: SuggestionInterface) => void;
  selectsPill: SuggestionInterface[];
}

const RateOrderScreen: React.FC<Props> = ({ pressedRating, onPressStar, toComment, improvementsOptions, wellDoneOptions, findOptionSelect, onPressPill, selectsPill }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={
        Platform.OS === 'android'
          ? { flexGrow: 1, marginBottom: insets.bottom + 16, backgroundColor: theme.brandColor.iconn_white }
          : { flexGrow: 1, backgroundColor: theme.brandColor.iconn_white }
      }
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between" backgroundColor={theme.brandColor.iconn_white}>
        <Container>
          <TextContainer text="1/2" textAlign="center" fontSize={14} marginTop={31.5} />
          <TextContainer text="¿Cómo calificarías tu compra?" textAlign="center" fontBold fontSize={16} marginTop={24} />
          <Container style={{ marginTop: 24 }}>
            <AirbnbRating
              defaultRating={5}
              showRating={false}
              selectedColor="#f5d736"
              unSelectedColor="#dadadb"
              size={48}
              starImage={ICONN_STAR}
              onFinishRating={onPressStar}
            />
          </Container>
        </Container>
        {pressedRating >= 4 ? (
          <Container>
          <TextContainer text="¿Qué podríamos mejorar?" textAlign="center" fontBold fontSize={16} />
          <Container style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: moderateScale(20), marginLeft: 16 }}>
            {wellDoneOptions ? wellDoneOptions.map((option, index) => {
              const isSelectOption = findOptionSelect(option.description);
              return (
                <TouchableOpacity key={option.suggestions_cat_id + index} onPress={() => onPressPill(option)}>
                  <PillContainer text={option.description} fontSize={'h5'} isSelect={isSelectOption} />
                </TouchableOpacity>
              );
            }) : <></> } 
          </Container>
        </Container>
        ) : (
          <Container>
            <TextContainer text="¿Qué podríamos mejorar?" textAlign="center" fontBold fontSize={16} />
            <Container style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: moderateScale(20), marginLeft: 16 }}>
              {improvementsOptions.map((option, index) => {
                const isSelectOption = findOptionSelect(option.description);
                return (
                  <TouchableOpacity key={option.suggestions_cat_id + index} onPress={() => onPressPill(option)}>
                    <PillContainer text={option.description} fontSize={'h5'} isSelect={isSelectOption} />
                  </TouchableOpacity>
                );
              })}
            </Container>
          </Container>
        )}
        <Button
          disabled={ selectsPill.length > 0 ? false : true}
          onPress={toComment}
          marginLeft={16}
          marginRight={16}
          marginBottom={30}
          round
          fontBold
          fontSize="h4"
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default RateOrderScreen;
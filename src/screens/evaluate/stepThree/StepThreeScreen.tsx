
import { Button, Container, TextContainer } from 'components';
import PillContainer from 'components/molecules/PillContainer';
import theme from 'components/theme/theme';
import { SuggestionInterface } from 'components/types/StepsWallet';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

import styles from './styles';

interface Props {
  onSubmit: (sugestion: string[]) => void;
  suggestions: SuggestionInterface[];
  isBad: number | undefined;
}

const StepThreeScreen: React.FC<Props> = ({ onSubmit, suggestions, isBad }) => {
  const insets = useSafeAreaInsets();

  const [selectsPill, setSelectsPills] = useState<string[]>([]);

  const findOptionSelect = (option: SuggestionInterface) => {
    const temSelect: string[] = selectsPill.concat([]);
    if (temSelect.length) {
      const idxFind = temSelect.findIndex(pillOption => pillOption === option.suggestions_cat_id + '');
      if (idxFind >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const onPressPill = (option: SuggestionInterface) => {
    const temSelect: string[] = selectsPill.concat([]);
    if (temSelect.length) {
      const idxFind = temSelect.findIndex(pillOption => pillOption === option.suggestions_cat_id + '');
      if (idxFind >= 0) {
        temSelect.splice(idxFind, 1);
        setSelectsPills(temSelect);
      } else {
        temSelect.push(option.suggestions_cat_id + '');
        setSelectsPills(temSelect);
      }
    } else {
      temSelect.push(option.suggestions_cat_id + '');
      setSelectsPills(temSelect);
    }
  };

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: moderateScale(15),
        backgroundColor: theme.brandColor.iconn_white,
        alignItems: 'center'
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer typography="h5" text={'3/4'} marginTop={verticalScale(30)} />
      <TextContainer
        textAlign="center"
        fontBold
        typography="h4"
        text={isBad ? '¿En qué podemos mejorar?' : '¿Qué fue lo que más te gustó?'}
        marginTop={verticalScale(30)}
      />
      <Container style={styles.containerPills}>
        {suggestions.map((option, idx) => {
          const isSelectOption = findOptionSelect(option);
          return (
            <TouchableOpacity key={option.suggestions_cat_id + idx} onPress={() => onPressPill(option)}>
              <PillContainer text={option.description} fontSize={'h5'} isSelect={isSelectOption} />
            </TouchableOpacity>
          );
        })}
      </Container>
      <Container style={styles.containerButton}>
        <Button length="long" disabled={!selectsPill.length} round onPress={() => onSubmit(selectsPill)} fontSize="h4" fontBold>
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default StepThreeScreen;

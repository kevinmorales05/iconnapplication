import React, { useEffect, useRef } from 'react';
import { Container } from '../../atoms/Container';
import { CustomText, Touchable } from 'components/atoms';
import { moderateScale } from 'utils/scaleMetrics';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { PointDisplayMode } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../theme/theme';

interface SearchBranchProps {
  isButtonSearchBar: boolean;
  onChangeTextSearch: (text: string) => void;
  onEndWriting?: () => void;
  onPressCancelSearch: () => void;
  onPressSearch: () => void;
  pointDisplayMode: PointDisplayMode;
  search: string;
  setSearch: (str: string) => void;
}

const SearchBranch: React.FC<SearchBranchProps> = ({
  isButtonSearchBar,
  onChangeTextSearch,
  onEndWriting,
  onPressCancelSearch,
  onPressSearch,
  pointDisplayMode,
  search,
  setSearch
}: SearchBranchProps) => {
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef) textInputRef.current?.focus();
  }, [isButtonSearchBar]);

  return (
    <Container
      style={{ paddingHorizontal: 16, position: 'absolute', top: 6, alignSelf: Platform.OS === 'android' ? 'flex-start' : 'center' }}
      width={Platform.OS === 'android' && isButtonSearchBar && pointDisplayMode === 'map' ? '88%' : '100%'}
    >
      <Container
        style={{ ...styles.containerSearchBar, borderColor: !isButtonSearchBar ? theme.brandColor.iconn_dark_grey : theme.brandColor.iconn_med_grey }}
        row
        height={moderateScale(48)}
        backgroundColor={theme.brandColor.iconn_white}
      >
        <Container middle flex={0.2}>
          {isButtonSearchBar && <Feather name="search" size={theme.iconSize.small} color={theme.fontColor.placeholder} onPress={onPressSearch} />}
          {!isButtonSearchBar && <AntDesign name="arrowleft" size={theme.iconSize.small} color={theme.fontColor.dark} onPress={onPressCancelSearch} />}
        </Container>
        <Container flex crossCenter>
          {isButtonSearchBar ? (
            <Touchable onPress={onPressSearch}>
              <CustomText text={'Buscar sucursales por ubicación'} textColor={theme.fontColor.placeholder} />
            </Touchable>
          ) : (
            <TextInput
              placeholder={'Buscar sucursales por ubicación'}
              value={search}
              style={{ color: theme.fontColor.dark }}
              placeholderTextColor={theme.fontColor.placeholder}
              onChangeText={str => {
                setSearch(str);
                onChangeTextSearch(str);
              }}
              onEndEditing={onEndWriting}
              multiline={false}
              ref={textInputRef}
              returnKeyType="search"
            />
          )}
        </Container>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerSearchBar: {
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1)
  }
});

export default SearchBranch;

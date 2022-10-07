import React, { useEffect, useRef, useState } from 'react';
import { Container } from '../../atoms/Container';
import { CustomText, Touchable } from 'components/atoms';
import { StyleSheet, TextInput } from 'react-native';
import theme from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'utils/scaleMetrics';

interface SearchBarProps {
  onPressSearch: () => void;
  onChangeTextSearch: (text: string) => void;
  isButton?: boolean;
  textSearch?: string;
  placeHolderText?: string;
  onEndWriting?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onPressSearch, onChangeTextSearch, isButton, textSearch, placeHolderText, onEndWriting }: SearchBarProps) => {
  const textInputRef = useRef<TextInput>(null);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (textInputRef) textInputRef.current?.focus();
  }, []);

  return (
    <Container style={styles.containerSearchBar}>
      <Container style={styles.containerIcon}>
        <Feather name="search" size={theme.iconSize.small} color={theme.fontColor.placeholder} />
      </Container>
      <Container style={styles.containerText}>
        {isButton ? (
          <Touchable
            onPress={() => {
              onPressSearch();
            }}
          >
            {textSearch ? (
              <CustomText text={textSearch} textColor={theme.fontColor.dark} />
            ) : (
              <CustomText text={placeHolderText ? placeHolderText : `¿Qué estás buscando?`} textColor={theme.fontColor.placeholder} />
            )}
          </Touchable>
        ) : (
          <TextInput
            placeholder={`¿Qué estás buscando?`}
            value={search}
            style={{ color: theme.fontColor.dark }}
            placeholderTextColor={theme.fontColor.placeholder}
            onChangeText={search => {
              setSearch(search);
              onChangeTextSearch(search);
            }}
            onEndEditing={() => {
              onEndWriting();
            }}
            multiline={false}
            ref={textInputRef}
          />
        )}
      </Container>
    </Container>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  containerSearchBar: {
    width: '100%',
    height: moderateScale(40),
    backgroundColor: theme.brandColor.iconn_white,
    borderRadius: moderateScale(10),
    borderColor: theme.brandColor.iconn_med_grey,
    borderWidth: moderateScale(1),
    flexDirection: 'row'
  },
  containerIcon: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerText: {
    flex: 1,
    justifyContent: 'center'
  }
});

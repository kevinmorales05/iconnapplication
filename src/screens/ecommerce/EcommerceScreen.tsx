import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container, CustomText, Touchable, ShippingDropdown } from 'components';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const EcommerceScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [toggle, setToggle] = useState(false);

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container style={{ marginBottom: 20 }}>
        <Touchable
          onPress={() => {
            setToggle(current => {
              return !current;
            });
          }}
        >
          <Container style={{ paddingVertical: 20, paddingHorizontal: 10, display: 'flex', justifyContent: 'space-between' }} row>
            <CustomText text={'¿Como quieres recibir tus productos?'} fontBold />
            {toggle ? <Icon name="up" size={18} color={theme.fontColor.dark_grey} /> : <Icon name="down" size={18} color={theme.fontColor.dark_grey} />}
          </Container>
        </Touchable>
        {toggle && (
          <ShippingDropdown
            onPressOut={() => {
              setToggle(false);
            }}
          />
        )}
      </Container>
    </ScrollView>
  );
};

export default EcommerceScreen;

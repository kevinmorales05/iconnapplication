import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText, Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AmountModalProps {
  visible: boolean;
  onPressOut: () => void;
  handleAmount: (ammount: Amount) => void;
  ammount: Amount | null;
}

const AmountChip = ({ ammount, selected, onPress }: { ammount: Amount; selected: boolean; onPress: (ammount: Amount) => void }) => {
  const selectedStyle = {
    backgroundColor: 'white',
    borderColor: '#34c28c',
    borderRadius: 12,
    padding: 9,
    marginLeft: 8,
    borderWidth: 1
  };
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (ammount) {
      const { min, max } = ammount;

      if (min === null) setLabel(`Menos de $${max}`);

      if (max === null) setLabel(`Arriba de $${min}`);

      if (max && min) setLabel(`$${min} a $${max}`);
    }
  }, [ammount]);

  return (
    <Touchable
      onPress={() => {
        onPress({ ...ammount, label });
      }}
    >
      <View style={selected ? selectedStyle : { backgroundColor: '#D1D1D3', borderRadius: 10, padding: 9, marginLeft: 8, width: 'auto', marginVertical: 6 }}>
        <CustomText alignSelf="center" text={label} fontSize={12} />
      </View>
    </Touchable>
  );
};

export interface Amount {
  id: 1;
  min: number | null;
  max: number | null;
  label?: string;
}

const AMMOUNTS = [
  {
    id: 1,
    min: null,
    max: 100
  },
  {
    id: 2,
    min: 100,
    max: 200
  },
  {
    id: 3,
    min: 200,
    max: 300
  },
  {
    id: 4,
    min: 300,
    max: 500
  },
  {
    id: 5,
    min: 500,
    max: 1000
  },
  {
    id: 6,
    min: 1000,
    max: 2000
  },
  {
    id: 7,
    min: 2000,
    max: null
  }
] as Amount[];

const AmountModal: React.FC<AmountModalProps> = ({ visible, onPressOut, ammount, handleAmount }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  const [current, setCurrent] = useState<Amount | null>(null);

  useEffect(() => {
    setCurrent(visible ? ammount : null);
  }, [visible]);

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
              <Container>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Monto" typography="h3" fontBold />
              </Container>
              <Container>
                <ActionButton
                  style={{ marginTop: -6, shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container row>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {AMMOUNTS.map((ammount, key) => {
                  return (
                    <AmountChip
                      key={key}
                      ammount={ammount}
                      selected={ammount.id === current?.id}
                      onPress={ammount => {
                        setCurrent(ammount);
                      }}
                    />
                  );
                })}
              </View>
            </Container>
            <Container>
              <Button
                disabled={current === null}
                onPress={() => {
                  handleAmount(current as Amount);
                  onPressOut();
                }}
                marginTop={28}
                round
                fontBold
                fontSize="h4"
              >
                Aplicar
              </Button>
            </Container>
          </Container>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16
  }
});

export default AmountModal;

interface AmountFilterProps {
  onCurrent: (ammount: Amount) => void;
  current: Amount | null;
}

export const AmountFilter = ({ onCurrent, current }: AmountFilterProps) => {
  return (
    <Container>
      <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
        <Container>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Monto" typography="h3" fontBold />
        </Container>
      </Container>
      <Container row>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {AMMOUNTS.map((ammount, index) => {
            return (
              <AmountChip
                key={index}
                ammount={ammount}
                selected={ammount.id === current?.id}
                onPress={ammount => {
                  onCurrent(ammount);
                }}
              />
            );
          })}
        </View>
      </Container>
    </Container>
  );
};

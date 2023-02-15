import React, { Ref, useEffect, useState } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BranchesMunicipality, BranchesState } from 'rtk';
import { Button, TextContainer } from '../../molecules';
import { Container, Select, CustomText, ActionButton, CustomBackdrop } from '../../atoms';
import { FieldValues, useForm } from 'react-hook-form';
import { openField } from 'utils/rules';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from 'components/theme/theme';

interface Props {
  bottomSheetRef: Ref<BottomSheetModal>;
  onPressClose: () => void;
  onSubmit: (values: FieldValues) => void;
  snapPoints: any[];
  states: BranchesState[];
}

const StateMunicipalitySheet: React.FC<Props> = ({ bottomSheetRef, onPressClose, onSubmit, snapPoints, states }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const [municipalities, setMunicipalities] = useState<BranchesMunicipality[]>();

  useEffect(() => {
    setValue('municipality', '');
  }, [municipalities]);

  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDisplayed(true);
    }, 2000);
  }, []);

  return (
    <BottomSheetModal
      backgroundStyle={{ borderRadius: 24 }}
      enablePanDownToClose={true}
      onChange={() => {}}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      stackBehavior="push"
      backdropComponent={backdropProps => <CustomBackdrop {...backdropProps} />}
    >
      {isDisplayed && (
        <BottomSheetScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: theme.brandColor.iconn_white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 16
          }}
        >
          <Container>
            <Container row space="between">
              <ActionButton
                style={{ top: -2, backgroundColor: 'transparent' }}
                icon={<Ionicons name="md-location-outline" size={24} color="black" />}
                size="xxsmall"
                onPress={onPressClose}
              />
              <Container flex>
                <CustomText alignSelf="flex-start" textColor={theme.brandColor.iconn_dark_grey} text="Buscar en:" typography="h3" fontBold />
                <ActionButton
                  style={{ position: 'absolute', right: 0, top: -2, backgroundColor: 'transparent' }}
                  icon={<AntDesign name="close" size={24} color="black" />}
                  size="xxsmall"
                  onPress={onPressClose}
                />
              </Container>
            </Container>

            <TextContainer typography="h6" fontBold text="Estado" marginTop={21} />

            <Select
              name="state"
              control={control}
              rules={openField(3)}
              options={states}
              optionsIdField="stateId"
              optionsValueField="stateName"
              onSelect={(value: number | string | BranchesState) => {
                if (value !== 'Selección') {
                  if (typeof value === 'object') {
                    setValue('state', value && states ? states?.find(i => i.stateId === value.stateId)!.stateName : '');
                    setMunicipalities(value && states ? states?.find(i => i.stateId === value.stateId)?.municipalities : []);
                  } else {
                    setValue('state', value && states ? states?.find(i => i.stateId === value)!.stateName : '');
                    setMunicipalities(value && states ? states?.find(i => i.stateId === value)?.municipalities : []);
                  }
                } else {
                  setValue('state', '');
                  setValue('municipality', '');
                }
                trigger('state');
                trigger('municipality');
              }}
              androidMode="dialog"
              placeholder={'Selección'}
              disabled={false}
            />

            <TextContainer typography="h6" fontBold text="Municipio" marginTop={21} />
            <Select
              name="municipality"
              control={control}
              rules={openField(3)}
              options={municipalities ? municipalities : []}
              optionsIdField="municipalityId"
              optionsValueField="municipalityName"
              onSelect={(value: number | string | BranchesMunicipality) => {
                if (value !== 'Selección') {
                  if (typeof value === 'object') {
                    setValue(
                      'municipality',
                      value && municipalities ? municipalities.find(i => i.municipalityId === value.municipalityId)!.municipalityName : ''
                    );
                  } else {
                    setValue('municipality', value && municipalities ? municipalities.find(i => i.municipalityId === value)!.municipalityName : '');
                  }
                } else {
                  setValue('municipality', '');
                }
                trigger('municipality');
              }}
              androidMode="dialog"
              placeholder={'Selección'}
              disabled={false}
            />
          </Container>
          <Container>
            <Button
              disabled={!isValid}
              marginTop={24}
              round
              fontBold
              fontSize="h4"
              onPress={handleSubmit(onSubmit)}
              icon={<Feather name="search" size={24} color="white" />}
            >
              Buscar
            </Button>
          </Container>
        </BottomSheetScrollView>
      )}
    </BottomSheetModal>
  );
};

export default StateMunicipalitySheet;

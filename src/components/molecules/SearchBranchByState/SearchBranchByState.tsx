import React, { useEffect, useState } from 'react';
import { BranchesMunicipality, BranchesState, RootState, useAppSelector } from 'rtk';
import { Container } from '../../atoms/Container';
import { openField } from 'utils/rules';
import { Select } from 'components/atoms';
import { useForm } from 'react-hook-form';
import theme from '../../theme/theme';

interface SearchBranchProps {
  onSelectMunicipality: (state: any, municipality: any) => void;
  states: BranchesState[];
}

const SearchBranchByState: React.FC<SearchBranchProps> = ({ onSelectMunicipality, states }: SearchBranchProps) => {
  const { state: selectedState, municipality: selectedMunicipality } = useAppSelector((state: RootState) => state.app);
  const { control, setValue, trigger, getValues } = useForm({
    mode: 'onChange'
  });
  const [municipalities, setMunicipalities] = useState<BranchesMunicipality[]>();

  useEffect(() => {
    if (selectedState !== '' && selectedMunicipality !== '') {
      setValue('state', selectedState);
      trigger('state');
      setMunicipalities(states?.find(i => i.stateName === selectedState)?.municipalities);
      setValue('municipality', selectedMunicipality);
      trigger('municipality');
    }
  }, []);

  useEffect(() => {
    if (selectedState !== '' && selectedMunicipality !== '') {
      setValue('state', selectedState);
      trigger('state');
      setMunicipalities(states?.find(i => i.stateName === selectedState)?.municipalities);
      setValue('municipality', selectedMunicipality);
      trigger('municipality');
    }
  }, [selectedState, selectedMunicipality]);

  return (
    <Container row middle style={{ position: 'absolute', top: 8, zIndex: 100 }} width={'100%'} backgroundColor={'transparent'}>
      <Container width={'42%'} style={{ marginLeft: 8, marginRight: 16, backgroundColor: theme.brandColor.iconn_white, borderRadius: 8 }}>
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
          androidMode="dropdown"
          placeholder={'Selección'}
          disabled={false}
          marginTop={0}
        />
      </Container>
      <Container width={'42%'} style={{ marginRight: 8, marginLeft: 16, backgroundColor: theme.brandColor.iconn_white, borderRadius: 8 }}>
        <Select
          name="municipality"
          control={control}
          rules={openField(3)}
          options={municipalities ? municipalities : []}
          optionsIdField="municipalityName"
          optionsValueField="municipalityName"
          onSelect={(value: number | string | BranchesMunicipality) => {
            if (value !== 'Selección') {
              if (typeof value === 'object') {
                setValue(
                  'municipality',
                  value && municipalities ? municipalities.find(i => i.municipalityName === value.municipalityName)!.municipalityName : ''
                );
              } else {
                setValue('municipality', value !== '' && municipalities ? municipalities.find(i => i.municipalityName === value)!.municipalityName : '');
              }
              onSelectMunicipality(getValues('state'), getValues('municipality'));
            } else {
              setValue('municipality', '');
            }
            trigger('municipality');
          }}
          androidMode="dropdown"
          placeholder={'Selección'}
          disabled={false}
          marginTop={0}
        />
      </Container>
    </Container>
  );
};

export default SearchBranchByState;

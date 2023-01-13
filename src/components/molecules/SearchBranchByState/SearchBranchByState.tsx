import React from 'react';
import { Container } from '../../atoms/Container';
import { PAYMENT_METHODS } from 'assets/files';
import { Select } from 'components/atoms';
import { useForm } from 'react-hook-form';
import theme from '../../theme/theme';

interface SearchBranchProps {
  onSelectState: (v: any) => void;
}

const SearchBranchByState: React.FC<SearchBranchProps> = ({ onSelectState }: SearchBranchProps) => {
  const { control } = useForm({
    mode: 'onChange'
  });

  return (
    <Container row middle style={{ position: 'absolute', top: 8, zIndex: 100 }} width={'100%'} backgroundColor={'transparent'}>
      <Container width={'42%'} style={{ marginLeft: 8, marginRight: 16, backgroundColor: theme.brandColor.iconn_white }}>
        <Select
          name="state"
          options={PAYMENT_METHODS}
          optionsIdField="id"
          optionsValueField="name"
          onSelect={value => {
            onSelectState(value);
          }}
          androidMode="dialog"
          placeholder={'Seleccionar'}
          label="Selecciona el estado:"
          control={control}
          marginTop={0}
        />
      </Container>
      <Container width={'42%'} style={{ marginRight: 8, marginLeft: 16, backgroundColor: theme.brandColor.iconn_white }}>
        <Select
          name="state"
          options={PAYMENT_METHODS}
          optionsIdField="id"
          optionsValueField="name"
          onSelect={value => {
            onSelectState(value);
          }}
          androidMode="dialog"
          placeholder={'Seleccionar'}
          label="Selecciona el estado:"
          control={control}
          marginTop={0}
        />
      </Container>
    </Container>
  );
};

export default SearchBranchByState;

import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import { Code } from '.';
import React from 'react';

storiesOf('Molecules/Code', module)
  .addDecorator(BufferView)
  .add('Type', () => {
    return (
      <>
        <Code
          label="Ingresa el codigo:"
          error={true}
          caption="Código incorrecto"
          disable={false}
          disabledAction={true}
          lengthInput={6}
          secureTextEntry={false}
          labelAction="Reenviar Código"
        />
      </>
    );
  });

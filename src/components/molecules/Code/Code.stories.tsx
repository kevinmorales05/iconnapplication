import { action } from '@storybook/addon-actions';
import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import { Code } from '.';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { boolean, select, text } from '@storybook/addon-knobs';
import { getStyles } from './Code.styles';

storiesOf('Molecules/Code', module)
  .addDecorator(BufferView)
  .add('Type', () => {
    return (
      <>
        <Code
          label='Ingresa el codigo:'
          error={true}
          caption='Código incorrecto'                    
          disable={false}
          disabledAction={true}
          lengthInput={6}
          secureTextEntry={false}
          labelAction='Reenviar Código'
        />
      </>
    )
  });

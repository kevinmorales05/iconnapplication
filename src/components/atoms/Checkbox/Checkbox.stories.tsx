import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CheckBox from './CheckBox';

const onPressDoNothing = () => {};

storiesOf('Atoms/Checkbox', module)
  .addDecorator(BufferView)
  .add('Type', () => {
    return (
      <>
        <CheckBox size="xxsmall" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="xsmall" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="small" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="medium" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="large" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="xlarge" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="xxlarge" onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Icon right', () => {
    return (
      <>
        <CheckBox onPress={onPressDoNothing} iconRight>
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Checked', () => {
    return (
      <>
        <CheckBox checked onPress={onPressDoNothing}>
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Color', () => {
    return (
      <>
        <CheckBox onPress={onPressDoNothing} color="iconn_accent_principal">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={onPressDoNothing} color="iconn_accent_secondary">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={onPressDoNothing} checked color="iconn_error">
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Text Color', () => {
    return (
      <>
        <CheckBox onPress={onPressDoNothing} textColor="link">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={onPressDoNothing} textColor="medgrey">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={onPressDoNothing} textColor="grey">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={onPressDoNothing} textColor="paragraph">
          Hello CheckBox
        </CheckBox>
      </>
    );
  });

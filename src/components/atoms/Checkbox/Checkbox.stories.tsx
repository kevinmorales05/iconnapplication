import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CheckBox from './CheckBox';

storiesOf('Atoms/Checkbox', module)
  .addDecorator(BufferView)
  .add('Type', () => {
    return (
      <>
        <CheckBox size="xxsmall" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="xsmall" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="small" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="medium" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="large" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="xlarge" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
        <CheckBox size="xxlarge" onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Icon right', () => {
    return (
      <>
        <CheckBox onPress={() => {}} iconRight>
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Checked', () => {
    return (
      <>
        <CheckBox checked onPress={() => {}}>
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Color', () => {
    return (
      <>
        <CheckBox onPress={() => {}} color="iconn_accent_principal">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={() => {}} color="iconn_accent_secondary">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={() => {}} checked color="iconn_error">
          Hello CheckBox
        </CheckBox>
      </>
    );
  })
  .add('Text Color', () => {
    return (
      <>
        <CheckBox onPress={() => {}} textColor="link">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={() => {}} textColor="medgrey">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={() => {}} textColor="grey">
          Hello CheckBox
        </CheckBox>
        <CheckBox onPress={() => {}} textColor="paragraph">
          Hello CheckBox
        </CheckBox>
      </>
    );
  });

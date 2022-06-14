import { action } from '@storybook/addon-actions';
import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import { Button } from '.';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { boolean, select } from '@storybook/addon-knobs';

storiesOf('Molecules/Button', module)
  .addDecorator(BufferView)
  .add('Type', () => {
    return (
      <>
        <Button onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button round onPress={action('pressed')}  style={{marginTop:8}}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}  style={{marginTop:8}}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}  style={{marginTop:8}}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Loading', () => {
    return (
      <>
        <Button loading onPress={action('pressed')}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Disabled', () => {
    return (
      <>
        <Button color='iconn_accent_principal' disabled onPress={action('pressed')}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Length', () => {
    return (
      <>
        <Button length="short" onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button length="long" onPress={action('pressed')} style={{marginTop:8}}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Color', () => {
    return (
      <>
        <Button color="iconn_orange_original" onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button color="iconn_accent_secondary" onPress={action('pressed')} style={{marginTop:8}}>
          Iconn Button
        </Button>
        <Button color="iconn_success" onPress={action('pressed')} style={{marginTop:8}}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Icon', () => {
    return (
      <> 
        <Button 
          icon={<Feather
              name="user"
              size={24}
              color="white" />}
          onPress={action('pressed')}>
          Iconn Button
        </Button>     
      </>
    )
  })
  .add('Size', () => {
    return (
      <>
        <Button
          size="xxsmall"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          size="xsmall"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          size="small"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          size="medium"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          size="large"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          size="xlarge"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          size="xxlarge"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Width', () => {
    return (
      <>
        <Button
          length="short"
          width="xxsmall"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          length="short"
          width="xsmall"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          length="short"
          width="small"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          length="short"
          width="medium"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          length="short"
          width="large"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          length="short"
          width="xlarge"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button
          style={{marginTop:8}}
          length="short"
          width="xxlarge"
          onPress={action('pressed')}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Tint', () => {
    return (
      <>
        <Button 
          outline
          tint={true}
          onPress={action('pressed')}>
          Iconn Button
        </Button>
      </>
    )
  })
  .add('Playground', () => {
    return (
      <>
        <Button
          size={select('size', ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'], 'medium')}
          width={select('width', ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'], 'medium')}
          color={select('color', ['iconn_orange_original', 'iconn_green_original', 'iconn_red_original', 'iconn_accent_principal', 
          'iconn_accent_secondary', 'iconn_warm_grey', 'iconn_light_grey', 'iconn_med_grey', 'iconn_grey', 'iconn_dark_grey', 
          'iconn_background', 'iconn_white', 'iconn_success', 'iconn_warning', 'iconn_error', 'iconn_info'], 'iconn_accent_secondary')}
          length={select('length', ['long', 'short'], 'long')}
          round={boolean('round', false)}
          outline={boolean('outline', false)}
          transparent={boolean('transparent', false)}
          loading={boolean('loading', false)}
          disabled={boolean('disabled', false)}
          tint={boolean('tint', true)}
          onPress={action('pressed')}>
          Iconn Button
        </Button>
      </>
    )
  });

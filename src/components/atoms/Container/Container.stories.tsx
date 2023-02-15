import { action } from '@storybook/addon-actions';
import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import { Button } from '../../molecules/Button';
import { Container } from '.';
import React from 'react';

storiesOf('Atoms/Container', module)
  .addDecorator(BufferView)
  .add('Flex Column', () => {
    return (
      <Container>
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column End', () => {
    return (
      <Container flex alignment="end">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column Start', () => {
    return (
      <Container flex alignment="start">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column CrossAlignment Start', () => {
    return (
      <Container flex crossAlignment="start">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column CrossAlignment End', () => {
    return (
      <Container flex crossAlignment="end">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column Crosscenter Space Between', () => {
    return (
      <Container flex crossCenter space="between">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column Crosscenter Space Around', () => {
    return (
      <Container flex crossCenter space="around">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column Crosscenter Space Evenly', () => {
    return (
      <Container flex crossCenter space="evenly">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column CrossCenter (JustifyContent:center)', () => {
    return (
      <Container flex crossCenter>
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column Middle (AlignItems:center + JustifyContent:center)', () => {
    return (
      <Container flex middle>
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Row', () => {
    return (
      <Container flex row>
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Row Center', () => {
    return (
      <Container flex row center>
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button outline onPress={action('pressed')}>
          Iconn Button
        </Button>
        <Button transparent onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Row Center Space Around', () => {
    return (
      <Container flex row center space="around">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Row Center Space Between', () => {
    return (
      <Container flex row center space="between">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Row Center Space Evenly', () => {
    return (
      <Container flex row center space="evenly">
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  })
  .add('Flex Column Backgroundcolor', () => {
    return (
      <Container flex row center space="evenly" backgroundColor={'red'}>
        <Button onPress={action('pressed')}>Iconn Button</Button>
        <Button round onPress={action('pressed')}>
          Iconn Button
        </Button>
      </Container>
    );
  });

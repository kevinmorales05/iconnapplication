import BufferView from 'utils/BufferView';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Avatar from './Avatar';
import { action } from '@storybook/addon-actions';

const OnPressEmpty = () => {
  ('');
};

storiesOf('Atoms/Avatar', module)
  .addDecorator(BufferView)
  .add('Size', () => {
    return (
      <>
        <Avatar size="xxsmall" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
        <Avatar size="xsmall" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
        <Avatar size="small" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
        <Avatar size="medium" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
        <Avatar size="large" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
        <Avatar size="xlarge" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
        <Avatar size="xxlarge" onPress={OnPressEmpty}>
          Hello Avatar
        </Avatar>
      </>
    );
  })
  .add('Type', () => {
    return (
      <>
        <Avatar title="MM" onPress={action('pressed')} />
        <Avatar square title="MM" onPress={action('pressed')} />
        <Avatar rounded title="MM" onPress={action('pressed')} />
      </>
    );
  })
  .add('Title', () => {
    return (
      <>
        <Avatar title="MM" />
      </>
    );
  })
  .add('Source', () => {
    return (
      <>
        <Avatar
          source={{
            uri: 'https://www.audi.com.mx/content/dam/nemo/models/a3/rs-3-limousine/my-2022/NeMo-Derivate-Startpage/stage/1080x1920-audi-rs-3-sedan-stage-mobile-RS3_2021_3182.jpg?imwidth=768'
          }}
        />
      </>
    );
  })
  .add('Editable', () => {
    return (
      <>
        <Avatar title="MM" editable={true} onPress={action('pressed')} />
        <Avatar
          source={{
            uri: 'https://www.audi.com.mx/content/dam/nemo/models/a3/rs-3-limousine/my-2022/NeMo-Derivate-Startpage/stage/1080x1920-audi-rs-3-sedan-stage-mobile-RS3_2021_3182.jpg?imwidth=768'
          }}
          editable={true}
          onPress={action('pressed')}
        />
      </>
    );
  });

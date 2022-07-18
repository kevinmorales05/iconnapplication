import { SizeType } from 'components/types/size-type';
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Platform,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import theme from '../../theme/theme';
import { AvatarProps } from '../../types/Avatar';
import { Container } from '../Container';
import { ICONN_USER } from 'assets/images';

const getContainerStyle = (props: AvatarProps) => {
	const { size, source, square, rounded } = props;
  const avatarStyle:any = [styles.container];
  avatarStyle.push({
    backgroundColor: '#f4f4f4',
    padding: theme.size[size!],
    width: theme.avatarSize[size!],
    height: theme.avatarSize[size!],
    borderRadius: theme.avatarSize[size!] * 2,
  });
  if (source) avatarStyle.push({ padding: 0 });
  if (square) avatarStyle.push({ borderRadius: 0 });
  if (rounded) avatarStyle.push({ borderRadius: 10 });
  return avatarStyle;
};

const getEditIconStyle = (size: SizeType | string) => {
  const iconStyle = [
    {
      width: theme.avatarSize[size] / 2,
      height: theme.avatarSize[size] / 2,
      borderRadius: theme.avatarSize[size] / 4,
      backgroundColor: theme.brandColor.iconn_white,
      marginLeft: 14,
    },
  ];
  return iconStyle;
};

const getTitleStyle = (size: SizeType | string) => {
  return {
    fontWeight: '600',
    fontSize: theme.avatarSize[size] / 4,
    color: theme.fontColor.grey,
  };
};

const Avatar: React.FC<AvatarProps> = ({
	style,	
	title = 'MM',
  editable = false,
  size = 'xsmall',
  editText = 'Editar',
  defaultSource = ICONN_USER,
	...props
}) => {
	({ ...props } = { style, title, editable, size, editText, defaultSource, ...props });
  const [succesful, setSuccesful] = useState(false);

  const TouchableElement: any =
    Platform.OS === 'android' ? Pressable : TouchableOpacity;
  return (
    <Container row
      style={StyleSheet.flatten([
        {width: theme.avatarSize[size]},
      ])}>
      <TouchableElement disabled={!editable} {...props}>
        <Container
          style={StyleSheet.flatten([
            getContainerStyle({ ...props }),
            style,
          ])}>
          {props.source ? (
            <Image
              onLoadStart={() => {
                setSuccesful(true)
              }}
              onLoad={() => {
                setSuccesful(false)
              }}
              defaultSource={defaultSource}
              source={props.source}
              resizeMode="cover"
              style={succesful ?  styles.defaultImage : styles.image}
            />
          ) : (
            <Text
              numberOfLines={1}
              style={StyleSheet.flatten([
                getTitleStyle(size),
                props.textStyle,
              ])}>
              {title}
            </Text>
          )}
        </Container>
      </TouchableElement>
      {editable && (
        <Container row center>
          <TouchableElement>
            <Container center crossCenter style={StyleSheet.flatten([
              getEditIconStyle(size),
              props.editIconStyle,
            ])}>
              <Octicons
                name="pencil"
                size={theme.avatarSize[size] / 3}
                color={props.editIconColor || theme.brandColor.iconn_accent_secondary}
                onPress={props.onPress}
              />
            </Container>
            </TouchableElement>            
            <Text>{editText}</Text>            
        </Container>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  defaultImage: {
    width: '70%',
    height: '70%',
  } 
});

export default Avatar;

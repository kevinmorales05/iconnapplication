import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthDataInterface } from 'rtk/types/auth.types';
import { Avatar } from 'components/atoms/Avatar';

interface AccountItemProps extends TouchableOpacityProps {
  user: AuthDataInterface;
}

export default function AccountItem(props: AccountItemProps) {
  const { user, ...touchableOpacityProps } = props;
  return (
    <TouchableOpacity style={styles.container} {...touchableOpacityProps}>
      <View style={styles.content}>
        <View style={styles.start}>
          <View>
            <Avatar source={{ uri: user.photo }} />
          </View>
        </View>
        <View style={styles.middle}>
          <Text numberOfLines={1} style={styles.primary}>
            {user.name}
          </Text>
          <Text numberOfLines={1} style={styles.secondary}>
            {user.email}
          </Text>
        </View>
        <View style={styles.end}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 10,
    padding: 10
  },
  content: {
    flexDirection: 'row'
  },
  start: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  middle: {
    flex: 4,
    justifyContent: 'center'
  },
  end: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  primary: { fontWeight: 'bold', marginLeft: 20 },
  secondary: {
    marginLeft: 20,
    color: 'darkgray',
    fontSize: 12
  }
});

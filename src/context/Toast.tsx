import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, StyleSheet } from 'react-native';
import { Container } from '../components/atoms';
import { ToastContext } from './toast.context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from 'components/theme/theme';

export const Toast = () => {
  const { toast, hide } = useContext(ToastContext);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    } else {
      Animated.timing(fade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        toast.visible ? { height: 'auto', position: 'absolute', top: 50 } : { height: 0 },
        { opacity: fade },
        {
          backgroundColor:
            toast.type === 'error'
              ? theme.brandColor.iconn_error
              : toast.type === 'success'
              ? theme.brandColor.iconn_success
              : toast.type === 'warning'
              ? theme.brandColor.iconn_warning
              : toast.type === 'limited'
              ? theme.brandColor.iconn_dark_grey
              : undefined!
        }
      ]}
    >
      <Container row center crossCenter space="between">
        <Container center space="between">
          <AntDesign
            name={
              toast.type === 'error'
                ? 'closecircleo'
                : toast.type === 'success'
                ? 'checkcircleo'
                : toast.type === 'warning'
                ? 'warning'
                : toast.type === 'limited'
                ? 'checkcircleo'
                : undefined!
            }
            color={theme.brandColor.iconn_white}
            style={{ marginLeft: 16, marginRight: 16 }}
            size={24}
          />
        </Container>
        <Animated.Text style={{ opacity: fade, color: theme.brandColor.iconn_white, fontSize: 16, fontWeight: '400', letterSpacing: 0.3, width: 250 }}>
          {toast.message}
        </Animated.Text>
        <TouchableOpacity onPress={hide} style={{ marginRight: 16 }}>
          <Ionicons name={'close-outline'} size={24} color={theme.brandColor.iconn_white} />
        </TouchableOpacity>
      </Container>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    borderRadius: 8,
    display: 'flex',
    elevation: 1,
    height: 0,
    justifyContent: 'center',
    left: 0,
    marginHorizontal: 16,
    paddingVertical: 16,
    position: 'absolute',
    right: 0,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    top: 0,
    zIndex: 1
  }
});

import React, {useContext, useEffect, useRef} from 'react';
import { ToastContext } from './toast.context';
import {
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import theme from 'components/theme/theme';
import { Container } from 'components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Toast = () => {
  const {toast, hide} = useContext(ToastContext);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(fade, {        
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(fade, {        
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {opacity: fade},
        { backgroundColor: toast.type === 'error' ? 
          theme.brandColor.iconn_error : toast.type === 'success' ? 
          theme.brandColor.iconn_success : toast.type === 'warning' ? 
          theme.brandColor.iconn_warning : undefined!}
      ]}>
      <Container row center crossCenter space='between'>
        <AntDesign 
          name={toast.type === 'error' ? 
            'closecircleo' : toast.type === 'success' ? 
            `checkcircleo` : toast.type === 'warning' ? 
            'warning' : undefined!} 
          color={theme.brandColor.iconn_white}
          style={{marginLeft:16}}
          size={24}
        />
        <Animated.Text style={{opacity: fade, color: theme.brandColor.iconn_white, fontSize: 16, fontWeight: '400', letterSpacing: 0.3,}}> {toast.message}</Animated.Text>
        <TouchableOpacity onPress={hide} style={{marginRight: 16}}>
          <Ionicons name={`close-outline`} size={24} color={theme.brandColor.iconn_white} />
        </TouchableOpacity>
      </Container>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    display: 'flex',
    justifyContent: 'center',
    height: 59,
    borderRadius: 8,
    marginHorizontal: 16,
    position: 'absolute',
    top: 50,
    zIndex: 1,
    elevation: 1,
    right: 0,
    left: 0,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8
  }
});

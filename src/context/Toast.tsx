import React, {useContext, useEffect, useRef} from 'react';
import { ToastContext } from './toast.context';
import {
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export const Toast = () => {
  const {toast, hide} = useContext(ToastContext);
  const translateYRef = useRef(new Animated.Value(-100));

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: -100,
        useNativeDriver: true,
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {transform: [{translateY: translateYRef.current}]},
      ]}>
      <TouchableOpacity onPress={hide} style={styles.content}>
        <Text style={styles.toastMessage}> {toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    borderRadius: 4,
    marginHorizontal: 16,
    padding: 4,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    left: 0,
    backgroundColor: '#ff3f3f',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%',
  },
  toastMessage: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.26,
    marginHorizontal: 10,
  },
});


// const showToast = () => {
//   Toast.show(`✓       Cuenta creada exitosamente.       X`, {
//     duration: 8000,
//     position: Toast.positions.TOP,
//     shadow: false,
//     animation: true,
//     hideOnPress: true,
//     delay: 0,    
//     backgroundColor: theme.brandColor.iconn_success,
//     opacity: 1,    
//     containerStyle:{ paddingTop:19, width: '90%', height: 59, top: 24, borderRadius: 8, shadowColor: '#171717',
//                     shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.4, shadowRadius: 8 },
//     onShow: () => {
//         // calls on toast\`s appear animation start
//     },
//     onShown: () => {
//         // calls on toast\`s appear animation end.
//     },
//     onHide: () => {
//         // calls on toast\`s hide animation start.
//     },
//     onHidden: () => {
//         // calls on toast\`s hide animation end.
//     }
//   });
// }
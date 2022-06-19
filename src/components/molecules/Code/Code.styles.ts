import { Platform, StyleSheet } from 'react-native';
import theme from 'components/theme/theme'

export const getStyles = () => {  

  return StyleSheet.create({
    pin__container: {
      width: '100%',
    },
    pin__label: {
      marginBottom: 16,
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 20,
      color: theme.fontColor.dark,
    },
    pin__holder__container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pin__code__holder: {
      borderRadius: 8,
      width: 48,
      height: 48,
      marginRight: 8,
    },    
    pin__holder: {
      borderWidth: .5,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.brandColor.iconn_med_grey,
    },
    pin__holder__focus: {
      borderColor: theme.brandColor.iconn_accent_secondary,
    },
    pin__holder__error: {
      borderColor: theme.brandColor.iconn_error,
    },
    pin__holder__disabled: {
      borderColor: theme.brandColor.iconn_grey
    },
    pin: {
      flex: 1,
      textAlign: 'center',
      lineHeight: Platform.select({ ios: undefined, android: 20 }),
      color: theme.fontColor.dark,
      padding: 0,
    },
    pin__code: {
      height: 17,
      fontSize: Platform.select({ ios: 14, android: 20 }),
    },
    pin__verification: {
      fontSize: 12,
      letterSpacing: 0,
      lineHeight: 16,
      height: 32,
    },
    pin__verification__disabled: {
      backgroundColor: theme.brandColor.iconn_white,
    },
    pin__label__error: {
      color: theme.fontColor.dark,
    },
    pin__caption__container: {
      width: '100%',
      marginTop: 5
    },
    pin__caption: {
      fontSize: 12,
      letterSpacing: 0,
      lineHeight: 14
    },
    pin__caption__error: {
      color: theme.brandColor.iconn_error,
    }
  });
};

import React, { ReactNode } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, ViewStyle, StatusBarStyle, StyleProp } from 'react-native';
import theme from 'components/theme/theme';

type BarStyle = 'light' | 'dark';

interface Props {
  childrenContainerStyle?: StyleProp<ViewStyle>;
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  safeBGColor?: ViewStyle['backgroundColor'];
  bottomBGColor?: ViewStyle['backgroundColor'];
  topBGColor?: ViewStyle['backgroundColor'];
  children: ReactNode;
  barStyle?: BarStyle;
  backgroundColor?: ViewStyle['backgroundColor'];
  statusBarColor?: ViewStyle['backgroundColor'];
  hiddenStatusBar?: boolean;
  testID?: string;
}

const SafeArea: React.FC<Props> = ({
  topSafeArea = true,
  bottomSafeArea = true,
  safeBGColor,
  children,
  barStyle,
  backgroundColor = theme.brandColor.iconn_white,
  statusBarColor,
  hiddenStatusBar,
  testID,
  childrenContainerStyle
}: Props) => {
  const renderChildren = () => (
    <View testID={`${testID}-children`} style={[styles.childrenContainerStyle, { backgroundColor }, childrenContainerStyle]}>
      {children}
    </View>
  );

  const renderStatusBar = () => {
    let barStyleValue = 'default';

    switch (barStyle) {
      case 'light':
        barStyleValue = 'light-content';
        break;
      case 'dark':
        barStyleValue = 'dark-content';
        break;
      default:
        barStyleValue = 'default';
        break;
    }

    return (
      <StatusBar
        translucent={!topSafeArea}
        backgroundColor={!topSafeArea ? statusBarColor || 'transparent' : safeBGColor || theme.brandColor.iconn_white}
        barStyle={barStyleValue as StatusBarStyle}
        hidden={hiddenStatusBar}
      />
    );
  };

  const renderComponent = () => (
    <View testID={`${testID}-component`} style={styles.flexStyle}>
      {renderStatusBar()}
      {renderChildren()}
    </View>
  );

  const renderContainer = () => (
    <View testID={`${testID}-container`} style={styles.flexStyle}>
      {topSafeArea && (
        <SafeAreaView
          testID={`${testID}-top`}
          style={{
            backgroundColor: theme.brandColor.iconn_white || safeBGColor || backgroundColor
          }}
        />
      )}
      {renderComponent()}
      {bottomSafeArea && (
        <SafeAreaView
          testID={`${testID}-bottom`}
          style={{
            backgroundColor: theme.brandColor.iconn_white || safeBGColor || backgroundColor
          }}
        />
      )}
    </View>
  );

  return (
    <View testID={testID} style={styles.flexStyle}>
      {renderContainer()}
    </View>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1
  },
  childrenContainerStyle: {
    flex: 1,
    paddingHorizontal: theme.layoutSpace.medium
  }
});

export default SafeArea;

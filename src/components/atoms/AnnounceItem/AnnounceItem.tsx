import theme from 'components/theme/theme';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AnnounceItemProps {
  message: string | React.ReactNode;
  icon: React.ReactNode;
  withActionButton?: boolean;
  ActionButtonText?: string;
  onPressActionButton?: () => void;
}

const AnnounceItem = (props: AnnounceItemProps) => {
  const { message, icon, withActionButton, ActionButtonText, onPressActionButton } = props;
  return (
    <>
      {withActionButton ? (
        <View style={styles.container}>
          <View style={styles.actionButtonContent}>
            <View style={styles.icon}>{icon}</View>
            <View style={styles.message}>
              {typeof message === 'string' ? (
                <Text
                  style={{
                    fontSize: theme.fontSize.h4,
                    color: theme.fontColor.dark
                  }}
                >
                  {message}
                </Text>
              ) : (
                message
              )}
              <TouchableOpacity onPress={onPressActionButton}>
                <Text
                  style={{
                    marginTop: 8,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    color: theme.brandColor.iconn_orange_original,
                    fontSize: theme.fontSize.h4
                  }}
                >
                  {ActionButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.icon}>{icon}</View>
            <View style={styles.message}>
              <Text
                style={{
                  fontSize: theme.fontSize.h4,
                  color: theme.fontColor.dark
                }}
              >
                {message}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default AnnounceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10
  },
  content: {
    backgroundColor: '#F3E2CB',
    borderRadius: 4,
    flexDirection: 'row',
    width: '100%'
  },
  actionButtonContent: {
    backgroundColor: '#F3E2CB',
    borderRadius: 4,
    flexDirection: 'row',
    width: '100%',
    height: 82
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#faa22d',
    minHeight: 52,
    width: 52
  },
  message: {
    maxWidth: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
    paddingRight: 10
  }
});

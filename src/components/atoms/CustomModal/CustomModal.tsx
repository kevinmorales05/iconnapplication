import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View
} from 'react-native';

export interface CustomModalProps {
  visible: boolean;
  children: ReactNode;
  onDismiss?: () => void;
  backgroundOpacity?: number;
  testID?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onDismiss,
  children,
  backgroundOpacity = 0.4,
  testID
}: CustomModalProps) => {
  const backgroundColor = `rgba(0,0,0,${backgroundOpacity})`;

  if (onDismiss) {
    return (
      <Modal testID={testID} transparent visible={visible} animationType="fade" onDismiss={onDismiss}>
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={{ flex: 1 }}>
          <TouchableWithoutFeedback testID={`${testID}-touchable`} onPress={() => onDismiss && onDismiss()}>
            <View style={{ flex: 1, backgroundColor }}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <Modal testID={testID} transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor }}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CustomModal;

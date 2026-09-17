import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import { normaliseUnit } from '@/helpers/helpers';
interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export default function LoadingModal({
  visible,
  message = 'Please wait...',
}: LoadingModalProps) {
  const theme = useTheme();
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}} // Prevents Android back button from dismissing it //color="#3b82f6"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dim background
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: normaliseUnit(200),
    backgroundColor: 'white',
    padding: normaliseUnit(24),
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  text: {
    marginTop: normaliseUnit(16),
    fontSize: normaliseUnit(14),
    color: '#333',
    fontWeight: '500',
  },
});

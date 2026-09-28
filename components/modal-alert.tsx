import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Modal from 'react-native-modal';
import { PRIMARY_COLOR } from '@/constants';

interface AlertModalProps {
  isAlertVisible: boolean;
  message?: string;
  setIsAlertVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AlertModal({
  isAlertVisible,
  message = 'Please wait...',
  setIsAlertVisible,
}: AlertModalProps) {
  const theme = useTheme();
  const toggleModal = () => {
    setIsAlertVisible(!isAlertVisible);
  };

  return (
    <View style={styles.container}>
      {/* Trigger Button */}

      {/* react-native-modal Component */}
      <Modal
        isVisible={isAlertVisible}
        onBackdropPress={toggleModal} // Dismisses modal when clicking outside
        onBackButtonPress={toggleModal} // Dismisses modal on Android back hardware button
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>

          {/* Dismiss Button */}
          <TouchableOpacity style={styles.dismissButton} onPress={toggleModal}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'justify',
  },
  dismissButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  dismissButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

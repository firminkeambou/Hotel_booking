import {
  BaseToast,
  ErrorToast,
  type ToastConfig,
} from 'react-native-toast-message';
import { StyleSheet } from 'react-native';
import { normaliseUnit } from '@/helpers/helpers';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.toastContainer}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={[styles.toastContainer, { borderLeftColor: '#ff5252' }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    height: normaliseUnit(60), // Shrunk from default 60
    width: '90%', // Prevents stretching completely edge-to-edge
    borderLeftColor: '#69C779',
  },
  contentContainer: {
    paddingHorizontal: 12,
  },
  text1: {
    fontSize: normaliseUnit(14), // Smaller title font size
    fontWeight: '600',
  },
  text2: {
    fontSize: normaliseUnit(12), // Smaller description font size
    color: '#666',
  },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  DimensionValue,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { Image, ImageLoadEventData } from 'expo-image';

interface ProgressiveImageProps {
  borderRadius?: DimensionValue;
  borderTopRightRadius?: DimensionValue;
  borderBottomLeftRadius?: DimensionValue;
  borderBottomRightRadius?: DimensionValue;
  uri: string;
  width: DimensionValue; //
  height: DimensionValue; //
  // A pre-generated tiny hash string from your backend
  blurHash?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  borderRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  uri,
  width,
  height,
  blurHash = 'L6PZfSi_00%MHNkx~q_t00%MWBRj', // Default subtle gray/blur placeholder
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius, // ✅ Keeps the overall component rounded
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
        } as ViewStyle,
      ]}
    >
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        placeholder={blurHash} // Displays instantly while on a slow network
        contentFit="cover"
        transition={300} // Smooth cross-fade once downloaded
        cachePolicy="disk" // Forces aggressive disk caching for subsequent visits
        onLoadStart={() => {
          setIsLoading(true);
          setHasError(false);
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Optional: Show a subtle spinner over the blur effect for very slow connections */}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="small" color="#999999" />
        </View>
      )}

      {/* Fallback UI if the slow network completely times out or fails */}
      {hasError && (
        <View style={[styles.overlay, styles.errorBg]}>
          <Text style={styles.errorText}>Image unavailable</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBg: {
    backgroundColor: '#f2f2f2',
  },
  errorText: {
    fontSize: 12,
    color: '#888888',
  },
});

import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ReadOnlyRatingProps {
  /** The rating score (e.g., 3.7 or 4.5) */
  score: number;
  /** Total number of stars to display. Defaults to 5. */
  maxStars?: number;
  /** Size of the star typography. Defaults to 24. */
  size?: number;
  /** Active star color. Defaults to Material gold (#FFB400). */
  activeColor?: string;
  /** Inactive star color. Defaults to light gray (#E0E0E0). */
  inactiveColor?: string;
  /** Optional container style overrides. */
  containerStyle?: StyleProp<ViewStyle>;
}

export default function ReadOnlyRating({
  score,
  maxStars = 5,
  size = 24,
  activeColor = '#FFB400', 
  inactiveColor = '#E0E0E0',
  containerStyle,
}: ReadOnlyRatingProps) {
  
  // Enforce bounding limits on the incoming score
  const sanitizedScore = Math.max(0, Math.min(score, maxStars));
  
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    // Determine how much fill this specific star index gets
    const difference = sanitizedScore - (i - 1);
    
    // Dynamic styles based on text size and custom color definitions
    const baseStarStyle: StyleProp<TextStyle> = { fontSize: size, lineHeight: size };

    if (difference >= 1) {
      // 1. Fully active star
      stars.push(
        <Text key={i} style={[baseStarStyle, { color: activeColor }]}>★</Text>
      );
    } else if (difference >= 0.5) {
      // 2. Half Star implementation using standard visual layout stacking
      stars.push(
        <View key={i} style={{ width: size, height: size }}>
          {/* Gray Background Star */}
          <Text style={[baseStarStyle, styles.absoluteStar, { color: inactiveColor }]}>☆</Text>
          {/* Masked Colored Star clipped cleanly in half */}
          <View style={[styles.absoluteStar, { width: size / 2, overflow: 'hidden' }]}>
            <Text style={[baseStarStyle, { color: activeColor }]}>★</Text>
          </View>
        </View>
      );
    } else {
      // 3. Completely empty star
      stars.push(
        <Text key={i} style={[baseStarStyle, { color: inactiveColor }]}>☆</Text>
      );
    }
  }

  return (
    <View style={[styles.row, containerStyle]}>
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // Clean structural spacing 
  },
  absoluteStar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

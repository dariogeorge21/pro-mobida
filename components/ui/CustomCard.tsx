import React from 'react';
import { StyleSheet, View, ViewProps, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { theme } from '@/styles/theme';

interface CustomCardProps extends ViewProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: any;
  activeScale?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CustomCard({
  children,
  onPress,
  style,
  activeScale = 0.98,
  ...props
}: CustomCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [],
    };
  });

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        style={[styles.card, style, animatedStyle]}
        android_ripple={{ color: theme.colors.primary.transparent, borderless: false }}
        {...props}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
});
import React from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/styles/theme';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline' | 'ghost';
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function IconButton({
  icon,
  onPress,
  size = 'md',
  variant = 'ghost',
  color = theme.colors.primary.main,
  style,
  disabled = false,
}: IconButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.92, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return styles.smallButton;
      case 'lg':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'filled':
        return { backgroundColor: color };
      case 'outline':
        return { 
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: color,
        };
      default:
        return { 
          backgroundColor: 'transparent' 
        };
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        getButtonSize(),
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
        animatedStyle,
      ]}
      android_ripple={{ 
        color: variant === 'filled' ? 'rgba(255, 255, 255, 0.2)' : theme.colors.primary.transparent,
        borderless: false,
      }}
    >
      {icon}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.rounded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    width: 32,
    height: 32,
  },
  mediumButton: {
    width: 40,
    height: 40,
  },
  largeButton: {
    width: 48,
    height: 48,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
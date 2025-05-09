import React from 'react';
import { StyleSheet, Text, Pressable, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/styles/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineButton;
      case 'ghost':
        return styles.ghostButton;
      default:
        return styles.defaultButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return styles.outlineText;
      default:
        return styles.defaultText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.smallButton;
      case 'lg':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'default' ? 'white' : theme.colors.primary.main} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text 
            style={[
              styles.text, 
              getTextStyle(), 
              disabled && styles.disabledText,
              textStyle
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </>
  );

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.button,
        getSizeStyle(),
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
        animatedStyle,
      ]}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: false }}
    >
      {variant === 'default' ? (
        <LinearGradient
          colors={[theme.colors.primary.light, theme.colors.primary.main, theme.colors.primary.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, getSizeStyle()]}
        >
          {buttonContent}
        </LinearGradient>
      ) : (
        buttonContent
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.rounded,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.rounded,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultButton: {
    backgroundColor: theme.colors.primary.main,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary.main,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 36,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 44,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    height: 52,
  },
  text: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    textAlign: 'center',
  },
  defaultText: {
    color: 'white',
  },
  outlineText: {
    color: theme.colors.primary.main,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
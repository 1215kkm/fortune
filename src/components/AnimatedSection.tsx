import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  animationType?: 'fade' | 'slideUp' | 'slideLeft' | 'scale';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  duration = 400,
  style,
  animationType = 'slideUp',
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const translateX = useRef(new Animated.Value(-30)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ];

    switch (animationType) {
      case 'slideUp':
        animations.push(
          Animated.spring(translateY, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          })
        );
        break;
      case 'slideLeft':
        animations.push(
          Animated.spring(translateX, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          })
        );
        break;
      case 'scale':
        animations.push(
          Animated.spring(scale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          })
        );
        break;
    }

    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel(animations),
    ]).start();
  }, [delay, duration, animationType]);

  const getTransformStyle = () => {
    switch (animationType) {
      case 'slideUp':
        return { transform: [{ translateY }] };
      case 'slideLeft':
        return { transform: [{ translateX }] };
      case 'scale':
        return { transform: [{ scale }] };
      default:
        return {};
    }
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          ...getTransformStyle(),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

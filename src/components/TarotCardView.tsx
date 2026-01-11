import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { DrawnCard } from '../types';

interface TarotCardViewProps {
  drawnCard: DrawnCard;
  initiallyRevealed?: boolean;
  onReveal?: () => void;
  delay?: number;
}

export const TarotCardView: React.FC<TarotCardViewProps> = ({
  drawnCard,
  initiallyRevealed = false,
  onReveal,
  delay = 0,
}) => {
  const { card, isReversed, position } = drawnCard;
  const [revealed, setRevealed] = useState(initiallyRevealed);

  // 애니메이션 값
  const flipAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // 초기 등장 애니메이션
  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay]);

  // 카드 뒤집기 핸들러
  const handleFlip = () => {
    if (revealed) return;

    // 뒤집기 애니메이션
    Animated.sequence([
      // 먼저 살짝 위로 올리고 흔들기
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      // 뒤집기
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // 원래 크기로
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setRevealed(true);
      onReveal?.();
    });
  };

  // 뒤집기 인터폴레이션
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '90deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['90deg', '90deg', '0deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      {/* 카드 뒷면 (숨겨진 상태) */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: frontOpacity,
            transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            position: revealed ? 'absolute' : 'relative',
          },
        ]}
        pointerEvents={revealed ? 'none' : 'auto'}
      >
        <TouchableOpacity
          style={styles.hiddenCard}
          onPress={handleFlip}
          activeOpacity={0.8}
        >
          <Text style={styles.positionLabelHidden}>{position}</Text>
          <View style={styles.cardBackDesign}>
            <Text style={styles.hiddenSymbol}>✨</Text>
            <View style={styles.mysteryPattern}>
              <Text style={styles.patternText}>🌙</Text>
              <Text style={styles.patternText}>⭐</Text>
              <Text style={styles.patternText}>🌙</Text>
            </View>
            <Text style={styles.hiddenSymbol}>✨</Text>
          </View>
          <Text style={styles.hiddenText}>탭하여 공개</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 카드 앞면 (공개된 상태) */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: backOpacity,
            transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
          },
        ]}
        pointerEvents={revealed ? 'auto' : 'none'}
      >
        <View style={styles.container}>
          <Text style={styles.positionLabel}>{position}</Text>

          <View style={[styles.card, isReversed && styles.reversedCard]}>
            <Text style={[styles.symbol, isReversed && styles.reversedSymbol]}>
              {card.symbol}
            </Text>
            <Text style={styles.name}>{card.nameKo}</Text>
            <Text style={styles.nameEn}>{card.name}</Text>
          </View>

          <View style={styles.directionBadge}>
            <Text style={styles.directionText}>
              {isReversed ? '역방향 ↓' : '정방향 ↑'}
            </Text>
          </View>

          <View style={styles.meaningContainer}>
            <Text style={styles.meaningLabel}>의미</Text>
            <Text style={styles.meaning}>
              {isReversed ? card.meaning.reversed : card.meaning.upright}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{card.description}</Text>
          </View>

          <View style={styles.elementBadge}>
            <Text style={styles.elementText}>{card.element} 원소</Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  cardContainer: {
    backfaceVisibility: 'hidden',
  },
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  hiddenCard: {
    backgroundColor: '#2A2A4A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366F1',
    minHeight: 220,
    justifyContent: 'center',
  },
  cardBackDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mysteryPattern: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  patternText: {
    fontSize: 24,
    opacity: 0.7,
  },
  hiddenSymbol: {
    fontSize: 36,
    opacity: 0.8,
  },
  hiddenText: {
    color: '#9999CC',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  positionLabelHidden: {
    fontSize: 14,
    color: '#AB47BC',
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  positionLabel: {
    fontSize: 12,
    color: '#AB47BC',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#252540',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  reversedCard: {
    backgroundColor: '#3A2A40',
  },
  symbol: {
    fontSize: 60,
    marginBottom: 12,
  },
  reversedSymbol: {
    transform: [{ rotate: '180deg' }],
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nameEn: {
    fontSize: 12,
    color: '#8888AA',
  },
  directionBadge: {
    backgroundColor: '#3D3D5C',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  directionText: {
    color: '#E0E0FF',
    fontSize: 13,
    fontWeight: '600',
  },
  meaningContainer: {
    width: '100%',
    marginBottom: 12,
  },
  meaningLabel: {
    fontSize: 11,
    color: '#8888AA',
    marginBottom: 6,
  },
  meaning: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 24,
  },
  descriptionContainer: {
    width: '100%',
    backgroundColor: '#252538',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#B0B0CC',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  elementBadge: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  elementText: {
    fontSize: 11,
    color: '#8888AA',
  },
});

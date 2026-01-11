import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { DrawnCard } from '../types';

interface TarotCardViewProps {
  drawnCard: DrawnCard;
  revealed?: boolean;
  onReveal?: () => void;
}

export const TarotCardView: React.FC<TarotCardViewProps> = ({
  drawnCard,
  revealed = true,
  onReveal,
}) => {
  const { card, isReversed, position } = drawnCard;

  if (!revealed) {
    return (
      <TouchableOpacity style={styles.hiddenCard} onPress={onReveal}>
        <Text style={styles.hiddenSymbol}>🎴</Text>
        <Text style={styles.hiddenText}>탭하여 공개</Text>
        <Text style={styles.positionLabel}>{position}</Text>
      </TouchableOpacity>
    );
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  hiddenCard: {
    backgroundColor: '#2A2A4A',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#4A4A7A',
    borderStyle: 'dashed',
    minHeight: 180,
    justifyContent: 'center',
  },
  hiddenSymbol: {
    fontSize: 50,
    marginBottom: 10,
  },
  hiddenText: {
    color: '#8888AA',
    fontSize: 14,
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

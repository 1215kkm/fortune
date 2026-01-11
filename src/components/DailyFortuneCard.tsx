import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DailyFortune } from '../types';

interface DailyFortuneCardProps {
  fortune: DailyFortune;
  compact?: boolean;
  onPress?: () => void;
}

export const DailyFortuneCard: React.FC<DailyFortuneCardProps> = ({
  fortune,
  compact = false,
  onPress,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#7C4DFF';
    return '#FFA726';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 80) return '✨';
    if (score >= 70) return '☀️';
    if (score >= 60) return '🌤️';
    return '🌥️';
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={onPress}>
        <View style={styles.compactHeader}>
          <Text style={styles.compactEmoji}>{getScoreEmoji(fortune.overall.score)}</Text>
          <View style={styles.compactInfo}>
            <Text style={styles.compactTitle}>오늘의 운세</Text>
            <Text style={styles.compactDate}>{fortune.date}</Text>
          </View>
          <View style={[styles.compactScore, { backgroundColor: getScoreColor(fortune.overall.score) }]}>
            <Text style={styles.compactScoreText}>{fortune.overall.score}</Text>
          </View>
        </View>
        <Text style={styles.compactMessage}>{fortune.overall.message}</Text>
        <View style={styles.compactLucky}>
          <Text style={styles.compactLuckyText}>🍀 {fortune.luckyItem}</Text>
          <Text style={styles.compactLuckyText}>🎨 {fortune.luckyColor}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{fortune.date}</Text>
        <Text style={styles.title}>오늘의 운세</Text>
      </View>

      {/* 전체운 */}
      <View style={styles.overallSection}>
        <View style={styles.overallHeader}>
          <Text style={styles.overallEmoji}>{getScoreEmoji(fortune.overall.score)}</Text>
          <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(fortune.overall.score) }]}>
            <Text style={styles.scoreText}>{fortune.overall.score}점</Text>
          </View>
        </View>
        <Text style={styles.overallMessage}>{fortune.overall.message}</Text>
        <Text style={styles.overallDetail}>{fortune.overall.detail}</Text>
      </View>

      {/* 카테고리별 */}
      <View style={styles.categoriesSection}>
        {fortune.categories.map((cat, index) => (
          <View key={index} style={styles.categoryRow}>
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryName}>{cat.name}</Text>
            <View style={[styles.categoryScoreBar, { backgroundColor: '#2A2A4A' }]}>
              <View
                style={[
                  styles.categoryScoreFill,
                  { width: `${cat.score}%`, backgroundColor: getScoreColor(cat.score) }
                ]}
              />
            </View>
            <Text style={[styles.categoryScore, { color: getScoreColor(cat.score) }]}>
              {cat.score}
            </Text>
          </View>
        ))}
      </View>

      {/* 행운 아이템 */}
      <View style={styles.luckySection}>
        <View style={styles.luckyItem}>
          <Text style={styles.luckyLabel}>🍀 행운 아이템</Text>
          <Text style={styles.luckyValue}>{fortune.luckyItem}</Text>
        </View>
        <View style={styles.luckyItem}>
          <Text style={styles.luckyLabel}>🎨 행운 색상</Text>
          <Text style={styles.luckyValue}>{fortune.luckyColor}</Text>
        </View>
      </View>

      {/* 조언 */}
      <View style={styles.adviceSection}>
        <Text style={styles.adviceText}>💬 {fortune.advice}</Text>
      </View>

      {/* 솔직한 안내 */}
      <View style={styles.honestSection}>
        <Text style={styles.honestText}>⚠️ {fortune.honestNote}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  date: {
    fontSize: 12,
    color: '#8888AA',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  overallSection: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
    marginBottom: 16,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  scoreBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  overallMessage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  overallDetail: {
    fontSize: 14,
    color: '#B0B0CC',
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesSection: {
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 18,
    width: 28,
  },
  categoryName: {
    fontSize: 14,
    color: '#B0B0CC',
    width: 70,
  },
  categoryScoreBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  categoryScoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryScore: {
    fontSize: 14,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  luckySection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  luckyItem: {
    flex: 1,
    backgroundColor: '#252540',
    borderRadius: 12,
    padding: 12,
  },
  luckyLabel: {
    fontSize: 12,
    color: '#8888AA',
    marginBottom: 4,
  },
  luckyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  adviceSection: {
    backgroundColor: '#252540',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  adviceText: {
    fontSize: 14,
    color: '#E0E0FF',
    lineHeight: 22,
  },
  honestSection: {
    backgroundColor: '#2A2A3E',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFA72620',
  },
  honestText: {
    fontSize: 12,
    color: '#FFA726',
    textAlign: 'center',
  },
  // Compact styles
  compactContainer: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  compactEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  compactDate: {
    fontSize: 12,
    color: '#8888AA',
  },
  compactScore: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  compactMessage: {
    fontSize: 15,
    color: '#E0E0FF',
    marginBottom: 10,
  },
  compactLucky: {
    flexDirection: 'row',
    gap: 16,
  },
  compactLuckyText: {
    fontSize: 13,
    color: '#8888AA',
  },
});

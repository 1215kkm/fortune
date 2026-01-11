import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HonestAdvice } from '../types';

interface HonestAdviceCardProps {
  advice: HonestAdvice;
}

export const HonestAdviceCard: React.FC<HonestAdviceCardProps> = ({ advice }) => {
  const getTypeColor = () => {
    switch (advice.타입) {
      case 'ambiguous':
        return '#FFA726'; // 주황
      case 'choice_matters':
        return '#42A5F5'; // 파랑
      case 'fortune_based':
        return '#AB47BC'; // 보라
      default:
        return '#78909C';
    }
  };

  const getTypeLabel = () => {
    switch (advice.타입) {
      case 'ambiguous':
        return '사주로 보기 애매함';
      case 'choice_matters':
        return '운보다 선택 비중이 큼';
      case 'fortune_based':
        return '운세 기반 해석';
      default:
        return '';
    }
  };

  return (
    <View style={[styles.container, { borderLeftColor: getTypeColor() }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{advice.아이콘}</Text>
        <View style={styles.headerText}>
          <Text style={styles.subject}>{advice.주제}</Text>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor() + '30' }]}>
            <Text style={[styles.typeText, { color: getTypeColor() }]}>
              {getTypeLabel()}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.content}>{advice.내용}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: '#B0B0CC',
  },
});

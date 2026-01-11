import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { 오행색상, 오행이모지 } from '../data/saju';

interface ElementChartProps {
  distribution: Record<string, number>;
}

export const ElementChart: React.FC<ElementChartProps> = ({ distribution }) => {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...Object.values(distribution), 1);

  const elements = ['목', '화', '토', '금', '수'];
  const elementNames: Record<string, string> = {
    '목': '木 나무',
    '화': '火 불',
    '토': '土 흙',
    '금': '金 쇠',
    '수': '水 물',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오행 분포</Text>
      <Text style={styles.subtitle}>당신의 사주에 담긴 에너지 비율</Text>

      <View style={styles.chartContainer}>
        {elements.map((element) => {
          const count = distribution[element] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const barWidth = (count / maxCount) * 100;

          return (
            <View key={element} style={styles.barRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.emoji}>{오행이모지[element]}</Text>
                <Text style={styles.elementName}>{elementNames[element]}</Text>
              </View>

              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${barWidth}%`,
                      backgroundColor: 오행색상[element],
                    },
                  ]}
                />
                <Text style={styles.count}>{count}개</Text>
              </View>

              <Text style={[styles.percentage, { color: 오행색상[element] }]}>
                {percentage.toFixed(0)}%
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>오행이란?</Text>
        <Text style={styles.legendText}>
          동양 철학에서 세상을 구성하는 5가지 에너지입니다.{'\n'}
          목(성장) → 화(표현) → 토(안정) → 금(정리) → 수(지혜){'\n'}
          이 순환이 상생(相生)이고, 서로 견제하는 관계가 상극(相剋)입니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#8888AA',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  labelContainer: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 18,
    marginRight: 6,
  },
  elementName: {
    fontSize: 12,
    color: '#B0B0CC',
  },
  barContainer: {
    flex: 1,
    height: 24,
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  bar: {
    height: '100%',
    borderRadius: 12,
    minWidth: 8,
  },
  count: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  percentage: {
    width: 40,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '700',
  },
  legend: {
    backgroundColor: '#252538',
    borderRadius: 12,
    padding: 14,
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E0E0FF',
    marginBottom: 8,
  },
  legendText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8888AA',
  },
});

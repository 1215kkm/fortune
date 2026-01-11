import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EnvironmentReaction } from '../types';

interface EnvironmentReactionCardProps {
  reaction: EnvironmentReaction;
  index: number;
}

export const EnvironmentReactionCard: React.FC<EnvironmentReactionCardProps> = ({ reaction, index }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
  const color = colors[index % colors.length];

  return (
    <View style={styles.container}>
      <View style={[styles.situationBadge, { backgroundColor: color + '30' }]}>
        <Text style={[styles.situationText, { color }]}>📍 {reaction.상황}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>반응 경향</Text>
          <Text style={styles.value}>{reaction.반응경향}</Text>
        </View>

        <View style={styles.reasonBox}>
          <Text style={styles.reasonLabel}>왜 그럴까?</Text>
          <Text style={styles.reasonText}>{reaction.이유}</Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>💡 팁</Text>
          <Text style={styles.tipText}>{reaction.팁}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252538',
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  situationBadge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  situationText: {
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#8888AA',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 22,
  },
  reasonBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  reasonLabel: {
    fontSize: 12,
    color: '#AB47BC',
    fontWeight: '600',
    marginBottom: 6,
  },
  reasonText: {
    fontSize: 14,
    color: '#D0D0E0',
    lineHeight: 20,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2A3A2A',
    borderRadius: 8,
    padding: 12,
  },
  tipLabel: {
    fontSize: 12,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#90EE90',
    lineHeight: 20,
  },
});

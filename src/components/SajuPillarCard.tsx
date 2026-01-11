import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SajuPillar } from '../types';
import { 오행색상, 오행이모지 } from '../data/saju';

interface SajuPillarCardProps {
  pillar: SajuPillar | null;
  label: string;
  isMainPillar?: boolean;
}

export const SajuPillarCard: React.FC<SajuPillarCardProps> = ({
  pillar,
  label,
  isMainPillar = false,
}) => {
  if (!pillar) {
    return (
      <View style={[styles.container, styles.unknownContainer]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.unknown}>?</Text>
        <Text style={styles.unknownText}>시간 미상</Text>
      </View>
    );
  }

  const color = 오행색상[pillar.오행];

  return (
    <View
      style={[
        styles.container,
        isMainPillar && styles.mainContainer,
        { borderColor: color },
      ]}
    >
      <Text style={styles.label}>{label}</Text>

      <View style={styles.pillarContent}>
        <View style={[styles.ganContainer, { backgroundColor: color + '30' }]}>
          <Text style={[styles.gan, { color }]}>{pillar.천간}</Text>
          <Text style={styles.ganLabel}>천간</Text>
        </View>

        <View style={styles.jiContainer}>
          <Text style={styles.ji}>{pillar.지지}</Text>
          <Text style={styles.jiLabel}>지지</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.emoji}>{오행이모지[pillar.오행]}</Text>
        <Text style={[styles.element, { color }]}>{pillar.오행}</Text>
        <Text style={styles.yinyang}>{pillar.음양}</Text>
      </View>

      {isMainPillar && (
        <View style={styles.mainBadge}>
          <Text style={styles.mainBadgeText}>일간</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    minWidth: 75,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mainContainer: {
    backgroundColor: '#252540',
    transform: [{ scale: 1.05 }],
  },
  unknownContainer: {
    justifyContent: 'center',
    borderColor: '#3D3D5C',
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 12,
    color: '#8888AA',
    marginBottom: 10,
  },
  pillarContent: {
    alignItems: 'center',
  },
  ganContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gan: {
    fontSize: 24,
    fontWeight: '700',
  },
  ganLabel: {
    fontSize: 8,
    color: '#8888AA',
    position: 'absolute',
    bottom: -12,
  },
  jiContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  ji: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  jiLabel: {
    fontSize: 8,
    color: '#8888AA',
    marginTop: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  emoji: {
    fontSize: 14,
  },
  element: {
    fontSize: 13,
    fontWeight: '600',
  },
  yinyang: {
    fontSize: 11,
    color: '#8888AA',
  },
  unknown: {
    fontSize: 36,
    color: '#5A5A7A',
    fontWeight: '300',
  },
  unknownText: {
    fontSize: 10,
    color: '#5A5A7A',
    marginTop: 8,
  },
  mainBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  mainBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E1E2E',
  },
});

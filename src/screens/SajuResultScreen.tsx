import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { SajuPillarCard } from '../components/SajuPillarCard';
import { ElementChart } from '../components/ElementChart';
import { EnvironmentReactionCard } from '../components/EnvironmentReactionCard';
import { HonestAdviceCard } from '../components/HonestAdviceCard';
import { PrincipleCard } from '../components/PrincipleCard';
import { sajuPrinciple } from '../services/sajuService';
import { 일간성향 } from '../data/saju';

type RouteType = RouteProp<RootStackParamList, 'SajuResult'>;

export const SajuResultScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation();
  const { userInfo, result } = route.params;

  const 일간정보 = 일간성향[result.일간];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.name}>{userInfo.name}님의 사주</Text>
          <Text style={styles.birthInfo}>
            {userInfo.birthDate.getFullYear()}년{' '}
            {userInfo.birthDate.getMonth() + 1}월{' '}
            {userInfo.birthDate.getDate()}일
            {userInfo.birthTime !== 'unknown' && ` ${userInfo.birthTime}`}
          </Text>
        </View>

        {/* 사주 팔자 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📜 사주 팔자 (四柱八字)</Text>
          <View style={styles.pillarsContainer}>
            <SajuPillarCard pillar={result.시주} label="시주" />
            <SajuPillarCard pillar={result.일주} label="일주" isMainPillar />
            <SajuPillarCard pillar={result.월주} label="월주" />
            <SajuPillarCard pillar={result.년주} label="년주" />
          </View>
          <Text style={styles.pillarsNote}>
            ← 시간 | 일(나) | 월 | 년 →
          </Text>
        </View>

        {/* 일간 (나의 기본 에너지) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ 나의 기본 에너지</Text>
          <View style={styles.mainEnergyCard}>
            <Text style={styles.mainEnergy}>{result.일간}</Text>
            <Text style={styles.mainEnergyKeyword}>
              {일간정보?.키워드 || '분석 중'}
            </Text>
          </View>
          <Text style={styles.energyNote}>
            일간(日干)은 사주에서 "나 자신"을 대표합니다.{'\n'}
            단, 이것이 "당신의 정체성"이 아니라{'\n'}
            "기본적인 에너지 스타일"로 이해해주세요.
          </Text>
        </View>

        {/* 오행 분포 */}
        <View style={styles.section}>
          <ElementChart distribution={result.오행분포} />
        </View>

        {/* 환경 반응 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 환경별 반응 경향</Text>
          <Text style={styles.sectionSubtitle}>
            "당신은 이런 사람"이 아니라{'\n'}
            "이런 상황에서 이런 반응이 나오기 쉬움"
          </Text>
          {result.환경반응.map((reaction, index) => (
            <EnvironmentReactionCard key={index} reaction={reaction} index={index} />
          ))}
        </View>

        {/* 솔직한 조언 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 솔직한 조언</Text>
          {result.솔직한조언.map((advice, index) => (
            <HonestAdviceCard key={index} advice={advice} />
          ))}
        </View>

        {/* 원리 설명 */}
        <View style={styles.section}>
          <PrincipleCard
            title="이 결과가 나온 원리"
            content={result.운세해석.원리설명}
            icon="🔍"
          />
          <PrincipleCard
            title="사주(四柱)란?"
            content={sajuPrinciple}
            icon="📖"
          />
        </View>

        {/* 다시하기 버튼 */}
        <TouchableOpacity
          style={styles.againButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.againButtonText}>다시 분석하기</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            기억하세요: 사주는 경향성일 뿐, 운명이 아닙니다.{'\n'}
            당신의 선택이 사주보다 더 큰 영향을 줍니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121220',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  birthInfo: {
    fontSize: 14,
    color: '#8888AA',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E0E0FF',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#8888AA',
    marginBottom: 16,
    lineHeight: 20,
  },
  pillarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  pillarsNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#5A5A7A',
  },
  mainEnergyCard: {
    backgroundColor: '#252540',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  mainEnergy: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mainEnergyKeyword: {
    fontSize: 16,
    color: '#B0B0CC',
  },
  energyNote: {
    fontSize: 13,
    color: '#8888AA',
    lineHeight: 20,
    textAlign: 'center',
    backgroundColor: '#1A1A2E',
    padding: 14,
    borderRadius: 10,
  },
  againButton: {
    backgroundColor: '#3D3D6E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  againButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFA72620',
  },
  footerText: {
    fontSize: 13,
    color: '#FFA726',
    textAlign: 'center',
    lineHeight: 20,
  },
});

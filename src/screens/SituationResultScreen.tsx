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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getTodaySituationFortune } from '../data/situationFortune';
import { EnvironmentReactionCard } from '../components/EnvironmentReactionCard';
import { HonestAdviceCard } from '../components/HonestAdviceCard';

type RouteType = RouteProp<RootStackParamList, 'SituationResult'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SituationResultScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavigationProp>();
  const { situationId } = route.params;

  const result = getTodaySituationFortune(situationId);

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>결과를 불러올 수 없습니다</Text>
      </SafeAreaView>
    );
  }

  const { situation, fortune } = result;
  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.situationIcon}>{situation.icon}</Text>
          <Text style={styles.situationTitle}>{situation.title}</Text>
          <Text style={styles.dateText}>{dateString}의 운세</Text>
        </View>

        {/* 메인 결과 */}
        <View style={styles.resultCard}>
          <View style={styles.energyBadge}>
            <Text style={styles.energyText}>{fortune.energy}</Text>
          </View>
          <Text style={styles.mainMessage}>{fortune.message}</Text>
          <Text style={styles.detailText}>{fortune.detail}</Text>
        </View>

        {/* 환경 반응 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 환경 반응 경향</Text>
          <EnvironmentReactionCard reaction={fortune.환경반응} index={0} />
        </View>

        {/* 솔직한 조언 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 솔직한 조언</Text>
          <HonestAdviceCard advice={fortune.솔직한조언} />
        </View>

        {/* 원리 설명 */}
        <View style={styles.principleBox}>
          <Text style={styles.principleTitle}>🔬 이 결과의 원리</Text>
          <Text style={styles.principleText}>
            오늘 날짜({dateString})를 기반으로{'\n'}
            상황({situation.title})에 맞는 조언을 선택했습니다.{'\n\n'}
            <Text style={styles.highlight}>솔직한 한계:</Text>{'\n'}
            • 이것은 "예측"이 아니라 "일반적 조언"입니다{'\n'}
            • 날짜가 바뀌면 다른 결과가 나올 수 있습니다{'\n'}
            • 결과가 마음에 안 들면 무시해도 됩니다
          </Text>
        </View>

        {/* 질문 예시 */}
        <View style={styles.questionsBox}>
          <Text style={styles.questionsTitle}>이런 질문에 대한 답이었어요</Text>
          {situation.questions.map((q, i) => (
            <Text key={i} style={styles.questionText}>• {q}</Text>
          ))}
        </View>

        {/* 버튼들 */}
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.otherButtonText}>다른 상황 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.homeButtonText}>홈으로</Text>
        </TouchableOpacity>
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
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  situationIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  situationTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#8888AA',
  },
  resultCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#7C4DFF',
  },
  energyBadge: {
    backgroundColor: '#7C4DFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  energyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mainMessage: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#B0B0CC',
    textAlign: 'center',
    lineHeight: 22,
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
  principleBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
  },
  principleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7C4DFF',
    marginBottom: 12,
  },
  principleText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 22,
  },
  highlight: {
    color: '#FFA726',
    fontWeight: '600',
  },
  questionsBox: {
    backgroundColor: '#252538',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  questionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8888AA',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 22,
  },
  otherButton: {
    backgroundColor: '#3D3D6E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  otherButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3D3D6E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8888AA',
  },
});

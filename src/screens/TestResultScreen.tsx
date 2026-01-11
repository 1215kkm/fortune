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
import { EnvironmentReactionCard } from '../components/EnvironmentReactionCard';
import { HonestAdviceCard } from '../components/HonestAdviceCard';
import { PrincipleCard } from '../components/PrincipleCard';
import { getAllTests } from '../services/questionService';

type RouteType = RouteProp<RootStackParamList, 'TestResult'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TestResultScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavigationProp>();
  const { result, testTitle } = route.params;

  const allTests = getAllTests();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>{testTitle}</Text>
          <Text style={styles.title}>당신의 유형</Text>
        </View>

        {/* 결과 타입 */}
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{result.type.솔직한조언.아이콘}</Text>
          <Text style={styles.resultTitle}>{result.type.title}</Text>
          <Text style={styles.resultDescription}>{result.type.description}</Text>
        </View>

        {/* 환경 반응 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 환경별 반응 경향</Text>
          <Text style={styles.sectionSubtitle}>
            "당신은 항상 이렇다"가 아니라{'\n'}
            "이런 상황에서 이런 경향이 있을 수 있음"
          </Text>
          {result.type.환경반응.map((reaction, index) => (
            <EnvironmentReactionCard key={index} reaction={reaction} index={index} />
          ))}
        </View>

        {/* 솔직한 조언 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 솔직한 한마디</Text>
          <HonestAdviceCard advice={result.type.솔직한조언} />
        </View>

        {/* 원리 설명 */}
        <View style={styles.section}>
          <PrincipleCard
            title="이 결과가 나온 원리"
            content={result.원리설명}
            icon="🔍"
          />
        </View>

        {/* 안내 */}
        <View style={styles.reminderBox}>
          <Text style={styles.reminderTitle}>🌟 기억하세요</Text>
          <Text style={styles.reminderText}>
            이 결과는 5개 질문에 대한 당신의 "자기 인식"을 반영합니다.{'\n'}
            실제 행동과 다를 수 있고, 상황에 따라 달라집니다.{'\n\n'}
            결과가 마음에 안 들면 무시해도 됩니다.{'\n'}
            당신이 당신을 더 잘 압니다.
          </Text>
        </View>

        {/* 다른 테스트 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 다른 테스트도 해볼까요?</Text>
          <View style={styles.otherTests}>
            {allTests
              .filter(t => t.title !== testTitle)
              .map((test) => (
                <TouchableOpacity
                  key={test.id}
                  style={styles.otherTestCard}
                  onPress={() => navigation.replace('QuestionTest', { testId: test.id })}
                >
                  <Text style={styles.otherTestTitle}>{test.title}</Text>
                  <Text style={styles.otherTestDesc}>{test.description}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* 홈으로 */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#8888AA',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  resultEmoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 15,
    color: '#B0B0CC',
    textAlign: 'center',
    lineHeight: 24,
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
  reminderBox: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2196F320',
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 22,
  },
  otherTests: {
    gap: 12,
  },
  otherTestCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  otherTestTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  otherTestDesc: {
    fontSize: 13,
    color: '#8888AA',
  },
  homeButton: {
    backgroundColor: '#3D3D6E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

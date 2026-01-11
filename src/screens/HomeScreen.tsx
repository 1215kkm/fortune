import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const features = [
    {
      id: 'saju',
      title: '사주 분석',
      emoji: '🌳',
      description: '생년월일시로 보는 환경 반응 경향',
      color: '#4CAF50',
      screen: 'UserInput' as const,
    },
    {
      id: 'tarot',
      title: '타로 리딩',
      emoji: '🎴',
      description: '카드가 던지는 질문에 귀 기울이기',
      color: '#9C27B0',
      screen: 'TarotReading' as const,
    },
    {
      id: 'question',
      title: '질문형 운세',
      emoji: '🧠',
      description: '나를 알아가는 심리 테스트',
      color: '#2196F3',
      screen: 'QuestionTest' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>운명의 거울</Text>
          <Text style={styles.subtitle}>
            당신의 "팔자"가 아닌{'\n'}
            "환경 반응 경향"을 알아봅니다
          </Text>
        </View>

        <View style={styles.philosophyCard}>
          <Text style={styles.philosophyTitle}>🔮 이 앱의 철학</Text>
          <Text style={styles.philosophyText}>
            • "당신은 원래 이런 팔자" ❌{'\n'}
            • "이 환경에 놓이면 이런 반응이 나오기 쉬움" ✅{'\n\n'}
            솔직함이 우리의 차별점입니다.{'\n'}
            "이건 사주로 보기 애매함",{'\n'}
            "이건 운보다 선택 비중이 큼"도 말해드립니다.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.featureCard, { borderColor: feature.color }]}
              onPress={() => {
                if (feature.screen === 'QuestionTest') {
                  navigation.navigate('QuestionTest', { testId: 'stress-response' });
                } else {
                  navigation.navigate(feature.screen as any);
                }
              }}
            >
              <View style={[styles.featureEmoji, { backgroundColor: feature.color + '20' }]}>
                <Text style={styles.emoji}>{feature.emoji}</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.honestCard}>
          <Text style={styles.honestTitle}>💬 솔직한 안내</Text>
          <Text style={styles.honestText}>
            사주, 타로, 심리 테스트는 과학적으로 검증된 것이 아닙니다.{'\n'}
            자기 이해의 도구로 활용하되, 중요한 결정은 스스로 내리세요.{'\n'}
            운세보다 당신의 선택이 더 큰 비중을 차지합니다.
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
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#B0B0CC',
    textAlign: 'center',
    lineHeight: 22,
  },
  philosophyCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  philosophyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E0E0FF',
    marginBottom: 12,
  },
  philosophyText: {
    fontSize: 14,
    color: '#B0B0CC',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  featureEmoji: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 26,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#8888AA',
  },
  arrow: {
    fontSize: 20,
    color: '#5A5A7A',
  },
  honestCard: {
    backgroundColor: '#2A2A3E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFA72620',
  },
  honestTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFA726',
    marginBottom: 10,
  },
  honestText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 20,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getTestById, generateTestResult, testPrinciple } from '../services/questionService';
import { PrincipleCard } from '../components/PrincipleCard';

type RouteType = RouteProp<RootStackParamList, 'QuestionTest'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const QuestionTestScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavigationProp>();
  const { testId } = route.params;

  const test = getTestById(testId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showIntro, setShowIntro] = useState(true);

  if (!test) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>테스트를 찾을 수 없습니다</Text>
      </SafeAreaView>
    );
  }

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 계산
      const result = generateTestResult(testId, newAnswers);
      if (result) {
        navigation.navigate('TestResult', { result, testTitle: test.title });
      }
    }
  };

  if (showIntro) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.introContainer}>
            <Text style={styles.introEmoji}>🧠</Text>
            <Text style={styles.introTitle}>{test.title}</Text>
            <Text style={styles.introDescription}>{test.description}</Text>

            <View style={styles.introInfo}>
              <Text style={styles.introInfoText}>
                📝 {test.questions.length}개 질문{'\n'}
                ⏱️ 약 2-3분 소요
              </Text>
            </View>

            <View style={styles.honestNote}>
              <Text style={styles.honestNoteTitle}>💬 먼저 알아두세요</Text>
              <Text style={styles.honestNoteText}>
                이건 과학적 심리 검사가 아닙니다.{'\n'}
                재미와 자기 성찰 용도입니다.{'\n\n'}
                결과가 맞지 않다고 느끼면{'\n'}
                그냥 무시해도 됩니다.{'\n'}
                당신이 당신을 더 잘 압니다.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setShowIntro(false)}
            >
              <Text style={styles.startButtonText}>시작하기</Text>
            </TouchableOpacity>

            <PrincipleCard
              title="질문형 테스트의 원리"
              content={testPrinciple}
              icon="📖"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion + 1} / {test.questions.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.questionScrollContent}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Q{currentQuestion + 1}</Text>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(index)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {currentQuestion > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentQuestion(currentQuestion - 1)}
          >
            <Text style={styles.backButtonText}>← 이전 질문</Text>
          </TouchableOpacity>
        )}
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
  questionScrollContent: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  introContainer: {
    alignItems: 'center',
  },
  introEmoji: {
    fontSize: 60,
    marginBottom: 20,
    marginTop: 20,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: '#B0B0CC',
    textAlign: 'center',
    marginBottom: 24,
  },
  introInfo: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: '100%',
  },
  introInfoText: {
    fontSize: 14,
    color: '#8888AA',
    textAlign: 'center',
    lineHeight: 24,
  },
  honestNote: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    width: '100%',
  },
  honestNoteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 8,
  },
  honestNoteText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#2196F3',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2A2A3E',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#8888AA',
    textAlign: 'right',
  },
  questionContainer: {
    marginBottom: 30,
    marginTop: 20,
  },
  questionNumber: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '700',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  optionText: {
    fontSize: 16,
    color: '#E0E0FF',
    lineHeight: 24,
  },
  backButton: {
    marginTop: 24,
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: '#8888AA',
  },
});

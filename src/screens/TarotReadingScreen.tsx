import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { quickOneCardReading, threeCardReading, tarotPrinciple } from '../services/tarotService';
import { PrincipleCard } from '../components/PrincipleCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TarotReadingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<'single' | 'three'>('single');

  const handleReading = () => {
    if (!question.trim()) {
      Alert.alert('알림', '질문을 입력해주세요');
      return;
    }

    const reading = selectedSpread === 'single'
      ? quickOneCardReading(question.trim())
      : threeCardReading(question.trim());

    navigation.navigate('TarotResult', { reading });
  };

  const exampleQuestions = [
    '지금 내가 집중해야 할 것은?',
    '이 결정에서 고려해야 할 점은?',
    '현재 나의 상황을 어떻게 볼 수 있을까?',
    '새로운 시작을 위해 필요한 것은?',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>타로 리딩</Text>
          <Text style={styles.subtitle}>
            카드에게 질문을 던져보세요
          </Text>
        </View>

        <View style={styles.honestNote}>
          <Text style={styles.honestNoteTitle}>💬 먼저 알아두세요</Text>
          <Text style={styles.honestNoteText}>
            타로 카드는 무작위로 뽑힙니다.{'\n'}
            "운명적으로 이 카드가 나왔다"는 증명할 수 없습니다.{'\n\n'}
            카드의 가치는 "당신이 이 상징을 보고{'\n'}
            무엇을 생각하게 되는가"에 있습니다.
          </Text>
        </View>

        {/* 질문 입력 */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>질문</Text>
          <TextInput
            style={styles.textInput}
            value={question}
            onChangeText={setQuestion}
            placeholder="무엇이 궁금한가요?"
            placeholderTextColor="#5A5A7A"
            multiline
            numberOfLines={3}
          />
          <Text style={styles.inputTip}>
            💡 팁: "~할까요?" 보다 "~에서 고려할 점은?" 형태가 더 도움됩니다
          </Text>
        </View>

        {/* 예시 질문 */}
        <View style={styles.examplesSection}>
          <Text style={styles.label}>예시 질문</Text>
          <View style={styles.examplesContainer}>
            {exampleQuestions.map((q, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exampleChip}
                onPress={() => setQuestion(q)}
              >
                <Text style={styles.exampleText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 스프레드 선택 */}
        <View style={styles.spreadSection}>
          <Text style={styles.label}>리딩 방식</Text>
          <View style={styles.spreadOptions}>
            <TouchableOpacity
              style={[styles.spreadOption, selectedSpread === 'single' && styles.spreadOptionActive]}
              onPress={() => setSelectedSpread('single')}
            >
              <Text style={styles.spreadEmoji}>🎴</Text>
              <Text style={styles.spreadTitle}>원 카드</Text>
              <Text style={styles.spreadDesc}>핵심 메시지 하나</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.spreadOption, selectedSpread === 'three' && styles.spreadOptionActive]}
              onPress={() => setSelectedSpread('three')}
            >
              <Text style={styles.spreadEmoji}>🎴🎴🎴</Text>
              <Text style={styles.spreadTitle}>쓰리 카드</Text>
              <Text style={styles.spreadDesc}>과거 / 현재 / 미래</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 카드 뽑기 버튼 */}
        <TouchableOpacity style={styles.readButton} onPress={handleReading}>
          <Text style={styles.readButtonText}>카드 뽑기</Text>
        </TouchableOpacity>

        {/* 원리 설명 */}
        <PrincipleCard
          title="타로 카드의 원리"
          content={tarotPrinciple}
          icon="📖"
        />
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8888AA',
  },
  honestNote: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#AB47BC',
  },
  honestNoteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#AB47BC',
    marginBottom: 8,
  },
  honestNoteText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0E0FF',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3D3D5C',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputTip: {
    marginTop: 8,
    fontSize: 12,
    color: '#8888AA',
  },
  examplesSection: {
    marginBottom: 24,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleChip: {
    backgroundColor: '#252538',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  exampleText: {
    fontSize: 13,
    color: '#B0B0CC',
  },
  spreadSection: {
    marginBottom: 24,
  },
  spreadOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  spreadOption: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  spreadOptionActive: {
    borderColor: '#9C27B0',
    backgroundColor: '#2A2A4E',
  },
  spreadEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  spreadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  spreadDesc: {
    fontSize: 11,
    color: '#8888AA',
  },
  readButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  readButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

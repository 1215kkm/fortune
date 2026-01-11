import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { TarotCardView } from '../components/TarotCardView';
import { HonestAdviceCard } from '../components/HonestAdviceCard';
import { PrincipleCard } from '../components/PrincipleCard';

type RouteType = RouteProp<RootStackParamList, 'TarotResult'>;

export const TarotResultScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation();
  const { reading } = route.params;

  const [revealedCount, setRevealedCount] = useState(0);
  const interpretationOpacity = useRef(new Animated.Value(0)).current;
  const interpretationTranslate = useRef(new Animated.Value(30)).current;

  // 모든 카드가 공개되면 해석 표시
  useEffect(() => {
    if (revealedCount === reading.cards.length) {
      Animated.parallel([
        Animated.timing(interpretationOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(interpretationTranslate, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [revealedCount, reading.cards.length]);

  const handleCardReveal = () => {
    setRevealedCount((prev) => prev + 1);
  };

  const allCardsRevealed = revealedCount === reading.cards.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>리딩 결과</Text>
          <View style={styles.questionBox}>
            <Text style={styles.questionLabel}>질문</Text>
            <Text style={styles.question}>"{reading.question}"</Text>
          </View>
        </View>

        {/* 안내 메시지 */}
        {!allCardsRevealed && (
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              ✨ 카드를 탭하여 하나씩 공개하세요 ({revealedCount}/{reading.cards.length})
            </Text>
          </View>
        )}

        {/* 카드들 */}
        <View style={styles.cardsSection}>
          {reading.cards.map((drawnCard, index) => (
            <TarotCardView
              key={index}
              drawnCard={drawnCard}
              initiallyRevealed={false}
              onReveal={handleCardReveal}
              delay={index * 200}
            />
          ))}
        </View>

        {/* 해석 - 모든 카드가 공개된 후에만 표시 */}
        <Animated.View
          style={[
            styles.interpretationSection,
            {
              opacity: interpretationOpacity,
              transform: [{ translateY: interpretationTranslate }],
            },
          ]}
          pointerEvents={allCardsRevealed ? 'auto' : 'none'}
        >
          <Text style={styles.sectionTitle}>📝 해석</Text>
          <View style={styles.interpretationBox}>
            <Text style={styles.interpretation}>{reading.interpretation}</Text>
          </View>
        </Animated.View>

        {/* 솔직한 조언 (있는 경우) - 모든 카드가 공개된 후에만 표시 */}
        {reading.솔직한조언 && (
          <Animated.View
            style={[
              styles.section,
              {
                opacity: interpretationOpacity,
                transform: [{ translateY: interpretationTranslate }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>💬 솔직한 한마디</Text>
            <HonestAdviceCard advice={reading.솔직한조언} />
          </Animated.View>
        )}

        {/* 원리 설명 */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: interpretationOpacity,
              transform: [{ translateY: interpretationTranslate }],
            },
          ]}
        >
          <PrincipleCard
            title="왜 이 카드가 나왔을까?"
            content={reading.원리설명}
            icon="🔍"
          />
        </Animated.View>

        {/* 안내 */}
        <Animated.View
          style={[
            styles.reminderBox,
            {
              opacity: interpretationOpacity,
              transform: [{ translateY: interpretationTranslate }],
            },
          ]}
        >
          <Text style={styles.reminderTitle}>🌟 기억하세요</Text>
          <Text style={styles.reminderText}>
            카드는 "답"이 아니라 "질문"을 던집니다.{'\n'}
            이 상징들이 당신에게 무엇을 떠올리게 하나요?{'\n\n'}
            해석이 마음에 들지 않으면 무시해도 됩니다.{'\n'}
            당신의 직관이 카드보다 더 중요합니다.
          </Text>
        </Animated.View>

        {/* 다시하기 버튼 */}
        <Animated.View
          style={{
            opacity: interpretationOpacity,
            transform: [{ translateY: interpretationTranslate }],
          }}
        >
          <TouchableOpacity
            style={styles.againButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.againButtonText}>다른 질문하기</Text>
          </TouchableOpacity>
        </Animated.View>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  questionBox: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
  },
  questionLabel: {
    fontSize: 12,
    color: '#8888AA',
    marginBottom: 6,
  },
  question: {
    fontSize: 16,
    color: '#E0E0FF',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  cardsSection: {
    marginBottom: 24,
  },
  instructionBox: {
    backgroundColor: '#2A2A4A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  instructionText: {
    color: '#B0B0DD',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E0E0FF',
    marginBottom: 12,
  },
  interpretationSection: {
    marginBottom: 24,
  },
  interpretationBox: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  interpretation: {
    fontSize: 15,
    color: '#D0D0E0',
    lineHeight: 26,
  },
  reminderBox: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#9C27B020',
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9C27B0',
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 22,
  },
  againButton: {
    backgroundColor: '#3D3D6E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  againButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

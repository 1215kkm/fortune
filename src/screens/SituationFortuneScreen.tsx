import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getAllSituations } from '../data/situationFortune';
import { AnalysisLoading } from '../components/AnalysisLoading';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SituationFortuneScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const situations = getAllSituations();
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSituationPress = (situationId: string) => {
    setSelectedSituation(situationId);
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    if (selectedSituation) {
      setIsLoading(false);
      navigation.navigate('SituationResult', { situationId: selectedSituation });
      setSelectedSituation(null);
    }
  };

  if (isLoading) {
    return <AnalysisLoading type="situation" onComplete={handleLoadingComplete} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>상황별 운세</Text>
          <Text style={styles.subtitle}>
            어떤 상황에 대해 알고 싶으신가요?
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerIcon}>💡</Text>
          <Text style={styles.disclaimerText}>
            상황별 운세는 일반적인 조언입니다.{'\n'}
            "운"보다 당신의 "선택"이 더 중요합니다.
          </Text>
        </View>

        <View style={styles.grid}>
          {situations.map((situation) => (
            <TouchableOpacity
              key={situation.id}
              style={styles.situationCard}
              onPress={() => handleSituationPress(situation.id)}
            >
              <Text style={styles.situationIcon}>{situation.icon}</Text>
              <Text style={styles.situationTitle}>{situation.title}</Text>
              <Text style={styles.situationDesc}>{situation.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.honestBox}>
          <Text style={styles.honestTitle}>🔔 솔직한 안내</Text>
          <Text style={styles.honestText}>
            • 금전운, 복권운 같은 건 없습니다{'\n'}
            • 중요한 결정은 운세로 하지 마세요{'\n'}
            • 이건 재미와 자기 성찰 용도입니다
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
    fontSize: 15,
    color: '#8888AA',
  },
  disclaimer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    alignItems: 'center',
  },
  disclaimerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  situationCard: {
    width: '48%',
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  situationIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  situationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  situationDesc: {
    fontSize: 12,
    color: '#8888AA',
    lineHeight: 18,
  },
  honestBox: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FFA72630',
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
    lineHeight: 22,
  },
});

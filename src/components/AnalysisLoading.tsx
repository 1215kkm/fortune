import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface AnalysisLoadingProps {
  type: 'saju' | 'tarot' | 'situation';
  onComplete: () => void;
}

const loadingSteps = {
  saju: [
    { text: '생년월일시를 천간지지로 변환 중...', icon: '📅' },
    { text: '사주팔자 배열 계산 중...', icon: '🔢' },
    { text: '오행 에너지 분포 분석 중...', icon: '🌊' },
    { text: '환경 반응 패턴 도출 중...', icon: '🔍' },
  ],
  tarot: [
    { text: '카드 에너지를 섞는 중...', icon: '🔮' },
    { text: '당신의 질문에 집중하는 중...', icon: '✨' },
    { text: '카드가 당신을 선택하는 중...', icon: '🎴' },
  ],
  situation: [
    { text: '상황 에너지를 분석 중...', icon: '🌟' },
    { text: '오늘의 기운을 읽는 중...', icon: '☯️' },
    { text: '최적의 조언을 찾는 중...', icon: '💡' },
  ],
};

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ type, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const steps = loadingSteps[type];

  useEffect(() => {
    const stepDuration = 3000 / steps.length;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          // Fade out and in animation
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0.3,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const step = steps[currentStep];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 메인 아이콘 */}
        <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
          <Text style={styles.icon}>{step.icon}</Text>
        </Animated.View>

        {/* 로딩 텍스트 */}
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          {step.text}
        </Animated.Text>

        {/* 프로그레스 바 */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: `${((currentStep + 1) / steps.length) * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} / {steps.length}
          </Text>
        </View>

        {/* 원리 설명 */}
        <View style={styles.principleBox}>
          <Text style={styles.principleTitle}>🔬 분석 원리</Text>
          {type === 'saju' && (
            <Text style={styles.principleText}>
              생년월일시를 음양오행 체계로 변환하여{'\n'}
              천간(天干)과 지지(地支)의 조합을 분석합니다.{'\n'}
              이것은 "운명"이 아닌 "에너지 경향성"입니다.
            </Text>
          )}
          {type === 'tarot' && (
            <Text style={styles.principleText}>
              타로는 무작위 선택에 의미를 부여하는 도구입니다.{'\n'}
              카드 자체에 마법은 없지만,{'\n'}
              해석 과정에서 자기 성찰이 일어납니다.
            </Text>
          )}
          {type === 'situation' && (
            <Text style={styles.principleText}>
              상황별 운세는 일반적인 조언의 형태입니다.{'\n'}
              "운"보다 당신의 "선택"이 더 중요합니다.{'\n'}
              참고만 하되, 결정은 스스로 하세요.
            </Text>
          )}
        </View>
      </View>

      {/* 하단 안내 */}
      <Text style={styles.disclaimer}>
        솔직한 안내: 이것은 통계적 예측이 아닌 전통적 해석 체계입니다
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121220',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#3D3D6E',
  },
  icon: {
    fontSize: 50,
  },
  loadingText: {
    fontSize: 18,
    color: '#E0E0FF',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 32,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#2A2A4A',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7C4DFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#8888AA',
    textAlign: 'center',
  },
  principleBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2A2A4A',
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
    textAlign: 'center',
  },
  disclaimer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 11,
    color: '#5A5A7A',
    textAlign: 'center',
  },
});

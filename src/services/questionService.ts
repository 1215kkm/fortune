import { questionTests, testPrinciple } from '../data/questionTests';
import { QuestionTest, TestResult, ResultType } from '../types';

// 모든 테스트 가져오기
export function getAllTests(): QuestionTest[] {
  return questionTests;
}

// 특정 테스트 가져오기
export function getTestById(testId: string): QuestionTest | undefined {
  return questionTests.find(test => test.id === testId);
}

// 점수 계산
export function calculateScores(
  testId: string,
  answers: Record<number, number>
): Record<string, number> {
  const test = getTestById(testId);
  if (!test) return {};

  const scores: Record<string, number> = {};

  test.questions.forEach((question, qIndex) => {
    const selectedOptionIndex = answers[question.id];
    if (selectedOptionIndex !== undefined) {
      const option = question.options[selectedOptionIndex];
      if (option) {
        Object.entries(option.scores).forEach(([key, value]) => {
          scores[key] = (scores[key] || 0) + value;
        });
      }
    }
  });

  return scores;
}

// 결과 타입 결정
export function determineResultType(
  testId: string,
  scores: Record<string, number>
): ResultType | null {
  const test = getTestById(testId);
  if (!test) return null;

  // 테스트 ID에 따른 결과 결정 로직
  if (testId === 'stress-response') {
    // 오행 기반 점수
    const elementScores = {
      fire: scores.fire || 0,
      metal: scores.metal || 0,
      wood: scores.wood || 0,
      water: scores.water || 0,
      earth: scores.earth || 0,
    };

    const topElement = Object.entries(elementScores)
      .sort((a, b) => b[1] - a[1])[0][0];

    const resultMap: Record<string, string> = {
      fire: 'fire-type',
      metal: 'metal-type',
      wood: 'wood-type',
      water: 'water-type',
      earth: 'earth-type',
    };

    return test.resultTypes.find(r => r.id === resultMap[topElement]) || test.resultTypes[0];
  }

  if (testId === 'decision-style') {
    const styleScores = {
      analyst: scores.analyst || 0,
      intuitive: scores.intuitive || 0,
      social: scores.social || 0,
      action: scores.action || 0,
    };

    const topStyle = Object.entries(styleScores)
      .sort((a, b) => b[1] - a[1])[0][0];

    return test.resultTypes.find(r => r.id === topStyle) || test.resultTypes[0];
  }

  if (testId === 'relationship-pattern') {
    const patternScores = {
      outgoing: (scores.outgoing || 0),
      interest: (scores.interest || 0) + (scores.observer || 0),
      empathy: (scores.empathy || 0) + (scores.solver || 0),
      respecter: (scores.respecter || 0) + (scores.receptive || 0),
    };

    const patterns = [
      { id: 'connector', score: patternScores.outgoing },
      { id: 'depth-seeker', score: patternScores.interest },
      { id: 'supporter', score: patternScores.empathy },
      { id: 'respecter', score: patternScores.respecter },
    ];

    const topPattern = patterns.sort((a, b) => b.score - a.score)[0].id;
    return test.resultTypes.find(r => r.id === topPattern) || test.resultTypes[0];
  }

  // 기본: 가장 높은 점수의 결과
  return test.resultTypes[0];
}

// 전체 결과 생성
export function generateTestResult(
  testId: string,
  answers: Record<number, number>
): TestResult | null {
  const scores = calculateScores(testId, answers);
  const resultType = determineResultType(testId, scores);

  if (!resultType) return null;

  return {
    type: resultType,
    scores,
    원리설명: generatePrincipleExplanation(testId, scores),
  };
}

// 원리 설명 생성
function generatePrincipleExplanation(testId: string, scores: Record<string, number>): string {
  const scoreDisplay = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => `${key}: ${value}점`)
    .join('\n');

  return `
【이 결과가 나온 원리】

당신이 선택한 답변들의 점수를 합산했습니다:
${scoreDisplay}

가장 높은 점수를 받은 유형이 결과로 나왔습니다.

【솔직한 한계】
1. 이건 심리 "검사"가 아닙니다
   재미와 자기 성찰 용도입니다.
   전문적인 심리 분석이 아닙니다.

2. 질문 수가 적습니다
   5개 질문으로 사람을 파악하기엔 부족합니다.
   하나의 관점 정도로 생각해주세요.

3. 상황에 따라 다릅니다
   당신은 상황에 따라 다르게 행동합니다.
   이 결과는 "항상 이렇다"가 아니라
   "이런 경향이 있을 수 있다" 정도입니다.

4. 마음에 안 들면 무시해도 됩니다
   결과가 맞지 않다고 느끼면
   그냥 그런가 보다 하고 넘어가도 됩니다.
   당신이 당신을 더 잘 압니다.
  `.trim();
}

export { testPrinciple };

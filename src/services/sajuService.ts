import {
  천간, 지지, 천간오행, 지지오행, 천간음양, 지지음양,
  오행특성, 일간성향, 시간대지지, 오행상생, 오행상극
} from '../data/saju';
import { UserInfo, SajuResult, SajuPillar, EnvironmentReaction, HonestAdvice, FortuneInterpretation } from '../types';

// 연도에서 년주 계산
function getYearPillar(year: number): SajuPillar {
  // 천간: (연도 - 4) % 10
  // 지지: (연도 - 4) % 12
  const 천간Index = (year - 4) % 10;
  const 지지Index = (year - 4) % 12;

  const 천간값 = 천간[천간Index];
  const 지지값 = 지지[지지Index];

  return {
    천간: 천간값,
    지지: 지지값,
    오행: 천간오행[천간값],
    음양: 천간음양[천간값],
  };
}

// 월주 계산 (간략화된 버전)
function getMonthPillar(year: number, month: number): SajuPillar {
  // 월건 지지 (인월 = 1월, 묘월 = 2월, ...)
  const monthToJiji = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];
  const 지지값 = monthToJiji[(month - 1) % 12];

  // 월건 천간은 년간에 따라 결정
  const yearStem = (year - 4) % 10;
  const monthStemBase = (yearStem % 5) * 2;
  const 천간Index = (monthStemBase + (month - 1) + 2) % 10;
  const 천간값 = 천간[천간Index];

  return {
    천간: 천간값,
    지지: 지지값,
    오행: 천간오행[천간값],
    음양: 천간음양[천간값],
  };
}

// 일주 계산 (간략화된 버전)
function getDayPillar(date: Date): SajuPillar {
  // 1900년 1월 1일은 경진일
  const baseDate = new Date(1900, 0, 1);
  const diffDays = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  const 천간Index = (diffDays + 6) % 10; // 1900.1.1 = 경(6)
  const 지지Index = (diffDays + 4) % 12; // 1900.1.1 = 진(4)

  const 천간값 = 천간[천간Index];
  const 지지값 = 지지[지지Index];

  return {
    천간: 천간값,
    지지: 지지값,
    오행: 천간오행[천간값],
    음양: 천간음양[천간값],
  };
}

// 시주 계산
function getHourPillar(date: Date, timeStr: string): SajuPillar | null {
  if (timeStr === 'unknown') return null;

  const [hours] = timeStr.split(':').map(Number);

  // 시간대에 따른 지지 결정
  let 지지값: string;
  if (hours >= 23 || hours < 1) 지지값 = '자';
  else if (hours < 3) 지지값 = '축';
  else if (hours < 5) 지지값 = '인';
  else if (hours < 7) 지지값 = '묘';
  else if (hours < 9) 지지값 = '진';
  else if (hours < 11) 지지값 = '사';
  else if (hours < 13) 지지값 = '오';
  else if (hours < 15) 지지값 = '미';
  else if (hours < 17) 지지값 = '신';
  else if (hours < 19) 지지값 = '유';
  else if (hours < 21) 지지값 = '술';
  else 지지값 = '해';

  // 시간 천간은 일간에 따라 결정
  const dayPillar = getDayPillar(date);
  const dayStemIndex = 천간.indexOf(dayPillar.천간 as typeof 천간[number]);
  const hourJijiIndex = 지지.indexOf(지지값 as typeof 지지[number]);
  const hourStemBase = (dayStemIndex % 5) * 2;
  const 천간Index = (hourStemBase + hourJijiIndex) % 10;
  const 천간값 = 천간[천간Index];

  return {
    천간: 천간값,
    지지: 지지값,
    오행: 천간오행[천간값],
    음양: 천간음양[천간값],
  };
}

// 오행 분포 계산
function calculateElementDistribution(pillars: (SajuPillar | null)[]): Record<string, number> {
  const distribution: Record<string, number> = {
    '목': 0, '화': 0, '토': 0, '금': 0, '수': 0
  };

  pillars.forEach(pillar => {
    if (pillar) {
      distribution[천간오행[pillar.천간]] += 1;
      distribution[지지오행[pillar.지지]] += 1;
    }
  });

  return distribution;
}

// 환경 반응 생성
function generateEnvironmentReactions(일간: string, 오행분포: Record<string, number>): EnvironmentReaction[] {
  const reactions: EnvironmentReaction[] = [];

  // 일간 기반 반응
  const 일간정보 = 일간성향[일간];
  if (일간정보) {
    reactions.push(...일간정보.환경별반응);
  }

  // 오행 분포 기반 반응 추가
  const 주요오행 = Object.entries(오행분포)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([element]) => element);

  주요오행.forEach(element => {
    const 특성 = 오행특성[element];
    if (특성) {
      특성.환경반응.forEach(반응 => {
        reactions.push({
          상황: 반응.상황,
          반응경향: 반응.반응,
          이유: 반응.이유,
          팁: `${element}(${element === '목' ? '木' : element === '화' ? '火' : element === '토' ? '土' : element === '금' ? '金' : '水'}) 에너지가 강한 편이라 이런 경향`
        });
      });
    }
  });

  return reactions.slice(0, 6); // 최대 6개
}

// 솔직한 조언 생성
function generateHonestAdvice(오행분포: Record<string, number>): HonestAdvice[] {
  const advices: HonestAdvice[] = [];

  // 부족한 오행 체크
  const 부족오행 = Object.entries(오행분포)
    .filter(([_, count]) => count === 0)
    .map(([element]) => element);

  if (부족오행.length > 0) {
    advices.push({
      주제: `${부족오행.join(', ')} 오행이 없음`,
      내용: `사주에 ${부족오행.join(', ')} 기운이 보이지 않습니다. 하지만 이것이 "결핍"은 아닙니다. 환경, 노력, 선택으로 충분히 보완됩니다. 사주는 고정된 운명이 아니라 경향성일 뿐.`,
      타입: 'ambiguous',
      아이콘: '🤔'
    });
  }

  // 과다한 오행 체크
  const 과다오행 = Object.entries(오행분포)
    .filter(([_, count]) => count >= 4)
    .map(([element]) => element);

  if (과다오행.length > 0) {
    advices.push({
      주제: `${과다오행.join(', ')} 오행이 강함`,
      내용: `${과다오행.join(', ')} 기운이 강하게 보입니다. 이는 장점이자 주의점. 강한 기운은 잘 쓰면 추진력, 지나치면 과함이 됩니다. 어떻게 쓰느냐는 선택.`,
      타입: 'choice_matters',
      아이콘: '💪'
    });
  }

  // 기본 조언
  advices.push({
    주제: '사주의 한계',
    내용: '사주는 "환경에 대한 반응 경향"을 보여줄 뿐, 인생의 결과를 결정하지 않습니다. 같은 사주여도 선택과 환경에 따라 삶은 완전히 다릅니다.',
    타입: 'choice_matters',
    아이콘: '📌'
  });

  advices.push({
    주제: '운보다 선택',
    내용: '직업, 관계, 생활 방식 같은 것들은 사주보다 본인의 노력과 선택이 훨씬 더 큰 비중을 차지합니다. 사주 탓을 하기엔 당신이 가진 선택지가 더 많습니다.',
    타입: 'choice_matters',
    아이콘: '🎯'
  });

  return advices;
}

// 운세 해석 생성
function generateInterpretation(일간: string, 오행분포: Record<string, number>): FortuneInterpretation {
  const 일간정보 = 일간성향[일간];
  const 주요오행 = Object.entries(오행분포)
    .sort((a, b) => b[1] - a[1])[0][0];

  const 원리 = `
【계산 원리】
사주는 생년월일시를 60갑자(천간 10개 × 지지 12개)로 변환한 것입니다.
각 기둥(년월일시)에서 나온 천간과 지지의 오행을 분석합니다.

당신의 일간(日干): ${일간}
이것은 당신의 "본질"이 아니라 "기본 에너지 스타일"입니다.

오행 분포:
- 목(木): ${오행분포['목']}개 - 성장, 시작
- 화(火): ${오행분포['화']}개 - 표현, 열정
- 토(土): ${오행분포['토']}개 - 안정, 중재
- 금(金): ${오행분포['금']}개 - 결단, 정리
- 수(水): ${오행분포['수']}개 - 지혜, 유연

【해석 방식】
이 앱은 "당신은 이런 사람"이라고 단정하지 않습니다.
대신 "이런 상황에서 이런 반응이 나오기 쉬움"이라고 설명합니다.
왜냐하면 사람은 환경에 따라 다르게 행동하기 때문입니다.
  `.trim();

  return {
    전체운: 일간정보 ? 일간정보.키워드 : '분석 중',
    상세설명: `일간 ${일간}은 ${일간정보?.키워드 || '고유한 에너지'}를 가집니다. 주요 오행인 ${주요오행}이 강하게 작용하여, 이에 맞는 환경에서 더 자연스럽게 힘을 발휘할 수 있습니다.`,
    원리설명: 원리
  };
}

// 메인 분석 함수
export function analyzeSaju(userInfo: UserInfo): SajuResult {
  const birthDate = new Date(userInfo.birthDate);
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;

  const 년주 = getYearPillar(year);
  const 월주 = getMonthPillar(year, month);
  const 일주 = getDayPillar(birthDate);
  const 시주 = getHourPillar(birthDate, userInfo.birthTime);

  const pillars = [년주, 월주, 일주, 시주];
  const 오행분포 = calculateElementDistribution(pillars);
  const 일간 = 일주.천간;

  return {
    년주,
    월주,
    일주,
    시주,
    일간,
    오행분포,
    환경반응: generateEnvironmentReactions(일간, 오행분포),
    솔직한조언: generateHonestAdvice(오행분포),
    운세해석: generateInterpretation(일간, 오행분포),
  };
}

// 사주 원리 설명
export const sajuPrinciple = `
사주(四柱)의 원리:

1. 사주란?
생년월일시를 기반으로 4개의 기둥(柱)을 세웁니다.
각 기둥은 천간(10개)과 지지(12개)로 구성됩니다.
이것이 60갑자 체계입니다.

2. 왜 이렇게 보는가?
고대 동양에서는 시간에 에너지가 있다고 보았습니다.
태어난 시간의 에너지 조합이 그 사람의 "초기 설정"이라는 개념.
마치 계절에 따라 날씨가 다르듯, 시간에 따라 기운이 다르다는 생각.

3. 현대적 해석
이 앱은 사주를 "정해진 운명"으로 보지 않습니다.
대신 "특정 환경에서의 반응 경향성"으로 해석합니다.
같은 사주라도 환경과 선택에 따라 삶은 완전히 달라집니다.

4. 솔직한 한계
- 과학적으로 증명된 것이 아닙니다
- 같은 시간에 태어난 사람들의 삶은 다 다릅니다
- 자기 이해의 도구로 활용하되, 맹신하지 마세요
- "사주가 이래서 안 돼"라는 생각은 금물
`;

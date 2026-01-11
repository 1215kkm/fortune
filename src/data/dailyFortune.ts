import { DailyFortune } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFILE_KEY, MyProfile } from '../screens/SettingsScreen';

const 오행운세 = {
  목: { 좋은날: [1, 2, 11, 12], luckyColor: '초록', luckyItem: '식물', 강점: '성장과 시작' },
  화: { 좋은날: [3, 4, 5], luckyColor: '빨강', luckyItem: '따뜻한 음료', 강점: '열정과 활력' },
  토: { 좋은날: [6, 7, 8], luckyColor: '노랑', luckyItem: '정리정돈', 강점: '안정과 중재' },
  금: { 좋은날: [9, 10], luckyColor: '흰색', luckyItem: '손글씨 메모', 강점: '결단과 정리' },
  수: { 좋은날: [0], luckyColor: '파랑', luckyItem: '음악', 강점: '지혜와 유연함' },
};

const 천간오행: Record<string, string> = {
  '갑': '목', '을': '목',
  '병': '화', '정': '화',
  '무': '토', '기': '토',
  '경': '금', '신': '금',
  '임': '수', '계': '수',
};

const 천간 = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;

const overallMessages = [
  { score: 90, message: '매우 좋은 기운', detail: '오늘은 에너지가 활발합니다. 하지만 "운이 좋으니 대충해도 되겠지"는 금물.' },
  { score: 80, message: '좋은 흐름', detail: '순조로운 하루가 예상됩니다. 꾸준한 노력이 결실을 맺기 좋은 날.' },
  { score: 70, message: '안정적인 하루', detail: '특별히 좋거나 나쁘지 않은 평온한 날. 평소처럼 하면 됩니다.' },
  { score: 60, message: '무난한 날', detail: '큰 일 없이 흘러갈 것 같은 날. 작은 것에 감사하기 좋습니다.' },
  { score: 50, message: '신중하게', detail: '조금 더 주의를 기울이면 좋겠습니다. 단, 위축될 필요는 없어요.' },
];

const categoryMessages = {
  work: [
    { score: 90, message: '업무 효율이 높을 수 있는 날' },
    { score: 70, message: '평소대로 하면 무난' },
    { score: 50, message: '집중이 흐트러지기 쉬움, 중요한 일은 체크리스트 활용' },
  ],
  relationship: [
    { score: 90, message: '대인관계가 원활할 것 같은 날' },
    { score: 70, message: '평소처럼 자연스럽게' },
    { score: 50, message: '오해가 생기기 쉬우니 명확한 소통 권장' },
  ],
  health: [
    { score: 90, message: '활력이 넘치는 날, 운동하기 좋음' },
    { score: 70, message: '평소 컨디션 유지' },
    { score: 50, message: '피로감이 있을 수 있음, 충분한 휴식 권장' },
  ],
  money: [
    { score: 90, message: '재정 관리에 집중하기 좋은 날' },
    { score: 70, message: '계획된 지출은 괜찮음' },
    { score: 50, message: '충동구매 주의, 하루 기다리기 추천' },
  ],
};

const luckyItems = [
  '따뜻한 음료', '파란색 물건', '손글씨 메모', '창가 자리',
  '식물', '음악', '책', '산책', '정리정돈', '감사 인사',
];

const luckyColors = [
  '파랑', '초록', '노랑', '주황', '보라', '흰색', '회색', '하늘색',
];

const advices = [
  '오늘 하루도 당신의 선택이 운세보다 중요합니다.',
  '작은 친절이 좋은 에너지를 만듭니다.',
  '급하지 않으면 한 번 더 생각해보세요.',
  '완벽하지 않아도 괜찮습니다.',
  '쉬어가는 것도 생산적인 행동입니다.',
  '오늘의 작은 노력이 내일의 결과가 됩니다.',
];

// 날짜 기반 일관된 랜덤 생성
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getDateSeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

// 일간(일주 천간) 계산
function getDayGan(year: number, month: number, day: number): string {
  // 간단한 일진 계산 (정확도 80% 정도)
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  const ganIndex = (diffDays + 4) % 10; // 1900년 1월 1일은 갑자일
  return 천간[ganIndex];
}

// 사주 기반 오늘의 운세 계산
function calculateSajuBasedFortune(profile: MyProfile): {
  score: number;
  luckyColor: string;
  luckyItem: string;
  explanation: string;
} {
  const year = parseInt(profile.birthYear);
  const month = parseInt(profile.birthMonth);
  const day = parseInt(profile.birthDay);

  // 일간 (내 기본 에너지)
  const myDayGan = getDayGan(year, month, day);
  const my오행 = 천간오행[myDayGan];

  // 오늘의 일간
  const today = new Date();
  const todayGan = getDayGan(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const today오행 = 천간오행[todayGan];

  // 오행 상생상극 관계 계산
  const 상생관계: Record<string, string> = {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  };
  const 상극관계: Record<string, string> = {
    '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
  };

  let score = 70; // 기본 점수
  let explanation = '';

  if (my오행 === today오행) {
    score = 80;
    explanation = `오늘은 ${my오행}의 기운이 강한 날. 당신의 기본 에너지(${my오행})와 같아 자연스러운 하루.`;
  } else if (상생관계[my오행] === today오행) {
    score = 85;
    explanation = `당신의 ${my오행} 에너지가 오늘의 ${today오행}을 생(生)합니다. 주도적인 하루가 될 수 있어요.`;
  } else if (상생관계[today오행] === my오행) {
    score = 90;
    explanation = `오늘의 ${today오행} 기운이 당신의 ${my오행}을 도와줍니다. 지지받는 느낌의 하루.`;
  } else if (상극관계[my오행] === today오행) {
    score = 60;
    explanation = `당신의 ${my오행}이 오늘의 ${today오행}을 극(克)합니다. 에너지 소모가 있을 수 있어요.`;
  } else if (상극관계[today오행] === my오행) {
    score = 55;
    explanation = `오늘의 ${today오행}이 당신의 ${my오행}에 도전합니다. 신중하게 움직이세요.`;
  } else {
    score = 70;
    explanation = `${my오행}과 ${today오행}은 직접적 관계가 없어 평온한 하루입니다.`;
  }

  const myInfo = 오행운세[my오행 as keyof typeof 오행운세] || 오행운세['토'];

  return {
    score,
    luckyColor: myInfo.luckyColor,
    luckyItem: myInfo.luckyItem,
    explanation,
  };
}

// 프로필 불러오기 (동기 버전 - 캐시용)
let cachedProfile: MyProfile | null = null;

export async function loadProfile(): Promise<MyProfile | null> {
  try {
    const saved = await AsyncStorage.getItem(PROFILE_KEY);
    if (saved) {
      cachedProfile = JSON.parse(saved);
      return cachedProfile;
    }
  } catch (e) {
    console.log('프로필 불러오기 실패');
  }
  return null;
}

// 오늘의 운세 가져오기
export function getTodayFortune(profile?: MyProfile | null): DailyFortune {
  const seed = getDateSeed();
  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const useProfile = profile || cachedProfile;

  // 사주 정보가 있으면 사주 기반으로 계산
  if (useProfile && useProfile.birthYear && useProfile.birthMonth && useProfile.birthDay) {
    const sajuResult = calculateSajuBasedFortune(useProfile);

    // 점수에 따른 메시지 선택
    let overallIndex = 2; // 기본: 안정적인 하루
    if (sajuResult.score >= 85) overallIndex = 0;
    else if (sajuResult.score >= 75) overallIndex = 1;
    else if (sajuResult.score >= 65) overallIndex = 2;
    else if (sajuResult.score >= 55) overallIndex = 3;
    else overallIndex = 4;

    const overall = {
      ...overallMessages[overallIndex],
      score: sajuResult.score,
    };

    // 카테고리별 운세 (사주 점수 기반)
    const catIndex = sajuResult.score >= 75 ? 0 : sajuResult.score >= 60 ? 1 : 2;
    const categories = [
      { name: '업무/학업', icon: '💼', ...categoryMessages.work[catIndex] },
      { name: '대인관계', icon: '🤝', ...categoryMessages.relationship[Math.min(catIndex, 2)] },
      { name: '건강', icon: '💪', ...categoryMessages.health[Math.min(catIndex, 2)] },
      { name: '금전', icon: '💰', ...categoryMessages.money[Math.min(catIndex, 2)] },
    ];

    return {
      date: dateString,
      overall,
      categories,
      luckyItem: sajuResult.luckyItem,
      luckyColor: sajuResult.luckyColor,
      advice: advices[Math.floor(seededRandom(seed + 7) * advices.length)],
      honestNote: `🌳 ${useProfile.name}님의 사주 기반 운세\n${sajuResult.explanation}\n\n⚠️ 이것은 전통적 해석이며 과학적 예측이 아닙니다.`,
    };
  }

  // 사주 정보 없으면 기본 랜덤 운세
  const overallIndex = Math.floor(seededRandom(seed) * overallMessages.length);
  const overall = overallMessages[overallIndex];

  const categories = [
    {
      name: '업무/학업',
      icon: '💼',
      ...categoryMessages.work[Math.floor(seededRandom(seed + 1) * categoryMessages.work.length)],
    },
    {
      name: '대인관계',
      icon: '🤝',
      ...categoryMessages.relationship[Math.floor(seededRandom(seed + 2) * categoryMessages.relationship.length)],
    },
    {
      name: '건강',
      icon: '💪',
      ...categoryMessages.health[Math.floor(seededRandom(seed + 3) * categoryMessages.health.length)],
    },
    {
      name: '금전',
      icon: '💰',
      ...categoryMessages.money[Math.floor(seededRandom(seed + 4) * categoryMessages.money.length)],
    },
  ];

  const luckyItem = luckyItems[Math.floor(seededRandom(seed + 5) * luckyItems.length)];
  const luckyColor = luckyColors[Math.floor(seededRandom(seed + 6) * luckyColors.length)];
  const advice = advices[Math.floor(seededRandom(seed + 7) * advices.length)];

  return {
    date: dateString,
    overall,
    categories,
    luckyItem,
    luckyColor,
    advice,
    honestNote: '⚠️ 설정에서 내 사주 정보를 등록하면\n맞춤형 운세를 받아볼 수 있습니다.\n\n이 운세는 날짜 기반 랜덤 결과입니다.',
  };
}

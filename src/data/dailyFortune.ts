import { DailyFortune } from '../types';

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

const honestNotes = [
  '이 운세는 날짜 기반의 랜덤 결과입니다. 과학적 근거는 없습니다.',
  '운세가 나쁘다고 위축되지 마세요. 그냥 무시하셔도 됩니다.',
  '좋은 운세도 노력 없이는 의미 없습니다.',
  '이건 재미로 보는 것입니다. 중요한 결정은 운세로 하지 마세요.',
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

export function getTodayFortune(): DailyFortune {
  const seed = getDateSeed();
  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  // 전체운 결정
  const overallIndex = Math.floor(seededRandom(seed) * overallMessages.length);
  const overall = overallMessages[overallIndex];

  // 카테고리별 운세
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

  // 행운 아이템, 색상
  const luckyItem = luckyItems[Math.floor(seededRandom(seed + 5) * luckyItems.length)];
  const luckyColor = luckyColors[Math.floor(seededRandom(seed + 6) * luckyColors.length)];

  // 조언
  const advice = advices[Math.floor(seededRandom(seed + 7) * advices.length)];
  const honestNote = honestNotes[Math.floor(seededRandom(seed + 8) * honestNotes.length)];

  return {
    date: dateString,
    overall,
    categories,
    luckyItem,
    luckyColor,
    advice,
    honestNote,
  };
}

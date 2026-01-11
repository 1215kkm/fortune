import { TarotCard } from '../types';

export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    nameKo: '바보',
    meaning: {
      upright: '새로운 시작, 순수함, 자유로운 영혼',
      reversed: '무모함, 위험 무시, 미성숙',
    },
    description: '절벽 끝에 서서 하늘을 바라보는 여행자. 모든 것이 시작되는 지점.',
    symbol: '🃏',
    element: '공기',
  },
  {
    id: 1,
    name: 'The Magician',
    nameKo: '마법사',
    meaning: {
      upright: '창조력, 의지력, 능력 발휘',
      reversed: '조작, 속임수, 재능 낭비',
    },
    description: '모든 도구를 갖춘 자. 생각을 현실로 만들 수 있는 능력.',
    symbol: '🎭',
    element: '공기',
  },
  {
    id: 2,
    name: 'The High Priestess',
    nameKo: '여사제',
    meaning: {
      upright: '직관, 무의식, 신비로운 지혜',
      reversed: '비밀, 숨겨진 의도, 표면적 이해',
    },
    description: '달빛 아래의 지혜. 보이지 않는 것을 보는 눈.',
    symbol: '🌙',
    element: '물',
  },
  {
    id: 3,
    name: 'The Empress',
    nameKo: '여황제',
    meaning: {
      upright: '풍요, 자연, 모성애, 창조',
      reversed: '창조적 막힘, 의존, 공허함',
    },
    description: '생명을 품은 대지. 자라나게 하는 힘.',
    symbol: '👑',
    element: '땅',
  },
  {
    id: 4,
    name: 'The Emperor',
    nameKo: '황제',
    meaning: {
      upright: '권위, 구조, 리더십, 안정',
      reversed: '독재, 과도한 통제, 경직',
    },
    description: '왕좌 위의 지배자. 질서를 세우는 자.',
    symbol: '🏛️',
    element: '불',
  },
  {
    id: 5,
    name: 'The Hierophant',
    nameKo: '교황',
    meaning: {
      upright: '전통, 가르침, 제도, 신념',
      reversed: '형식주의, 독단, 새로운 방식 필요',
    },
    description: '오래된 지혜의 전달자. 의미와 전통을 잇는 다리.',
    symbol: '📿',
    element: '땅',
  },
  {
    id: 6,
    name: 'The Lovers',
    nameKo: '연인',
    meaning: {
      upright: '사랑, 조화, 관계, 가치관 선택',
      reversed: '불화, 불균형, 가치 충돌',
    },
    description: '두 영혼의 만남. 선택과 통합의 순간.',
    symbol: '💕',
    element: '공기',
  },
  {
    id: 7,
    name: 'The Chariot',
    nameKo: '전차',
    meaning: {
      upright: '승리, 의지력, 결단, 전진',
      reversed: '통제 상실, 방향 없음, 공격성',
    },
    description: '상반된 힘을 하나로. 목표를 향해 달리는 전사.',
    symbol: '🏎️',
    element: '물',
  },
  {
    id: 8,
    name: 'Strength',
    nameKo: '힘',
    meaning: {
      upright: '내면의 힘, 용기, 인내, 부드러운 통제',
      reversed: '자기 의심, 약함, 통제 상실',
    },
    description: '사자를 다스리는 온화함. 진정한 힘은 부드럽다.',
    symbol: '🦁',
    element: '불',
  },
  {
    id: 9,
    name: 'The Hermit',
    nameKo: '은둔자',
    meaning: {
      upright: '내면 탐구, 성찰, 지혜 추구',
      reversed: '고립, 외로움, 과도한 회피',
    },
    description: '등불을 든 현자. 어둠 속에서 빛을 찾는 여정.',
    symbol: '🏔️',
    element: '땅',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    nameKo: '운명의 수레바퀴',
    meaning: {
      upright: '변화, 순환, 운명의 전환점',
      reversed: '저항, 불운, 통제 불가',
    },
    description: '돌아가는 바퀴. 오르막이 있으면 내리막도 있다.',
    symbol: '🎡',
    element: '불',
  },
  {
    id: 11,
    name: 'Justice',
    nameKo: '정의',
    meaning: {
      upright: '정의, 공정, 진실, 책임',
      reversed: '불공정, 불균형, 책임 회피',
    },
    description: '저울을 든 눈 가린 자. 진실만이 균형을 맞춘다.',
    symbol: '⚖️',
    element: '공기',
  },
  {
    id: 12,
    name: 'The Hanged Man',
    nameKo: '매달린 사람',
    meaning: {
      upright: '새로운 관점, 희생, 기다림, 내려놓음',
      reversed: '지연, 저항, 무의미한 희생',
    },
    description: '거꾸로 본 세상. 멈춤이 주는 깨달음.',
    symbol: '🙃',
    element: '물',
  },
  {
    id: 13,
    name: 'Death',
    nameKo: '죽음',
    meaning: {
      upright: '종말과 새로운 시작, 변화, 전환',
      reversed: '변화 저항, 정체, 두려움',
    },
    description: '끝은 시작이다. 죽음 없이는 재탄생도 없다.',
    symbol: '💀',
    element: '물',
  },
  {
    id: 14,
    name: 'Temperance',
    nameKo: '절제',
    meaning: {
      upright: '균형, 조화, 인내, 중용',
      reversed: '불균형, 과잉, 조화 부족',
    },
    description: '물을 섞는 천사. 극단 사이의 황금 중간.',
    symbol: '⚗️',
    element: '불',
  },
  {
    id: 15,
    name: 'The Devil',
    nameKo: '악마',
    meaning: {
      upright: '속박, 유혹, 그림자, 물질주의',
      reversed: '해방, 제한에서 벗어남, 인식',
    },
    description: '사슬에 묶인 자들. 그러나 사슬은 느슨하다.',
    symbol: '😈',
    element: '땅',
  },
  {
    id: 16,
    name: 'The Tower',
    nameKo: '탑',
    meaning: {
      upright: '급격한 변화, 계시, 해방, 깨달음',
      reversed: '변화 회피, 재난 연기, 두려움',
    },
    description: '번개 맞은 탑. 무너지는 것들은 원래 불안정했다.',
    symbol: '🗼',
    element: '불',
  },
  {
    id: 17,
    name: 'The Star',
    nameKo: '별',
    meaning: {
      upright: '희망, 영감, 치유, 맑은 비전',
      reversed: '절망, 신뢰 상실, 단절',
    },
    description: '별빛 아래 물 붓는 자. 폭풍 후의 고요한 희망.',
    symbol: '⭐',
    element: '공기',
  },
  {
    id: 18,
    name: 'The Moon',
    nameKo: '달',
    meaning: {
      upright: '환상, 불안, 직관, 숨겨진 것',
      reversed: '혼란 해소, 진실 드러남, 두려움 극복',
    },
    description: '달빛 속 그림자. 보이는 것이 전부가 아니다.',
    symbol: '🌕',
    element: '물',
  },
  {
    id: 19,
    name: 'The Sun',
    nameKo: '태양',
    meaning: {
      upright: '성공, 기쁨, 활력, 밝은 미래',
      reversed: '일시적 침체, 과도한 낙관, 지연',
    },
    description: '모든 것을 비추는 빛. 숨길 것 없는 밝음.',
    symbol: '☀️',
    element: '불',
  },
  {
    id: 20,
    name: 'Judgement',
    nameKo: '심판',
    meaning: {
      upright: '부활, 성찰, 소명, 결산',
      reversed: '자기 비판, 후회, 회피',
    },
    description: '나팔 소리. 과거를 정리하고 새롭게 일어서는 순간.',
    symbol: '📯',
    element: '불',
  },
  {
    id: 21,
    name: 'The World',
    nameKo: '세계',
    meaning: {
      upright: '완성, 성취, 통합, 여정의 끝',
      reversed: '미완성, 지연, 목표 재검토',
    },
    description: '춤추는 완성. 모든 여정이 하나로 모이는 순간.',
    symbol: '🌍',
    element: '땅',
  },
];

export const tarotSpreadPositions = {
  single: ['현재 상황'],
  threeCard: ['과거', '현재', '미래'],
  celtic: [
    '현재 상황',
    '즉각적인 도전',
    '먼 과거',
    '가까운 과거',
    '가능한 미래',
    '가까운 미래',
    '나의 태도',
    '외부 영향',
    '희망과 두려움',
    '최종 결과',
  ],
};

// 타로 해석 원리 설명
export const tarotPrinciple = `
타로 카드의 원리:

1. 상징과 투사
타로 카드는 인류의 보편적 상징들을 담고 있습니다.
당신이 카드를 볼 때, 그 상징에 자신의 상황을 투사합니다.
이 과정에서 평소 인식하지 못했던 생각이나 감정이 드러날 수 있습니다.

2. 무작위성의 활용
"이 카드가 나온 이유"를 찾으려는 마음이
자신의 상황을 새로운 관점에서 보게 합니다.
정해진 답이 없기에 오히려 열린 사고가 가능합니다.

3. 솔직한 한계
- 카드는 미래를 "예언"하지 않습니다
- 카드는 당신의 생각을 비추는 거울에 가깝습니다
- 해석은 상담사(또는 앱)의 관점일 뿐, 절대적 진실이 아닙니다
`;

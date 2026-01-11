import { majorArcana, tarotPrinciple } from '../data/tarot';
import { TarotCard, TarotReading, DrawnCard, HonestAdvice } from '../types';

// 카드 섞기
function shuffleCards(): TarotCard[] {
  const cards = [...majorArcana];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// 카드 뽑기
export function drawCards(count: number): DrawnCard[] {
  const shuffled = shuffleCards();
  const drawn: DrawnCard[] = [];

  const positions = count === 1
    ? ['현재 상황']
    : count === 3
    ? ['과거', '현재', '미래']
    : ['상황', '조언', '결과'];

  for (let i = 0; i < count; i++) {
    const isReversed = Math.random() > 0.5;
    drawn.push({
      card: shuffled[i],
      position: positions[i] || `카드 ${i + 1}`,
      isReversed,
      interpretation: interpretCard(shuffled[i], isReversed, positions[i]),
    });
  }

  return drawn;
}

// 개별 카드 해석
function interpretCard(card: TarotCard, isReversed: boolean, position: string): string {
  const meaning = isReversed ? card.meaning.reversed : card.meaning.upright;

  const positionContext: Record<string, string> = {
    '과거': '지나온 시간에서',
    '현재': '지금 이 순간에',
    '미래': '다가올 시간에',
    '상황': '현재 상황을 보면',
    '조언': '고려해볼 점은',
    '결과': '흐름이 향하는 곳은',
    '현재 상황': '지금',
  };

  const context = positionContext[position] || '';
  const direction = isReversed ? '(역방향)' : '(정방향)';

  return `${context} ${card.nameKo} ${direction}가 나왔습니다. 이는 "${meaning}"의 에너지를 암시합니다. ${card.description}`;
}

// 전체 리딩 생성
export function generateReading(cards: DrawnCard[], question: string): TarotReading {
  const interpretation = generateOverallInterpretation(cards, question);
  const honestAdvice = generateHonestAdvice(question, cards);

  return {
    cards,
    question,
    interpretation,
    원리설명: generatePrincipleExplanation(cards),
    솔직한조언: honestAdvice,
  };
}

// 전체 해석 생성
function generateOverallInterpretation(cards: DrawnCard[], question: string): string {
  if (cards.length === 1) {
    const card = cards[0];
    return `
질문: "${question}"

【${card.card.nameKo}】 ${card.isReversed ? '역방향' : '정방향'}

${card.card.description}

이 카드가 말하는 것:
${card.isReversed ? card.card.meaning.reversed : card.card.meaning.upright}

질문과 연결하면:
현재 상황에서 ${card.card.nameKo}의 에너지가 작용하고 있습니다.
${card.isReversed
  ? '역방향이 나온 것은 이 에너지가 막혀있거나, 과도하거나, 재검토가 필요할 수 있음을 의미합니다.'
  : '정방향이 나온 것은 이 에너지가 순조롭게 흐르고 있거나, 활용할 때임을 의미합니다.'}
    `.trim();
  }

  if (cards.length === 3) {
    return `
질문: "${question}"

【과거: ${cards[0].card.nameKo}】
${cards[0].interpretation}

【현재: ${cards[1].card.nameKo}】
${cards[1].interpretation}

【미래: ${cards[2].card.nameKo}】
${cards[2].interpretation}

전체 흐름:
과거의 ${cards[0].card.nameKo}에서 시작된 에너지가
현재 ${cards[1].card.nameKo}의 형태로 나타나고 있으며,
이 흐름이 계속되면 ${cards[2].card.nameKo}의 방향으로 향할 수 있습니다.

단, 미래 카드는 "예언"이 아닙니다.
현재의 에너지가 계속될 때의 가능성을 보여줄 뿐,
당신의 선택에 따라 얼마든지 달라질 수 있습니다.
    `.trim();
  }

  return cards.map(c => c.interpretation).join('\n\n');
}

// 원리 설명 생성
function generatePrincipleExplanation(cards: DrawnCard[]): string {
  return `
【왜 이 카드가 나왔을까?】

솔직하게: 무작위입니다.
카드는 섞이고, 무작위로 뽑혔습니다.
"운명적으로 이 카드가 나왔다"는 증명할 방법이 없습니다.

그럼에도 의미가 있는 이유:
1. 투사(Projection)
   당신이 이 카드를 보고 "왜 이게 나왔지?"라고
   생각하는 순간, 자신의 상황을 새롭게 들여다보게 됩니다.

2. 상징의 힘
   타로의 이미지들은 인류의 보편적 경험을 담고 있어
   대부분의 상황에 어느 정도 연결될 수 있습니다.

3. 열린 해석
   정해진 답이 없기에 오히려 자유롭게 생각할 수 있습니다.

【오늘 나온 카드들】
${cards.map(c => `- ${c.card.nameKo}: ${c.card.symbol} (${c.card.element}의 에너지)`).join('\n')}

타로는 답을 주는 것이 아니라
질문을 던지는 도구입니다.
  `.trim();
}

// 솔직한 조언 생성
function generateHonestAdvice(question: string, cards: DrawnCard[]): HonestAdvice | null {
  const lowerQuestion = question.toLowerCase();

  // 특정 질문 유형에 대한 솔직한 피드백
  if (lowerQuestion.includes('언제') || lowerQuestion.includes('when')) {
    return {
      주제: '시기 관련 질문',
      내용: '타로로 정확한 시기를 알 수 없습니다. "언제"보다 "무엇을 준비하면 좋을까"로 질문을 바꿔보면 더 도움이 됩니다.',
      타입: 'ambiguous',
      아이콘: '⏰'
    };
  }

  if (lowerQuestion.includes('할까 말까') || lowerQuestion.includes('해야') || lowerQuestion.includes('should')) {
    return {
      주제: '결정 관련 질문',
      내용: '결정은 카드가 아니라 당신이 하는 것입니다. 타로는 고려해볼 관점을 제시할 뿐, "해라/하지마라"를 알려주지 않습니다. 이 결정은 당신의 몫입니다.',
      타입: 'choice_matters',
      아이콘: '🎯'
    };
  }

  if (lowerQuestion.includes('사람') || lowerQuestion.includes('마음') || lowerQuestion.includes('생각')) {
    return {
      주제: '타인 관련 질문',
      내용: '다른 사람의 마음은 타로로 알 수 없습니다. 카드가 보여주는 것은 "당신이 그 사람에 대해 어떻게 느끼고 있는지"에 가깝습니다. 상대방의 진심은 직접 물어보는 것이 가장 정확합니다.',
      타입: 'ambiguous',
      아이콘: '💭'
    };
  }

  if (lowerQuestion.includes('될까') || lowerQuestion.includes('성공') || lowerQuestion.includes('합격')) {
    return {
      주제: '결과 예측 질문',
      내용: '타로는 미래를 예언하지 않습니다. 결과는 당신의 노력, 준비, 환경 등 수많은 요소가 결정합니다. 카드가 좋게 나왔다고 안심하거나, 나쁘게 나왔다고 포기하지 마세요.',
      타입: 'choice_matters',
      아이콘: '🔮'
    };
  }

  return null;
}

// 빠른 1카드 리딩
export function quickOneCardReading(question: string): TarotReading {
  const cards = drawCards(1);
  return generateReading(cards, question);
}

// 3카드 리딩 (과거/현재/미래)
export function threeCardReading(question: string): TarotReading {
  const cards = drawCards(3);
  return generateReading(cards, question);
}

export { tarotPrinciple };

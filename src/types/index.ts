// 사주 관련 타입
export interface UserInfo {
  name: string;
  birthDate: Date;
  birthTime: string; // "00:00" ~ "23:59" 또는 "unknown"
  gender: 'male' | 'female';
  isLunar: boolean; // 음력 여부
}

export interface SajuPillar {
  천간: string;
  지지: string;
  오행: string;
  음양: '음' | '양';
}

export interface SajuResult {
  년주: SajuPillar;
  월주: SajuPillar;
  일주: SajuPillar;
  시주: SajuPillar | null;
  일간: string;
  오행분포: Record<string, number>;
  환경반응: EnvironmentReaction[];
  솔직한조언: HonestAdvice[];
  운세해석: FortuneInterpretation;
}

export interface EnvironmentReaction {
  상황: string;
  반응경향: string;
  이유: string;
  팁: string;
}

export interface HonestAdvice {
  주제: string;
  내용: string;
  타입: 'ambiguous' | 'choice_matters' | 'fortune_based' | 'hard_to_read';
  아이콘: string;
}

export interface FortuneInterpretation {
  전체운: string;
  상세설명: string;
  원리설명: string;
}

// 타로 관련 타입
export interface TarotCard {
  id: number;
  name: string;
  nameKo: string;
  meaning: {
    upright: string;
    reversed: string;
  };
  description: string;
  symbol: string;
  element: string;
}

export interface TarotReading {
  cards: DrawnCard[];
  question: string;
  interpretation: string;
  원리설명: string;
  솔직한조언: HonestAdvice | null;
}

export interface DrawnCard {
  card: TarotCard;
  position: string;
  isReversed: boolean;
  interpretation: string;
}

// 질문형 운세 타입
export interface QuestionTest {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  resultTypes: ResultType[];
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  text: string;
  scores: Record<string, number>;
}

export interface ResultType {
  id: string;
  title: string;
  description: string;
  환경반응: EnvironmentReaction[];
  솔직한조언: HonestAdvice;
}

export interface TestResult {
  type: ResultType;
  scores: Record<string, number>;
  원리설명: string;
}

// 네비게이션 타입
export type RootStackParamList = {
  Main: undefined;
  UserInput: undefined;
  SajuResult: { userInfo: UserInfo; result: SajuResult };
  TarotReading: undefined;
  TarotResult: { reading: TarotReading };
  QuestionTest: { testId: string };
  TestResult: { result: TestResult; testTitle: string };
  SituationFortune: undefined;
  SituationResult: { situationId: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Saju: undefined;
  Tarot: undefined;
  Question: undefined;
};

// 상황별 운세 타입
export interface SituationFortune {
  id: string;
  title: string;
  icon: string;
  description: string;
  questions: string[];
  fortunes: {
    energy: string;
    message: string;
    detail: string;
    환경반응: EnvironmentReaction;
    솔직한조언: HonestAdvice;
  }[];
}

// 오늘의 운세 타입
export interface DailyFortune {
  date: string;
  overall: {
    score: number;
    message: string;
    detail: string;
  };
  categories: {
    name: string;
    icon: string;
    score: number;
    message: string;
  }[];
  luckyItem: string;
  luckyColor: string;
  advice: string;
  honestNote: string;
}

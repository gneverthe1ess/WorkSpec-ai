export interface MockInterviewResult {
  score: number;
  grade: 'S' | 'A' | 'B' | 'C';
  strengths: string[];
  improvements: string[];
  starFeedback: {
    situationTask: string;
    action: string;
    result: string;
  };
  recommendedAnswer: string;
}

/**
 * Intelligent Mock Interview Evaluator
 * Evaluates candidate responses based on engineering depth, STAR methodology,
 * and domain terminology. Runs instantaneously in browser, Vercel, or server.
 */
export function evaluateInterviewResponse(
  question: string,
  userAnswer: string,
  jobRole?: string,
  topic?: string
): MockInterviewResult {
  const answer = userAnswer.trim();
  const wordCount = answer.split(/\s+/).length;
  const charLength = answer.length;

  // 1. STAR & Structure Analysis
  const hasSituation = answer.includes('상황') || answer.includes('배경') || answer.includes('당시') || answer.includes('목표') || answer.includes('과제');
  const hasAction = answer.includes('적용') || answer.includes('제어') || answer.includes('분석') || answer.includes('개선') || answer.includes('수행') || answer.includes('통해');
  const hasResult = answer.includes('결과') || answer.includes('달성') || answer.includes('%') || answer.includes('향상') || answer.includes('감소') || answer.includes('확보');

  // 2. Technical Vocabulary Density
  const techKeywords = [
    '메커니즘', '공정', '수율', '파라미터', '챔버', '플라즈마', '선택비', '압력', '온도', '슬러리',
    '분산', '코팅', '전극', '핫스탬핑', '스프링백', '크로마토그래피', '단백질', 'hplc', 'tft', 'oled',
    '반응기', '촉매', 'rtos', '버퍼', 'cpk', 'doe', '오차', '정량'
  ];
  let techMatches = 0;
  const lowerAnswer = answer.toLowerCase();
  for (const kw of techKeywords) {
    if (lowerAnswer.includes(kw)) techMatches++;
  }

  // 3. Score Calculation
  let baseScore = 70;
  if (charLength > 120) baseScore += 8;
  if (charLength > 200) baseScore += 6;
  if (techMatches >= 2) baseScore += 5;
  if (techMatches >= 4) baseScore += 4;
  if (hasSituation) baseScore += 2;
  if (hasAction) baseScore += 3;
  if (hasResult) baseScore += 2;

  const score = Math.min(96, Math.max(72, baseScore));
  let grade: 'S' | 'A' | 'B' | 'C' = 'B';
  if (score >= 90) grade = 'S';
  else if (score >= 82) grade = 'A';
  else if (score >= 70) grade = 'B';
  else grade = 'C';

  // 4. Strengths
  const strengths: string[] = [];
  if (techMatches >= 2) {
    strengths.push('공학적 핵심 어휘와 현장 전문 용어를 적재적소에 자연스럽게 구사함');
  } else {
    strengths.push('질문의 의도를 정확히 파악하고 핵심 논지를 일관되게 전개함');
  }
  if (charLength >= 100) {
    strengths.push('구체적인 실행 과정(Action)과 원인 분석 논리가 탄탄하게 뒷받침됨');
  } else {
    strengths.push('간결하고 군더더기 없는 문맥으로 답변의 가독성을 높임');
  }

  // 5. Improvements
  const improvements: string[] = [];
  if (!hasResult || !answer.includes('%')) {
    improvements.push('결과(Result) 파트에 구체적인 정량적 수치(수율 개선 %, 불량 감소율, 오차 범위 등)를 명시하면 신뢰도가 2배 상승합니다.');
  }
  if (techMatches < 3) {
    improvements.push('현장 엔지니어가 사용하는 단위 공정 장비 및 분석 파라미터 용어를 1~2개 추가하여 전문성을 보강하세요.');
  }
  if (improvements.length === 0) {
    improvements.push('양산 라인 트러블 발생 시의 예외 상황 대처 능력을 한 문장 덧붙이면 만점 답변이 됩니다.');
  }

  // 6. STAR Breakdown
  const starFeedback = {
    situationTask: hasSituation
      ? '문제 상황과 목표 엔지니어링 스펙을 명확하게 정의함'
      : '초반부에 당면했던 기술적 문제와 해결 목표를 명확히 선언하고 시작하세요.',
    action: hasAction
      ? '본인이 직접 시도한 공정 변수 제어 및 실험 접근법이 논리적으로 기술됨'
      : '어떤 파라미터를 어떻게 조작하고 분석했는지 본인의 구체적 액션을 보강하세요.',
    result: hasResult
      ? '개선 성과와 교훈이 설득력 있게 마무리됨'
      : '최종 결과에서 정량적 지표(수율 %, 편차 감소 등)와 양산 적용 가능성을 언급하세요.'
  };

  const recommendedAnswer = `[상황] 해당 공정 진행 시 발생하는 불량 및 산포를 최소화하기 위해, [행동] 단위 공정의 핵심 변수(DoE)와 장비 파라미터 간의 상관관계를 통계적으로 분석하고 최적 윈도우를 도출했습니다. [결과] 이를 통해 핵심 품질 지표를 정량적으로 개선하고 후속 공정 수율 안정화에 기여했습니다.`;

  return {
    score,
    grade,
    strengths,
    improvements,
    starFeedback,
    recommendedAnswer
  };
}

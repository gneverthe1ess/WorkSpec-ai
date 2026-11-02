import React, { useState } from 'react';
import { IndustryType, LearningModule, MockInterviewEvaluation } from '../types';
import { LEARNING_MODULES } from '../data/mockData';
import { evaluateInterviewResponse } from '../services/interviewEvaluator';
import { 
  BookOpen, 
  GraduationCap, 
  CheckCircle, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  Lightbulb, 
  ChevronRight, 
  Play, 
  RotateCcw,
  Send,
  Loader2,
  Award,
  Layers,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

interface JobSkillLearningViewProps {
  initialIndustry?: IndustryType;
  completedModuleIds: string[];
  onCompleteModule: (moduleId: string, score?: number) => void;
}

export const JobSkillLearningView: React.FC<JobSkillLearningViewProps> = ({
  initialIndustry,
  completedModuleIds,
  onCompleteModule
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>(initialIndustry || '반도체');
  const [selectedModule, setSelectedModule] = useState<LearningModule>(
    LEARNING_MODULES.find(m => m.industry === (initialIndustry || '반도체')) || LEARNING_MODULES[0]
  );
  
  // Section Navigation
  const [activeStep, setActiveStep] = useState<number>(1);
  const [explanationMode, setExplanationMode] = useState<'simple' | 'deep'>('simple');
  
  // Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // AI Mock Interview State
  const [userInterviewAnswer, setUserInterviewAnswer] = useState<string>('');
  const [interviewLoading, setInterviewLoading] = useState<boolean>(false);
  const [interviewEvaluation, setInterviewEvaluation] = useState<MockInterviewEvaluation | null>(null);

  const industries: IndustryType[] = ['반도체', '배터리', '자동차', '바이오', '디스플레이', '화학', '전자 및 IT'];

  React.useEffect(() => {
    if (initialIndustry) {
      setSelectedIndustry(initialIndustry);
      const found = LEARNING_MODULES.find(m => m.industry === initialIndustry);
      if (found) {
        handleSelectModule(found);
      }
    }
  }, [initialIndustry]);

  const filteredModules = LEARNING_MODULES.filter(m => m.industry === selectedIndustry);

  const handleSelectModule = (mod: LearningModule) => {
    setSelectedModule(mod);
    setActiveStep(1);
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
    setUserInterviewAnswer('');
    setInterviewEvaluation(null);
  };

  const handleQuizOptionClick = (questionId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [questionId]: optIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    let correctCount = 0;
    selectedModule.quiz.forEach(q => {
      if (selectedQuizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / (selectedModule.quiz.length || 1)) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);
    onCompleteModule(selectedModule.id, calculatedScore);
  };

  const handleRunMockInterview = async () => {
    if (!userInterviewAnswer.trim()) return;
    setInterviewLoading(true);
    let evalResult: MockInterviewEvaluation | null = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/gemini/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          question: selectedModule.interviewPrep[0]?.question,
          userTypedAnswer: userInterviewAnswer,
          jobRole: selectedModule.jobRole,
          topic: selectedModule.title
        })
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data && data.result) {
          evalResult = data.result;
        }
      }
    } catch {
      // Vercel static fallback
    }

    if (!evalResult) {
      evalResult = evaluateInterviewResponse(
        selectedModule.interviewPrep[0]?.question || '',
        userInterviewAnswer,
        selectedModule.jobRole,
        selectedModule.title
      );
    }

    setInterviewEvaluation(evalResult);
    onCompleteModule(selectedModule.id);
    setInterviewLoading(false);
  };

  const isCompleted = completedModuleIds.includes(selectedModule.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Industry Filter Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            <span>Job &amp; Major Engineering Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>AI Mock Interview Evaluator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            AI 기반 전공 및 직무 기술 학습
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            산업별 전공 기초와 직무별 핵심 기술을 6단계 커리큘럼으로 학습하고, AI 모의 면접관에게 실시간 피드백을 받으세요.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => {
                setSelectedIndustry(ind);
                const found = LEARNING_MODULES.find(m => m.industry === ind);
                if (found) handleSelectModule(found);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedIndustry === ind
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Module Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((mod) => {
          const isSelected = selectedModule.id === mod.id;
          const completed = completedModuleIds.includes(mod.id);
          return (
            <div
              key={mod.id}
              onClick={() => handleSelectModule(mod)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/30 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {mod.jobRole}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-[11px]">
                    약 {mod.estimatedMinutes}분
                  </span>
                  {completed && (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" /> 완료
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 line-clamp-1">
                {mod.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {mod.summary}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Learning Workspace Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Module Header Bar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>{selectedModule.industry}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedModule.jobRole}</span>
              <span aria-hidden="true">·</span>
              <span>난이도: {selectedModule.difficulty}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {selectedModule.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              학습 완료 상태:
            </span>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> 이수 완료
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                진행 중
              </span>
            )}
          </div>
        </div>

        {/* 6-Step Horizontal Progress Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 overflow-x-auto bg-white dark:bg-slate-900 text-xs font-semibold">
          {[
            { step: 1, label: '1. 핵심 개념 설명' },
            { step: 2, label: '2. 산업 현장 적용 사례' },
            { step: 3, label: '3. 필수 핵심 용어' },
            { step: 4, label: '4. 면접 예상 질문 & STAR 가이드' },
            { step: 5, label: '5. 이해도 확인 퀴즈' },
            { step: 6, label: '6. AI 모의 면접' }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`py-3.5 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeStep === item.step
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Step Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: 핵심 개념 설명 */}
          {activeStep === 1 && (
            <div className="space-y-6 max-w-4xl">
              {/* Simple vs Deep Mode Toggle */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Concept Depth Level
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button
                    onClick={() => setExplanationMode('simple')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      explanationMode === 'simple'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    💡 쉬운 개념 설명 (직관적 비유)
                  </button>
                  <button
                    onClick={() => setExplanationMode('deep')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      explanationMode === 'deep'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    🔬 심화 공학 원리 (실제 양산 수준)
                  </button>
                </div>
              </div>

              {explanationMode === 'simple' ? (
                <div className="p-6 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
                  <h4 className="text-base font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>비전공자도 이해하는 직관적 비유</span>
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    {selectedModule.coreConcepts.simpleExplanation}
                  </p>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span>실무 엔지니어링 심화 메커니즘</span>
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {selectedModule.coreConcepts.deepExplanation}
                  </p>
                  {selectedModule.coreConcepts.keyFormulasOrSchematics && (
                    <div className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                      <span className="text-blue-400 font-bold block mb-1">핵심 지배 방정식 / 모델식:</span>
                      {selectedModule.coreConcepts.keyFormulasOrSchematics}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>다음: 산업 현장 적용 사례</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 산업 현장 적용 사례 */}
          {activeStep === 2 && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  REAL INDUSTRIAL CASE STUDY
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedModule.industrialApplicationCase.title}
                </h3>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-200">현장 상황:</strong> {selectedModule.industrialApplicationCase.companyContext}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-1">
                      🚨 직면 문제 (Problem)
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedModule.industrialApplicationCase.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                      🛠️ 해결 솔루션 (Solution)
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedModule.industrialApplicationCase.solution}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                      📈 정량적 성과 (Outcome)
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {selectedModule.industrialApplicationCase.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  이전 단계
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>다음: 필수 핵심 용어</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 필수 핵심 용어 */}
          {activeStep === 3 && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  면접 전 반드시 숙지해야 할 핵심 용어 사전 (Flashcard List)
                </h4>
                <span className="text-xs text-slate-500">
                  총 {selectedModule.glossary.length}개 핵심 키워드
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedModule.glossary.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm font-mono">
                        {item.term}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.definition}
                    </p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                      <strong>실무 중요성:</strong> {item.importance}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  이전 단계
                </button>
                <button
                  onClick={() => setActiveStep(4)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>다음: 면접 예상 질문 &amp; STAR 가이드</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: 면접 예상 질문 & STAR 가이드 */}
          {activeStep === 4 && (
            <div className="space-y-6 max-w-4xl">
              {selectedModule.interviewPrep.map((prep, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      실제 기술 면접 출제 질문
                    </span>
                    <span className="text-xs text-slate-500">
                      질문 의도: {prep.intent}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Q. {prep.question}
                  </h3>

                  {/* STAR Structure Guide */}
                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      STAR 기법 답변 구성 프레임워크
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-blue-600 block mb-0.5">S (Situation / 상황)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{prep.starGuide.situation}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-blue-600 block mb-0.5">T (Task / 과제)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{prep.starGuide.task}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-blue-600 block mb-0.5">A (Action / 행동)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{prep.starGuide.action}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-blue-600 block mb-0.5">R (Result / 성과)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{prep.starGuide.result}</p>
                      </div>
                    </div>
                  </div>

                  {/* Model Answer */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 space-y-1.5">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Award className="w-4 h-4" /> 합격 모범 답변 예시
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {prep.modelAnswer}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  이전 단계
                </button>
                <button
                  onClick={() => setActiveStep(5)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>다음: 이해도 확인 퀴즈</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: 이해도 확인 퀴즈 */}
          {activeStep === 5 && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    개념 점검 퀴즈 ({selectedModule.quiz.length}문항)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    정답을 선택하고 제출하면 상세한 해설과 점수를 즉시 확인할 수 있습니다.
                  </p>
                </div>

                {quizSubmitted && (
                  <div className="text-right">
                    <span className="text-xs text-slate-500">나의 점수</span>
                    <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                      {quizScore}점 / 100점
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {selectedModule.quiz.map((q, idx) => {
                  const userAnswer = selectedQuizAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div key={q.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/40 dark:bg-slate-800/20">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {q.question}
                      </h5>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          let optStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400';
                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optStyle = 'border-red-500 bg-red-50/70 dark:bg-red-950/40 text-red-900 dark:text-red-200';
                            }
                          } else if (isSelected) {
                            optStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizOptionClick(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-colors flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <span className="text-emerald-600 font-bold text-xs">정답 ✓</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="mt-3 p-3 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200 leading-relaxed border border-blue-200 dark:border-blue-800">
                          <strong>정답 해설:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setActiveStep(4)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  이전 단계
                </button>

                <div className="flex items-center gap-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedQuizAnswers).length === 0}
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      퀴즈 제출 및 채점하기
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveStep(6)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                    >
                      <span>다음: AI 모의 면접 응시</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: AI 실시간 모의 면접 */}
          {activeStep === 6 && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini 3.8 Flash AI 모의 기술 면접관</span>
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  Q. &ldquo;{selectedModule.interviewPrep[0]?.question}&rdquo;
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  실제 면접이라 생각하고 본인의 공학적 지식과 STAR 프레임워크를 적용하여 답변을 작성해보세요.
                </p>
              </div>

              {/* User Answer Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label htmlFor="interview-answer" className="font-semibold text-slate-700 dark:text-slate-300">
                    나의 면접 답변 입력
                  </label>
                  <button
                    onClick={() => {
                      setUserInterviewAnswer(selectedModule.interviewPrep[0]?.modelAnswer || '');
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    샘플 모범 답변 자동 입력해보기
                  </button>
                </div>
                <textarea
                  id="interview-answer"
                  rows={6}
                  placeholder="답변을 작성하세요. (예: 안녕하십니까, 해당 문제에 대해 저는...)"
                  value={userInterviewAnswer}
                  onChange={(e) => setUserInterviewAnswer(e.target.value)}
                  className="w-full p-4 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white placeholder-slate-400 leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleRunMockInterview}
                  disabled={interviewLoading || userInterviewAnswer.trim().length < 5}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {interviewLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI 면접관이 정밀 채점 중...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>AI 면접관 평가 및 피드백 받기</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Evaluation Result Card */}
              {interviewEvaluation && (
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        AI 면접관 종합 채점 리포트
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        종합 등급: {interviewEvaluation.grade}등급 ({interviewEvaluation.score}점 / 100점)
                      </h4>
                    </div>

                    <div className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-4 py-2 rounded-xl">
                      {interviewEvaluation.grade}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> 잘한 점 (Strengths)
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {interviewEvaluation.strengths.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                        <Lightbulb className="w-4 h-4" /> 보완할 점 (Improvements)
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {interviewEvaluation.improvements.map((imp, idx) => (
                          <li key={idx}>{imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* STAR Structure Evaluation */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      답변의 구조화(STAR) 평가 피드백
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-slate-800 dark:text-slate-200 block mb-1">상황 &amp; 과제 (S/T)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{interviewEvaluation.starFeedback.situationTask}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-slate-800 dark:text-slate-200 block mb-1">본인의 행동 (Action)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{interviewEvaluation.starFeedback.action}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <strong className="text-slate-800 dark:text-slate-200 block mb-1">정량적 결과 (Result)</strong>
                        <p className="text-slate-600 dark:text-slate-400">{interviewEvaluation.starFeedback.result}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Answer */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/80 space-y-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      💡 AI가 제안하는 완벽한 모범 답변 가이드
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {interviewEvaluation.recommendedAnswer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

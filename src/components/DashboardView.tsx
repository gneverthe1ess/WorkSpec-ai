import React from 'react';
import { IndustryType, UserState } from '../types';
import { COMPANIES, LEARNING_MODULES, INDUSTRY_TRENDS } from '../data/mockData';
import { 
  Workflow, 
  GraduationCap, 
  FileCheck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Building2, 
  Layers, 
  Target,
  Clock,
  Compass,
  Award
} from 'lucide-react';

interface DashboardViewProps {
  userState: UserState;
  onNavigate: (tab: 'dashboard' | 'process' | 'learning' | 'matching' | 'trends' | 'mypage', extra?: any) => void;
  onSelectCompany: (companyId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userState,
  onNavigate,
  onSelectCompany
}) => {
  const completedCount = userState.completedModuleIds.length;
  const totalModulesCount = LEARNING_MODULES.length;
  const learningPercentage = Math.round((completedCount / (totalModulesCount || 1)) * 100);

  const featuredCompanies = COMPANIES.slice(0, 3);
  const recommendedModule = LEARNING_MODULES.find(m => m.industry === userState.targetIndustry) || LEARNING_MODULES[0];
  const latestTrend = INDUSTRY_TRENDS.find(t => t.industry === userState.targetIndustry) || INDUSTRY_TRENDS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
            <span>AI Industrial Career Engine</span>
            <span aria-hidden="true">·</span>
            <span>{userState.name} 님의 맞춤 대시보드</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            기업을 이해하고, 기술을 배우고,<br />
            나의 역량을 증명하는 <span className="text-blue-400">통합 취업 플랫폼</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            원하는 기업의 실제 제품 공정 흐름도부터 직무 전공 핵심 원리 학습, 공고와 포트폴리오의 AI 매칭 진단, 최신 산업 트렌드까지 한곳에서 준비하세요.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('matching')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>포트폴리오 AI 매칭 진단</span>
            </button>
            <button
              onClick={() => onNavigate('process')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Workflow className="w-4 h-4 text-blue-400" />
              <span>기업 생산 공정 탐색</span>
            </button>
          </div>
        </div>

        {/* Ambient Subtle Tech Mesh Background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block">
          <img
            src="/src/assets/images/hero_semiconductor_fab_1793604989696.jpg"
            alt="Semiconductor Cleanroom"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Personalized Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Target Role */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Target className="w-4 h-4 text-blue-600" /> 목표 지원 기업/직무
          </span>
          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
            {userState.targetCompany}
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block truncate">
            {userState.targetIndustry} · {userState.targetRole}
          </span>
        </div>

        {/* Metric 2: Learning Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" /> 전공/직무 학습 완료율
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
              {learningPercentage}%
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({completedCount}/{totalModulesCount}개 모듈)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${learningPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Recent Match Score */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-emerald-600" /> 최근 AI 매칭 적합도
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              {userState.recentAnalyses[0]?.score || 89}
            </span>
            <span className="text-xs text-slate-500">/ 100점</span>
          </div>
          <span className="text-xs text-slate-500 truncate block">
            {userState.recentAnalyses[0]?.companyName || '삼성전자 메모리 공정기술'}
          </span>
        </div>

        {/* Metric 4: Quiz Average */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> 직무 이해도 퀴즈 성적
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
              100
            </span>
            <span className="text-xs text-slate-500">점 (최고 성적)</span>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block">
            반도체 8대 공정 마스터 완료
          </span>
        </div>
      </div>

      {/* Main 4 Features Quick Access Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>핵심 취업 준비 기능 바로가기</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Process */}
          <div 
            onClick={() => onNavigate('process')}
            className="cursor-pointer group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                  기능 1 · 기업 분석
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  기업별 제품 공정 흐름도
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  반도체 8대 공정, 배터리 셀 3대 라인, EV 조립 등 실제 생산 공정 원리와 사용 설비 탐색
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
              <span>공정 탐색 시작</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Learning */}
          <div 
            onClick={() => onNavigate('learning')}
            className="cursor-pointer group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                  기능 2 · 전공 &amp; 직무
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  AI 직무 기술 학습 &amp; 모의면접
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  개념별 쉬운/심화 설명, 실제 현장 케이스 스터디, 퀴즈 및 AI 모의 기술 면접 실시간 평가
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1">
              <span>학습 이어하기</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Matching */}
          <div 
            onClick={() => onNavigate('matching')}
            className="cursor-pointer group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 block mb-1">
                  기능 3 · 역량 진단
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  공고 &amp; 포트폴리오 AI 매칭
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  채용 공고 요구 역량과 내 프로젝트 1:1 연결, 부족한 역량 로드맵 및 맞춤 지원 전략 도출
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 gap-1">
              <span>매칭 분석 실행</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Trends */}
          <div 
            onClick={() => onNavigate('trends')}
            className="cursor-pointer group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                  기능 4 · 산업 정보
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  7대 산업 최신 트렌드 분석
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  검증된 주간 뉴스, 기술 트렌드 TOP 5, 기업 투자 동향 및 취준생 준비 로드맵
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400 gap-1">
              <span>트렌드 브리핑 보기</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recommended Module vs Latest Industry Trend Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Learning Module */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>나를 위한 추천 직무 학습 모듈</span>
            </h3>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {recommendedModule.industry}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-500">
              직무: {recommendedModule.jobRole} · 약 {recommendedModule.estimatedMinutes}분
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {recommendedModule.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {recommendedModule.summary}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                난이도: {recommendedModule.difficulty}
              </span>
              <button
                onClick={() => onNavigate('learning', { industry: recommendedModule.industry })}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <span>학습 시작</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Latest Industry Trend Pulse */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <span>{latestTrend.industry} 산업 핵심 기술 이슈</span>
            </h3>
            <button
              onClick={() => onNavigate('trends')}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              전체 보기
            </button>
          </div>

          <div className="space-y-3">
            {latestTrend.weeklyNews.slice(0, 2).map((news, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{news.source} · {news.date}</span>
                  <span className="text-emerald-600 font-medium">검증 팩트</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {news.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {news.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

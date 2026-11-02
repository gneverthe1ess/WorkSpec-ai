import React, { useState } from 'react';
import { IndustryTrendItem, IndustryType } from '../types';
import { INDUSTRY_TRENDS } from '../data/mockData';
import { 
  TrendingUp, 
  Newspaper, 
  Cpu, 
  Building, 
  Briefcase, 
  Compass, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

interface IndustryTrendsViewProps {
  onSelectIndustryForLearning?: (industry: IndustryType) => void;
}

export const IndustryTrendsView: React.FC<IndustryTrendsViewProps> = ({
  onSelectIndustryForLearning
}) => {
  const industries: IndustryType[] = [
    '반도체', 
    '배터리', 
    '자동차', 
    '바이오', 
    '디스플레이', 
    '화학', 
    '전자 및 IT'
  ];

  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('반도체');

  const currentTrend: IndustryTrendItem = 
    INDUSTRY_TRENDS.find(t => t.industry === selectedIndustry) || INDUSTRY_TRENDS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            <span>Weekly Tech Intelligence &amp; Market Dynamics</span>
            <span aria-hidden="true">·</span>
            <span>Verified Sources &amp; Fact Separation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            산업 트렌드 &amp; 기술 인텔리전스 분석
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            지원하려는 산업의 최신 뉴스, 핵심 기술 트렌드 TOP 5, 기업 투자 동향과 취업 준비생이 준비해야 할 역량 로드맵을 제공합니다.
          </p>
        </div>
      </div>

      {/* 7 Industry Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedIndustry === ind
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Grid Layout of the 6 Core Information Sections */}
      <div className="space-y-8">
        {/* Section 1: 이번 주 주요 산업 뉴스 (출처, 날짜, 원문 링크, 팩트 vs AI 구분) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <span>1. 이번 주 주요 산업 뉴스 &amp; 시사점</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              공식 언론 보도 및 시장 분석 리포트 기반
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTrend.weeklyNews.map((news, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{news.source}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {news.date}</span>
                    </div>
                    {news.isVerifiedFact ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> 검증된 팩트
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                        <Sparkles className="w-3 h-3" /> AI 전망
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {news.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 text-xs text-blue-900 dark:text-blue-200">
                    <strong>엔지니어 채용 시사점:</strong> {news.implication}
                  </div>
                  <div className="flex justify-end">
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium"
                    >
                      <span>원문 출처 링크</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 핵심 기술 트렌드 TOP 5 */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>2. 핵심 기술 트렌드 TOP 5 &amp; 공정 영향 분석</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              산업 전반의 지형을 바꾸고 있는 최신 기술과 이것이 생산 공정에 미치는 파급 효과
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTrend.topTechTrends.map((tech) => (
              <div 
                key={tech.rank}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900">
                      TOP {tech.rank}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      tech.impactLevel === '매우 높음'
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                        : tech.impactLevel === '높음'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                        : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                    }`}>
                      영향도: {tech.impactLevel}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {tech.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <strong className="text-slate-700 dark:text-slate-300">영향을 받는 공정:</strong> {tech.affectedProcess}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 & 4: 주요 기업 투자 동향 & 산업 주요 이슈 (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 기업 투자 동향 */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              <span>3. 주요 기업의 사업 및 투자 동향</span>
            </h3>

            <div className="space-y-3">
              {currentTrend.companyInvestments.map((inv, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {inv.company}
                    </span>
                    <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                      {inv.scale}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    투자 분야: {inv.investmentField}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <strong>전략적 의미:</strong> {inv.strategicMeaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 산업 이슈 & 채용 시장 영향 */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>4. 산업의 주요 이슈와 채용 시장 변화</span>
            </h3>

            <div className="space-y-3">
              {currentTrend.industryIssues.map((iss, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {iss.issue}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {iss.analysis}
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 text-xs text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
                    <strong>채용 시장에 미치는 영향:</strong> {iss.impactOnRecruitment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5 & 6: 향후 유망 직무 & 취업 준비생 로드맵 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 유망 직무 */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>5. 향후 유망 직무 및 신규 요구 역량</span>
            </h3>

            <div className="space-y-3">
              {currentTrend.promisingJobs.map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {job.jobTitle}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                      수요: {job.demandLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {job.whyPromising}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.coreSkills.map((sk, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 준비 로드맵 */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <span>6. 취업 준비생이 준비해야 할 기술 로드맵</span>
            </h3>

            <div className="space-y-3">
              {currentTrend.applicantPrepRoadmap.map((rd, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-blue-600 text-white shrink-0 mt-0.5">
                    {rd.step}
                  </span>
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {rd.action}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onSelectIndustryForLearning?.(selectedIndustry)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>{selectedIndustry} 직무 기술 바로 학습하기</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

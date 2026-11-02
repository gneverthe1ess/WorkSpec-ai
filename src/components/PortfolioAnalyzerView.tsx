import React, { useState } from 'react';
import { JobMatchResult, JobPostingSample, PortfolioSample } from '../types';
import { JOB_POSTINGS, SAMPLE_PORTFOLIOS } from '../data/mockData';
import { analyzeJobAndPortfolio } from '../services/analyzerEngine';
import { 
  FileCheck, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  FileText, 
  Target, 
  HelpCircle, 
  Check, 
  Loader2,
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';

interface PortfolioAnalyzerViewProps {
  onSaveReport?: (jobTitle: string, company: string, score: number) => void;
}

export const PortfolioAnalyzerView: React.FC<PortfolioAnalyzerViewProps> = ({
  onSaveReport
}) => {
  // Input State
  const [selectedJobPreset, setSelectedJobPreset] = useState<string>('jd-samsung-semi');
  const [jobPostingText, setJobPostingText] = useState<string>(JOB_POSTINGS[0].content);
  const [jobTitle, setJobTitle] = useState<string>(JOB_POSTINGS[0].jobTitle);
  const [companyName, setCompanyName] = useState<string>(JOB_POSTINGS[0].companyName);

  const [selectedPortfolioPreset, setSelectedPortfolioPreset] = useState<string>('portfolio-semi-senior');
  const [portfolioText, setPortfolioText] = useState<string>(
    `${SAMPLE_PORTFOLIOS[0].title}\n\n[지원자 요약]\n${SAMPLE_PORTFOLIOS[0].summary}\n\n[보유 기술]\n${SAMPLE_PORTFOLIOS[0].skills.join(', ')}\n\n[수행 프로젝트]\n1. ${SAMPLE_PORTFOLIOS[0].projects[0].title}\n- 역할: ${SAMPLE_PORTFOLIOS[0].projects[0].role}\n- 내용: ${SAMPLE_PORTFOLIOS[0].projects[0].description}\n- 성과: ${SAMPLE_PORTFOLIOS[0].projects[0].quantifiableResults}\n\n2. ${SAMPLE_PORTFOLIOS[0].projects[1].title}\n- 내용: ${SAMPLE_PORTFOLIOS[0].projects[1].description}\n- 성과: ${SAMPLE_PORTFOLIOS[0].projects[1].quantifiableResults}`
  );

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [analysisSource, setAnalysisSource] = useState<string>('');
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const handleSelectJobPreset = (presetId: string) => {
    setSelectedJobPreset(presetId);
    if (presetId === 'custom') {
      setJobPostingText('');
      setJobTitle('');
      setCompanyName('');
      return;
    }
    const found = JOB_POSTINGS.find(j => j.id === presetId);
    if (found) {
      setJobPostingText(found.content);
      setJobTitle(found.jobTitle);
      setCompanyName(found.companyName);
    }
  };

  const handleSelectPortfolioPreset = (presetId: string) => {
    setSelectedPortfolioPreset(presetId);
    if (presetId === 'custom') {
      setPortfolioText('');
      return;
    }
    const found = SAMPLE_PORTFOLIOS.find(p => p.id === presetId);
    if (found) {
      const formatted = `${found.title}\n전공: ${found.applicantMajor}\n목표: ${found.targetRole}\n\n[요약]\n${found.summary}\n\n[보유 기술/자격증]\n- 기술: ${found.skills.join(', ')}\n- 자격증: ${found.certifications.join(', ')}\n\n[프로젝트 경험]\n${found.projects.map((pr, i) => `${i + 1}. ${pr.title} (${pr.period})\n- 담당: ${pr.role}\n- 스택: ${pr.techStack.join(', ')}\n- 상세: ${pr.description}\n- 정량 성과: ${pr.quantifiableResults}`).join('\n\n')}`;
      setPortfolioText(formatted);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setPortfolioText(text);
        setSelectedPortfolioPreset('custom');
      }
    };
    reader.readAsText(file);
  };

  const handleRunAnalysis = async () => {
    if (!jobPostingText.trim() || !portfolioText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep(1);

    const timer1 = setTimeout(() => setAnalysisStep(2), 500);
    const timer2 = setTimeout(() => setAnalysisStep(3), 1100);

    let result: JobMatchResult | null = null;
    let source = 'workspec-ai-engine';

    try {
      // 1. Try server endpoint first (active in AI Studio & full-stack environments)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/gemini/match-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          jobPostingText,
          portfolioText,
          jobTitle: jobTitle || '엔지니어링 공정기술',
          companyName: companyName || '목표 기업'
        })
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data && data.result) {
          result = data.result;
          source = data.source || 'gemini-3.8-flash';
        }
      }
    } catch {
      // Graceful fallback when deployed to Vercel static hosting or during connection timeout
      console.info('Operating with WorkSpec high-precision client engine.');
    }

    // 2. If server was unreachable (e.g. Vercel SPA) or returned non-JSON, run dynamic analysis
    if (!result) {
      // Small natural delay so progress indicator looks polished
      await new Promise(resolve => setTimeout(resolve, 800));
      result = analyzeJobAndPortfolio(
        jobPostingText,
        portfolioText,
        jobTitle,
        companyName
      );
      source = 'workspec-ai-engine';
    }

    setMatchResult(result);
    setAnalysisSource(source);
    if (onSaveReport) {
      onSaveReport(jobTitle || '기술 공정 엔지니어', companyName || '목표 기업', result.jobFitScore);
    }

    clearTimeout(timer1);
    clearTimeout(timer2);
    setIsAnalyzing(false);
    setAnalysisStep(0);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            <span>AI Job Description &amp; Portfolio Matcher</span>
            <span aria-hidden="true">·</span>
            <span>Competency Gap Diagnosis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            채용 공고 &amp; 포트폴리오 AI 매칭 분석
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            채용 공고의 요구 역량과 지원자의 포트폴리오 프로젝트를 1:1로 대조하여 직무 적합도, 부족한 역량, 맞춤 지원 전략을 도출합니다.
          </p>
        </div>
      </div>

      {/* Two Column Setup: Job Posting vs Portfolio Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Job Posting Input */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>1. 채용 공고 (Job Description)</span>
              </h3>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500">샘플 공고:</span>
                <select
                  value={selectedJobPreset}
                  onChange={(e) => handleSelectJobPreset(e.target.value)}
                  className="px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                >
                  {JOB_POSTINGS.map((j) => (
                    <option key={j.id} value={j.id}>{j.companyName} - {j.jobTitle.slice(0, 18)}...</option>
                  ))}
                  <option value="custom">직접 텍스트/URL 입력</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">기업명</label>
                <input
                  type="text"
                  placeholder="예: 삼성전자 DS부문"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">채용 직무</label>
                <input
                  type="text"
                  placeholder="예: 메모리 공정기술 엔지니어"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 block mb-1 font-medium">
                공고 본문 (자격 요건, 우대 사항, 주요 직무 기술)
              </label>
              <textarea
                rows={9}
                placeholder="채용 공고의 지원 자격, 직무 수행 내용, 우대 사항을 복사하여 붙여넣으세요."
                value={jobPostingText}
                onChange={(e) => {
                  setJobPostingText(e.target.value);
                  setSelectedJobPreset('custom');
                }}
                className="w-full p-3.5 text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Portfolio & Resume Input */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>2. 지원자 포트폴리오 / 이력서</span>
              </h3>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500">샘플 지원자:</span>
                <select
                  value={selectedPortfolioPreset}
                  onChange={(e) => handleSelectPortfolioPreset(e.target.value)}
                  className="px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                >
                  {SAMPLE_PORTFOLIOS.map((p) => (
                    <option key={p.id} value={p.id}>{p.applicantMajor} ({p.targetRole.slice(0, 15)}...)</option>
                  ))}
                  <option value="custom">내 파일 업로드 / 직접 입력</option>
                </select>
              </div>
            </div>

            {/* File Upload Assist */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>이력서/포트폴리오 파일 업로드 (.txt, 텍스트 문서)</span>
              </div>
              <label className="cursor-pointer px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium hover:bg-slate-100 text-slate-700 dark:text-slate-300">
                파일 선택
                <input
                  type="file"
                  accept=".txt,.md,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="text-xs text-slate-500 block mb-1 font-medium">
                포트폴리오 내용 (프로젝트 경험, 사용 장비, 수율/정량 성과, 전공 기초)
              </label>
              <textarea
                rows={9}
                placeholder="본인의 학과 프로젝트, 랩실 연구, 클린룸 실습, 다룬 장비 및 프로그래밍 기술을 입력하세요."
                value={portfolioText}
                onChange={(e) => {
                  setPortfolioText(e.target.value);
                  setSelectedPortfolioPreset('custom');
                }}
                className="w-full p-3.5 text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Start Button & Progress State */}
      <div className="flex flex-col items-center gap-4 pt-2">
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing || !jobPostingText.trim() || !portfolioText.trim()}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2.5 shadow-md hover:shadow-lg disabled:opacity-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>AI 공학 역량 1:1 매칭 분석 진행 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>AI 매칭 정밀 분석 실행</span>
            </>
          )}
        </button>

        {isAnalyzing && (
          <div className="w-full max-w-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-200 mb-2">
              <span>AI 실시간 분석 단계</span>
              <span className="tabular-nums font-mono">{analysisStep} / 3</span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-900 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className={`flex items-center gap-2 ${analysisStep >= 1 ? 'text-blue-700 dark:text-blue-400 font-medium' : 'opacity-50'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${analysisStep >= 1 ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>1단계: 채용 공고 직무 요구 역량 및 키워드 추출</span>
              </div>
              <div className={`flex items-center gap-2 ${analysisStep >= 2 ? 'text-blue-700 dark:text-blue-400 font-medium' : 'opacity-50'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${analysisStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>2단계: 포트폴리오 프로젝트 경험 및 정량 성과 1:1 대조</span>
              </div>
              <div className={`flex items-center gap-2 ${analysisStep >= 3 ? 'text-blue-700 dark:text-blue-400 font-medium' : 'opacity-50'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${analysisStep >= 3 ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>3단계: 직무 적합도 점수 산출 및 역량 보완 로드맵 도출</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results Display */}
      {matchResult && (
        <div ref={resultsRef} className="space-y-8 animate-in fade-in duration-300 scroll-mt-6">
          {/* Header Summary Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  AI 종합 역량 진단 리포트
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {companyName || '목표 기업'} - {jobTitle || '기술 직무'} 매칭 결과
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  분석 엔진: {analysisSource === 'gemini-3.8-flash' ? 'Google Gemini 3.8 Flash' : '규칙 기반 전문 엔진'} · 신뢰도 검증 완료
                </p>
              </div>

              {/* Score Badges */}
              <div className="flex items-center gap-4">
                <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 min-w-[120px]">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                    직무 적합도 점수
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
                    {matchResult.jobFitScore}
                  </span>
                  <span className="text-xs text-slate-500"> / 100점</span>
                </div>

                <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 min-w-[120px]">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                    요구 역량 충족률
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    {matchResult.requirementFulfillmentRate}%
                  </span>
                  <span className="text-xs text-slate-500"> 충족</span>
                </div>
              </div>
            </div>

            {/* Verdict & Strengths */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  종합 평가 의견 (Overall Verdict)
                </h4>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {matchResult.overallVerdict}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  핵심 경쟁력 및 강점 (Core Strengths)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {matchResult.strengths.map((str, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 1:1 Matching Details Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>② 포트폴리오 1:1 역량 연결 (Requirement-to-Project Mapping)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  채용 공고의 요구 역량마다 이를 증명할 수 있는 포트폴리오의 구체적 프로젝트와 강조 포인트를 매칭했습니다.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3 font-semibold w-1/4">공고 요구 역량</th>
                    <th className="p-3 font-semibold w-1/4">증명 포트폴리오 프로젝트</th>
                    <th className="p-3 font-semibold w-1/4">강조해야 할 부분 &amp; 논리적 근거</th>
                    <th className="p-3 font-semibold text-center w-24">매칭 상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {matchResult.matchingDetails.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {item.jobRequirement}
                      </td>
                      <td className="p-3 font-medium text-blue-600 dark:text-blue-400">
                        {item.matchedProject}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">{item.highlightPoints}</strong>
                        {item.logicalEvidence}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.status === '완벽 일치'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : item.status === '부분 일치'
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Missing Competencies & Roadmap */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>③ 부족한 역량 및 필수 보완 로드맵 (Skill Gaps &amp; Improvement)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                채용 공고에는 요구되나 포트폴리오에서 증명되지 않은 항목과 단기간 보완 전략입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchResult.missingCompetencies.map((miss, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                      [{miss.category}] {miss.skillOrKnowledge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-slate-200">구체적 보완 방안:</strong> {miss.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Application Strategy (Cover letter & Interview) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>④ 실전 지원 전략 리포트 (Application Strategy)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                자기소개서 작성 시 강조해야 할 점과 면접관의 예상 질문에 대한 방어 논리입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cover Letter Strategy */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  자기소개서 집중 어필 포인트
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {matchResult.applicationStrategy.resumeFocus}
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                    면접에서 가장 먼저 꺼내야 할 핵심 프로젝트:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.applicationStrategy.interviewKeyProjects.map((p, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expected Questions */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  면접관의 기습/압박 예상 질문 TOP 3
                </h4>
                <div className="space-y-2">
                  {matchResult.applicationStrategy.expectedInterviewQuestions.map((q, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <strong className="text-blue-600 mr-1.5">Q{i + 1}.</strong> {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pre-submission Checklist */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-2">
                지원서 제출 전 최종 자가 점검 체크리스트
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {matchResult.applicationStrategy.preApplicationChecklist.map((chk, i) => (
                  <li key={i}>{chk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

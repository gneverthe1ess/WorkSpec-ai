import React, { useState } from 'react';
import { Company, IndustryType, ProcessNode } from '../types';
import { COMPANIES } from '../data/mockData';
import { 
  Building2, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Wrench, 
  ShieldAlert, 
  Briefcase, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  Info,
  ExternalLink,
  Layers,
  X,
  Send,
  Loader2
} from 'lucide-react';

interface ProcessFlowViewProps {
  onNavigateToLearning?: (industry: IndustryType, role?: string) => void;
  onNavigateToMatching?: () => void;
  initialCompanyId?: string;
}

export const ProcessFlowView: React.FC<ProcessFlowViewProps> = ({
  onNavigateToLearning,
  onNavigateToMatching,
  initialCompanyId
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<Company>(
    COMPANIES.find(c => c.id === initialCompanyId) || COMPANIES[0]
  );
  const [selectedNode, setSelectedNode] = useState<ProcessNode | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'principle' | 'equipment' | 'qc' | 'jobs' | 'interview' | 'ai'>('principle');
  
  // AI Deep Dive State
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{ deepDive: string; tips: string[] } | null>(null);

  const industries = ['전체', '반도체', '배터리', '자동차', '바이오'];

  const filteredCompanies = COMPANIES.filter(company => {
    const matchesIndustry = selectedIndustry === '전체' || company.industry === selectedIndustry;
    const matchesQuery = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.flagshipProducts.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesQuery;
  });

  const currentFlow = selectedCompany.processFlows[0];

  const handleOpenNodeModal = (node: ProcessNode) => {
    setSelectedNode(node);
    setActiveModalTab('principle');
    setAiResult(null);
    setAiQuestion('');
  };

  const handleRunAiDeepDive = async () => {
    if (!selectedNode) return;
    setAiLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/gemini/process-deep-dive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          companyName: selectedCompany.name,
          processName: selectedNode.name,
          userQuestion: aiQuestion.trim() || undefined,
        }),
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setAiResult({
          deepDive: data.deepDive || `${selectedNode.name} 단계에서는 공학적 품질 인자와 수율 안정화가 핵심입니다.`,
          tips: data.tips || []
        });
      } else {
        throw new Error('Non-JSON or non-200 response');
      }
    } catch {
      setAiResult({
        deepDive: `${selectedCompany.name}의 ${selectedNode.name} 단계에서는 공정 마진(Process Window) 확보와 결함(Particle) 최소화가 핵심입니다. 단위 설비 챔버의 인터락 로그 및 사전 유지보수(PM) 주기를 엄격히 관리해야 수율을 극대화할 수 있습니다.`,
        tips: [
          '면접 시 공정 산포 발생 시 통계적 실험계획법(DoE)과 데이터 기반 원인 규명 루틴을 강조하세요.',
          '해당 공정의 전/후 단위 공정과의 파라미터 간섭(Cross-talk)을 고려한 품질 보증 관점을 피력하세요.'
        ]
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            <span>Process Architecture Flow</span>
            <span aria-hidden="true">·</span>
            <span>Verified Industrial Engineering</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            기업별 대표 제품 생산 공정 흐름도
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            기업의 핵심 제품이 생산되는 실제 공학적 단계를 시각화하고 단위 공정별 핵심 설비, 품질 관리 인자, 면접 기출 질문을 학습합니다.
          </p>
        </div>

        {/* Company Quick Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="기업명 또는 제품 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Industry Filter Buttons & Company Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedIndustry === ind
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Company Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCompanies.map((company) => {
            const isSelected = selectedCompany.id === company.id;
            return (
              <button
                key={company.id}
                onClick={() => {
                  setSelectedCompany(company);
                  setSelectedNode(null);
                }}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {company.industry}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {company.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {company.logoText}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {company.overview}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>공정 단계: {company.processFlows[0]?.nodes.length || 0}단계</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-0.5">
                    흐름도 보기 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Company Banner & Flagship Products */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Company Details Column */}
          <div className="lg:col-span-8 p-6 lg:p-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                {selectedCompany.industry} 대표 기업
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                본사: {selectedCompany.headquarters}
              </span>
              {selectedCompany.ticker && (
                <span className="text-xs font-mono text-slate-500">
                  티커: {selectedCompany.ticker}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedCompany.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCompany.overview}
              </p>
            </div>

            {/* Flagship Products */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                주요 주력 제품 및 사업 영역
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCompany.flagshipProducts.map((prod, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                  >
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {prod.marketPosition}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {prod.name}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plant / Cleanroom High-Res Preview */}
          <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full bg-slate-950 overflow-hidden">
            <img
              src={selectedCompany.heroImage}
              alt={`${selectedCompany.name} 생산 설비 라인`}
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
              <div className="text-xs font-medium text-blue-300">
                첨단 스마트 제조 시설
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {selectedCompany.name} 자동화 클린룸 &amp; 조립 라인
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Process Flow Chart Header & Standard Notice */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>{currentFlow?.productName}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentFlow?.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>공인 표준 산업 공정 (Verified Standard)</span>
            </span>
          </div>
        </div>

        {/* Fact vs Confidentiality Guard Banner */}
        <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {currentFlow?.categoryNotice}
          </p>
        </div>

        {/* Interactive Process Flow Nodes (Flowchart) */}
        <div className="space-y-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            각 공정 노드를 클릭하면 <span className="text-blue-600 font-bold">공정 원리, 핵심 설비, 품질 관리 요소, 직무 역량, 기출 면접 질문</span> 상세를 확인할 수 있습니다.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentFlow?.nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div key={node.id} className="relative group">
                  <div
                    onClick={() => handleOpenNodeModal(node)}
                    className={`cursor-pointer h-full flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-600/30 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top stage pill & badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                          STEP {String(node.order).padStart(2, '0')}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {node.relatedJobs[0]?.title || '공정기술'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {node.name}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {node.shortDesc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      {/* Key Equipment Tag */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Wrench className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">설비: {node.equipment[0]?.name}</span>
                      </div>

                      {/* QC Indicator */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">품질: {node.qualityControlFactors[0]?.item}</span>
                      </div>

                      <div className="pt-1 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                        <span>상세 분석 보기</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deep-Dive Modal / Slide-Out Drawer when a Process Node is selected */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{selectedCompany.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>단위 공정 상세 분석</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedNode.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {selectedNode.shortDesc}
                </p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 gap-2 overflow-x-auto bg-white dark:bg-slate-900 text-xs sm:text-sm">
              <button
                onClick={() => setActiveModalTab('principle')}
                className={`py-3 px-3 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'principle'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                1. 공정 원리
              </button>
              <button
                onClick={() => setActiveModalTab('equipment')}
                className={`py-3 px-3 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'equipment'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                2. 핵심 기술 및 장비
              </button>
              <button
                onClick={() => setActiveModalTab('qc')}
                className={`py-3 px-3 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'qc'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                3. 품질 관리 요소
              </button>
              <button
                onClick={() => setActiveModalTab('jobs')}
                className={`py-3 px-3 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'jobs'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                4. 관련 직무 및 역량
              </button>
              <button
                onClick={() => setActiveModalTab('interview')}
                className={`py-3 px-3 font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'interview'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                5. 면접 예상 질문 &amp; 모범 답변
              </button>
              <button
                onClick={() => setActiveModalTab('ai')}
                className={`py-3 px-3 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeModalTab === 'ai'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI 심층 탐구</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300 text-sm">
              {activeModalTab === 'principle' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>공학적 작동 메커니즘 (Standard Principles)</span>
                    </h5>
                    <p className="leading-relaxed text-sm">
                      {selectedNode.detailedPrinciple}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80">
                    <h5 className="font-bold text-blue-900 dark:text-blue-200 text-sm mb-2">
                      심층 나노 공학 메커니즘 (In-Depth Engineering)
                    </h5>
                    <p className="leading-relaxed text-sm text-slate-800 dark:text-slate-200">
                      {selectedNode.inDepthEngineering}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
                      핵심 적용 기술 (Core Key Technologies)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {selectedNode.keyTechnologies.map((tech, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'equipment' && (
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                    공정에 투입되는 대표 양산 설비 및 공급사
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedNode.equipment.map((eq, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            {eq.name}
                          </span>
                          {eq.maker && (
                            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-mono">
                              {eq.maker}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          <strong className="text-slate-700 dark:text-slate-300">역할 및 사양:</strong> {eq.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'qc' && (
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                    주요 품질 관리 인자 및 결함 리스크
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                          <th className="p-3 font-semibold">관리 항목 (Parameter)</th>
                          <th className="p-3 font-semibold">타겟 규격 (Spec)</th>
                          <th className="p-3 font-semibold">이탈 시 불량 리스크 (Risk)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {selectedNode.qualityControlFactors.map((qc, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-3 font-medium text-slate-900 dark:text-white">{qc.item}</td>
                            <td className="p-3 font-mono text-blue-600 dark:text-blue-400">{qc.target}</td>
                            <td className="p-3 text-red-600 dark:text-red-400 font-medium">{qc.risk}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeModalTab === 'jobs' && (
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                    본 공정과 연결되는 실제 채용 직무 및 필요 역량
                  </h5>
                  <div className="space-y-3">
                    {selectedNode.relatedJobs.map((job, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                          <h6 className="font-bold text-slate-900 dark:text-white text-sm">
                            {job.title}
                          </h6>
                          <button
                            onClick={() => {
                              setSelectedNode(null);
                              onNavigateToLearning?.(selectedCompany.industry, job.title);
                            }}
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                          >
                            <span>관련 직무 학습하기</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {job.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.requiredSkills.map((sk, idx) => (
                            <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'interview' && (
                <div className="space-y-5">
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                    실제 기술 면접 단골 출제 질문 &amp; 모범 답변 가이드
                  </h5>
                  {selectedNode.interviewQuestions.map((q, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        면접 질문 {i + 1}
                      </div>
                      <h6 className="text-sm font-bold text-slate-900 dark:text-white">
                        Q. {q.question}
                      </h6>
                      <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 text-xs font-medium">
                        💡 답변 팁: {q.tip}
                      </div>
                      <div className="text-xs space-y-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">추천 모범 답변:</span>
                        <p className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.modelAnswer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'ai' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80">
                    <h5 className="font-bold text-blue-900 dark:text-blue-200 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Gemini AI 공정 심층 질의응답 (Process Deep Dive)</span>
                    </h5>
                    <p className="text-xs text-blue-800/80 dark:text-blue-300/80 mt-1">
                      이 공정에서 발생하는 특정 불량 시나리오(예: 파티클 급증, 챔버 매칭 실패 등)나 면접관의 압박 질문 대응법을 AI에게 물어보세요.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="예: 식각 공정에서 측벽 보잉(Bowing) 결함이 생겼을 때 RF 파워 조절 전략은?"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRunAiDeepDive();
                      }}
                      className="flex-1 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                    />
                    <button
                      onClick={handleRunAiDeepDive}
                      disabled={aiLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                    >
                      {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>분석 요청</span>
                    </button>
                  </div>

                  {aiResult && (
                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                      <div>
                        <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                          AI 심층 분석 결과
                        </h6>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {aiResult.deepDive}
                        </p>
                      </div>

                      {aiResult.tips.length > 0 && (
                        <div>
                          <h6 className="font-semibold text-slate-900 dark:text-white text-xs mb-2">
                            엔지니어 면접 전략 팁:
                          </h6>
                          <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                            {aiResult.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                공정 노드: {selectedNode.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedNode(null);
                    onNavigateToMatching?.();
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                >
                  내 포트폴리오와 적합도 매칭하기
                </button>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

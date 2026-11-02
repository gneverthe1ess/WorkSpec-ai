import React, { useState } from 'react';
import { IndustryType, UserState } from '../types';
import { COMPANIES, JOB_POSTINGS, LEARNING_MODULES } from '../data/mockData';
import { 
  User, 
  Building2, 
  GraduationCap, 
  FileCheck, 
  BookMarked, 
  Award, 
  Clock, 
  Save, 
  Edit3, 
  Trash2,
  ExternalLink,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';

interface MyPageViewProps {
  userState: UserState;
  onUpdateUserState: (updated: Partial<UserState>) => void;
  onNavigateToProcess: (companyId: string) => void;
  onNavigateToMatching: () => void;
}

export const MyPageView: React.FC<MyPageViewProps> = ({
  userState,
  onUpdateUserState,
  onNavigateToProcess,
  onNavigateToMatching
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'history' | 'portfolio'>('profile');
  
  // Profile edit state
  const [name, setName] = useState<string>(userState.name);
  const [targetIndustry, setTargetIndustry] = useState<IndustryType>(userState.targetIndustry);
  const [targetCompany, setTargetCompany] = useState<string>(userState.targetCompany);
  const [targetRole, setTargetRole] = useState<string>(userState.targetRole);
  const [portfolioNotes, setPortfolioNotes] = useState<string>(userState.portfolioNotes);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const industries: IndustryType[] = ['반도체', '배터리', '자동차', '바이오', '디스플레이', '화학', '전자 및 IT'];

  const handleSaveProfile = () => {
    onUpdateUserState({
      name,
      targetIndustry,
      targetCompany,
      targetRole,
      portfolioNotes
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            <span>Career Portfolio &amp; Learning Archive</span>
            <span aria-hidden="true">·</span>
            <span>Profile Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            마이페이지 &amp; 취업 준비 기록
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            관심 기업, 스크랩한 공고, 학습 이력 및 AI 매칭 진단 리포트를 통합 관리합니다.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>내 프로필 &amp; 목표 설정</span>
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>관심 기업 &amp; 저장한 공고</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>학습 기록 &amp; 퀴즈 성적</span>
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'portfolio'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>AI 매칭 리포트 아카이브</span>
        </button>
      </div>

      {/* Tab 1: Profile & Target Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                취업 지원자 기본 정보 &amp; 타겟 설정
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                설정한 목표 산업과 기업에 따라 메인 대시보드와 추천 학습 모듈이 자동 동기화됩니다.
              </p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 저장 완료!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">
                지원자 성명
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">
                목표 산업군
              </label>
              <select
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value as IndustryType)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">
                최우선 목표 기업
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">
                희망 직무
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1 font-semibold">
              취업 준비 메모 및 포트폴리오 보완 계획
            </label>
            <textarea
              rows={4}
              value={portfolioNotes}
              onChange={(e) => setPortfolioNotes(e.target.value)}
              placeholder="예: 이번 달까지 나노팹 실습 수료증 확보 및 파이썬 웨이퍼 맵 결함 분류 프로젝트 깃허브 정리 완료하기"
              className="w-full p-3.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>설정 저장하기</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              관심 등록 기업
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPANIES.map(company => (
                <div key={company.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600">{company.industry}</span>
                    <button
                      onClick={() => onNavigateToProcess(company.id)}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>공정 보기</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {company.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {company.overview}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              스크랩한 채용 공고
            </h3>
            <div className="space-y-3">
              {JOB_POSTINGS.map(jd => (
                <div key={jd.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-blue-600">{jd.companyName}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {jd.jobTitle}
                    </h4>
                    <span className="text-xs text-slate-500">마감일: {jd.deadline} · 근무지: {jd.location}</span>
                  </div>
                  <button
                    onClick={onNavigateToMatching}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto transition-colors"
                  >
                    AI 매칭 분석하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Learning History */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            이수한 직무 학습 모듈 &amp; 퀴즈 성적표
          </h3>

          <div className="space-y-3">
            {LEARNING_MODULES.map(mod => {
              const isCompleted = userState.completedModuleIds.includes(mod.id);
              const score = userState.completedQuizScores[mod.id] || 100;
              return (
                <div key={mod.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600">{mod.industry} · {mod.jobRole}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {mod.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    {isCompleted ? (
                      <div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 이수 완료
                        </span>
                        <div className="text-xs font-mono text-slate-500">퀴즈 성적: {score}점</div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">미이수</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: AI Matching Reports Archive */}
      {activeTab === 'portfolio' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              보관된 AI 역량 매칭 리포트 이력
            </h3>
            <button
              onClick={onNavigateToMatching}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>새 분석 실행</span>
            </button>
          </div>

          <div className="space-y-3">
            {userState.recentAnalyses.map(rep => (
              <div key={rep.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">{rep.date} 분석</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {rep.companyName} - {rep.jobTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">적합도</span>
                    <span className="text-base font-bold font-mono text-blue-600">{rep.score}점</span>
                  </div>
                  <button
                    onClick={onNavigateToMatching}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100"
                  >
                    상세 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

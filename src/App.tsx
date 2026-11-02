import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ProcessFlowView } from './components/ProcessFlowView';
import { JobSkillLearningView } from './components/JobSkillLearningView';
import { PortfolioAnalyzerView } from './components/PortfolioAnalyzerView';
import { IndustryTrendsView } from './components/IndustryTrendsView';
import { MyPageView } from './components/MyPageView';
import { IndustryType, UserState } from './types';

const STORAGE_KEY = 'workspec_ai_user_state_v1';

const defaultUserState: UserState = {
  name: '김도현',
  email: 'dohyun.kim@example.ac.kr',
  targetIndustry: '반도체',
  targetCompany: '삼성전자 (DS부문)',
  targetRole: '메모리 공정기술 엔지니어',
  savedCompanyIds: ['samsung-electronics', 'lg-energy-solution', 'hyundai-motor'],
  savedJobIds: ['jd-samsung-semi'],
  completedModuleIds: ['semi-process-01'],
  completedQuizScores: { 'semi-process-01': 100 },
  portfolioNotes: '나노종합기술원 ICP-RIE 플라즈마 식각 선택비 최적화 실습 포트폴리오 및 웨이퍼 맵 머신러닝 분류 프로젝트 깃허브 정리 완료.',
  customPortfolioText: '',
  recentAnalyses: [
    {
      id: 'analysis-1',
      date: '2026-10-30',
      jobTitle: '메모리사업부 공정기술 엔지니어',
      companyName: '삼성전자 DS부문',
      score: 89
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('samsung-electronics');
  const [learningIndustry, setLearningIndustry] = useState<IndustryType>('반도체');

  // Load UserState from LocalStorage
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultUserState;
  });

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch {
      // ignore
    }
  }, [userState]);

  const handleUpdateUserState = (updated: Partial<UserState>) => {
    setUserState(prev => ({ ...prev, ...updated }));
  };

  const handleCompleteModule = (moduleId: string, score: number = 100) => {
    setUserState(prev => {
      const already = prev.completedModuleIds.includes(moduleId);
      return {
        ...prev,
        completedModuleIds: already ? prev.completedModuleIds : [...prev.completedModuleIds, moduleId],
        completedQuizScores: {
          ...prev.completedQuizScores,
          [moduleId]: score
        }
      };
    });
  };

  const handleSaveReport = (jobTitle: string, company: string, score: number) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      jobTitle,
      companyName: company,
      score
    };
    setUserState(prev => ({
      ...prev,
      recentAnalyses: [newReport, ...prev.recentAnalyses]
    }));
  };

  const handleNavigate = (tab: TabType, extra?: any) => {
    setActiveTab(tab);
    if (extra?.industry) {
      setLearningIndustry(extra.industry);
    }
    if (extra?.companyId) {
      setSelectedCompanyId(extra.companyId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenQuickMatch={() => setActiveTab('matching')}
        targetCompany={userState.targetCompany}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <DashboardView
            userState={userState}
            onNavigate={handleNavigate}
            onSelectCompany={(companyId) => {
              setSelectedCompanyId(companyId);
              setActiveTab('process');
            }}
          />
        )}

        {activeTab === 'process' && (
          <ProcessFlowView
            initialCompanyId={selectedCompanyId}
            onNavigateToLearning={(industry) => {
              setLearningIndustry(industry);
              setActiveTab('learning');
            }}
            onNavigateToMatching={() => setActiveTab('matching')}
          />
        )}

        {activeTab === 'learning' && (
          <JobSkillLearningView
            initialIndustry={learningIndustry}
            completedModuleIds={userState.completedModuleIds}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {activeTab === 'matching' && (
          <PortfolioAnalyzerView
            onSaveReport={handleSaveReport}
          />
        )}

        {activeTab === 'trends' && (
          <IndustryTrendsView
            onSelectIndustryForLearning={(industry) => {
              setLearningIndustry(industry);
              setActiveTab('learning');
            }}
          />
        )}

        {activeTab === 'mypage' && (
          <MyPageView
            userState={userState}
            onUpdateUserState={handleUpdateUserState}
            onNavigateToProcess={(companyId) => {
              setSelectedCompanyId(companyId);
              setActiveTab('process');
            }}
            onNavigateToMatching={() => setActiveTab('matching')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-16 text-xs text-slate-500 dark:text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">WorkSpec AI</span>
            <span aria-hidden="true">·</span>
            <span>기업 생산 공정 &amp; 직무 역량 통합 취업 준비 플랫폼</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>공정 표준 데이터: 산업통상자원부 &amp; 공학 표준 기반</span>
            <span aria-hidden="true">·</span>
            <span>AI 모델: Google Gemini 3.8 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

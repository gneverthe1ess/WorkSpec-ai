import React from 'react';
import { 
  Cpu, 
  Workflow, 
  GraduationCap, 
  FileCheck, 
  TrendingUp, 
  User, 
  Sparkles,
  Search
} from 'lucide-react';

export type TabType = 'dashboard' | 'process' | 'learning' | 'matching' | 'trends' | 'mypage';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuickMatch?: () => void;
  targetCompany?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickMatch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
              WorkSpec <span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (single-line, clean text with subtle active state) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              대시보드
            </button>
            <button
              onClick={() => onSelectTab('process')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'process'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>기업 공정 흐름도</span>
            </button>
            <button
              onClick={() => onSelectTab('learning')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'learning'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>직무 기술 학습</span>
            </button>
            <button
              onClick={() => onSelectTab('matching')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'matching'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>AI 매칭 분석</span>
            </button>
            <button
              onClick={() => onSelectTab('trends')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'trends'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>산업 트렌드</span>
            </button>
            <button
              onClick={() => onSelectTab('mypage')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'mypage'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>마이페이지</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (onOpenQuickMatch) {
                  onOpenQuickMatch();
                } else {
                  onSelectTab('matching');
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 역량 진단 시작</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200 dark:border-slate-800 px-4 py-2 gap-2 text-xs">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}
        >
          대시보드
        </button>
        <button
          onClick={() => onSelectTab('process')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${activeTab === 'process' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}
        >
          공정 흐름도
        </button>
        <button
          onClick={() => onSelectTab('learning')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${activeTab === 'learning' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}
        >
          직무 학습
        </button>
        <button
          onClick={() => onSelectTab('matching')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${activeTab === 'matching' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}
        >
          AI 매칭
        </button>
        <button
          onClick={() => onSelectTab('trends')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${activeTab === 'trends' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}
        >
          산업 트렌드
        </button>
        <button
          onClick={() => onSelectTab('mypage')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${activeTab === 'mypage' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}
        >
          마이페이지
        </button>
      </div>
    </header>
  );
};

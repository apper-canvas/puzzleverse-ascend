import React from 'react';
import Sidebar from '../organisms/Sidebar';
import TopBar from '../organisms/TopBar';
import DailyChallengeCard from '../organisms/DailyChallengeCard';
import MainPuzzleSection from '../organisms/MainPuzzleSection';
import SudokuPanel from '../organisms/SudokuPanel';
import PlaceholderCard from '../organisms/PlaceholderCard';
import Text from '../atoms/Text';

const HomePageTemplate = ({
  sidebarExpanded,
  setSidebarExpanded,
  puzzleTypes,
  difficulty,
  setDifficulty,
  difficultyOptions,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary/5">
      <Sidebar 
        expanded={sidebarExpanded} 
        onToggleExpand={() => setSidebarExpanded(!sidebarExpanded)} 
        puzzleTypes={puzzleTypes} 
      />

      <div className={`transition-all duration-300 ${sidebarExpanded ? 'ml-72' : 'ml-20'}`}>
        <TopBar 
          difficulty={difficulty} 
          onDifficultyChange={(e) => setDifficulty(e.target.value)} 
          difficultyOptions={difficultyOptions} 
        />

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <DailyChallengeCard difficulty={difficulty} onStartChallenge={() => console.log('Starting daily challenge!')} />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <MainPuzzleSection difficulty={difficulty} />
              <SudokuPanel />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <PlaceholderCard 
                title="Daily Leaderboard"
                content={
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div key={rank} className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg animate-pulse">
                        <div className="w-6 h-6 bg-surface-200 rounded-full"></div>
                        <div className="flex-1 h-4 bg-surface-200 rounded"></div>
                        <div className="w-16 h-4 bg-surface-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                }
                message="Feature launching soon!"
              />

              <PlaceholderCard 
                title="Your Progress"
                content={
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-surface-600">Puzzles Solved</Text>
                      <div className="w-16 h-6 bg-surface-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-surface-600">Best Time</Text>
                      <div className="w-20 h-6 bg-surface-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text as="span" className="text-surface-600">Current Streak</Text>
                      <div className="w-12 h-6 bg-surface-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                }
                message="Track your journey - Coming soon"
              />

              <PlaceholderCard 
                title="Quick Stats"
                content={
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-surface-50 rounded-lg">
                      <div className="w-8 h-8 bg-surface-200 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="w-12 h-4 bg-surface-200 rounded mx-auto animate-pulse"></div>
                    </div>
                    <div className="text-center p-3 bg-surface-50 rounded-lg">
                      <div className="w-8 h-8 bg-surface-200 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="w-16 h-4 bg-surface-200 rounded mx-auto animate-pulse"></div>
                    </div>
                  </div>
                }
                message="Statistics coming soon!"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePageTemplate;
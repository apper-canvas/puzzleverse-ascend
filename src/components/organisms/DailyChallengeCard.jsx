import React from 'react';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

const DailyChallengeCard = ({ difficulty, onStartChallenge }) => {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Title as="h3" className="text-2xl mb-2">Daily Challenge</Title>
            <Text as="p" className="text-primary-light text-lg">Today's Sudoku - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</Text>
            <div className="flex items-center gap-2 mt-3">
              <Icon name="Users" className="w-5 h-5" />
              <Text as="span" className="text-sm">2,847 players participating today</Text>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Flame" className="w-5 h-5 text-orange-300" />
              <Text as="span">7-day streak!</Text>
            </div>
            <Button onClick={onStartChallenge} className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-surface-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Start Challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallengeCard;
import React from 'react';
import Title from '../atoms/Title';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import FeatureItem from '../molecules/FeatureItem';

const SudokuPanel = () => {
  const tips = [
    { icon: 'Lightbulb', text: 'Look for cells with only one possible number', color: 'text-accent' },
    { icon: 'Eye', text: 'Check rows, columns, and 3×3 boxes for missing numbers', color: 'text-accent' },
    { icon: 'Brain', text: 'Use process of elimination to narrow down possibilities', color: 'text-accent' },
  ];

  const comingSoonFeatures = [
    { icon: 'HelpCircle', text: 'Smart Hints', color: 'text-primary' },
    { icon: 'Users', text: 'Multiplayer Mode', color: 'text-secondary' },
    { icon: 'BarChart', text: 'Detailed Analytics', color: 'text-accent' },
  ];

  return (
    <div className="space-y-6">
      {/* Tips Card */}
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <Title as="h4" className="text-lg text-surface-900 mb-4">Sudoku Tips</Title>
        <div className="space-y-3 text-sm text-surface-600">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <Icon name={tip.icon} className={`w-4 h-4 mt-0.5 ${tip.color} flex-shrink-0`} />
              <Text as="span">{tip.text}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Features */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
        <Title as="h4" className="text-lg text-surface-900 mb-4">Coming Soon</Title>
        <div className="space-y-3">
          {comingSoonFeatures.map((feature, index) => (
            <FeatureItem 
              key={index} 
              iconName={feature.icon} 
              text={feature.text} 
              iconColor={feature.color} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SudokuPanel;
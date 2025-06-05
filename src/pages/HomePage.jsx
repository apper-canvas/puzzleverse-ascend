import { useState } from 'react';
    import HomePageTemplate from '../components/templates/HomePageTemplate';

    const HomePage = () => {
      const [sidebarExpanded, setSidebarExpanded] = useState(false);
      const [difficulty, setDifficulty] = useState('medium');

      const puzzleTypes = [
        { 
          id: 'sudoku', 
          name: 'Sudoku', 
          icon: 'Grid3X3', 
          color: 'text-puzzle-sudoku',
          available: true 
        },
        { 
          id: 'crossword', 
          name: 'Crossword', 
          icon: 'Hash', 
          color: 'text-puzzle-crossword',
          available: false 
        },
        { 
          id: 'jigsaw', 
          name: 'Jigsaw', 
          icon: 'Puzzle', 
          color: 'text-puzzle-jigsaw',
          available: false 
        },
        { 
          id: 'logic', 
          name: 'Logic', 
          icon: 'Brain', 
          color: 'text-puzzle-logic',
          available: false 
        },
        { 
          id: 'trivia', 
          name: 'Trivia', 
          icon: 'HelpCircle', 
          color: 'text-puzzle-trivia',
          available: false 
        }
      ];

      const difficultyOptions = [
        { value: 'easy', label: 'Easy', color: 'bg-green-500' },
        { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
        { value: 'hard', label: 'Hard', color: 'bg-orange-500' },
        { value: 'expert', label: 'Expert', color: 'bg-red-500' }
      ];

      return (
        <HomePageTemplate
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
          puzzleTypes={puzzleTypes}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          difficultyOptions={difficultyOptions}
        />
      );
    };

    export default HomePage;
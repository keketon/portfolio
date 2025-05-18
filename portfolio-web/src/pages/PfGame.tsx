import { recordResult } from '@/api/rankApi';
import { Button } from '@/components/ui/button';
import { useTr } from '@/i18n/tr';
import { baseNumbers, generateRound, type Round } from '@/lib/pfGame';
import { getOrRegisterUserId } from '@/lib/utils';
import React from 'react';

/**
 * TODOs: Animations on Finish and wrong Answer
 */
type GameState = 'initial' | 'playing' | 'finished';

const PfGame: React.FC = () => {
  const [gameState, setGameState] = React.useState<GameState>('initial');
  const [score, setScore] = React.useState<number>(0);
  const [rank, setRank] = React.useState<number | null>(null);

  const onClickPlay = () => {
    setGameState('playing');
    setScore(0);
  };

  const onCorrectAnswer = () => {
    setScore(prev => prev + 1);
  };

  const onFinish = async () => {
    const userId = getOrRegisterUserId();
    await recordResult(userId, score).then(setRank);
    setGameState('finished');
  };

  const onReturn = () => {
    setGameState('initial');
    setScore(0);
  };

  const getContent = () => {
    switch (gameState) {
      case 'initial':
        return <Initial onClickPlay={onClickPlay} />;
      case 'playing':
        return (
          <Playing
            currentScore={score}
            onCorrectAnswer={onCorrectAnswer}
            onWrongAnswer={onFinish}
            onClickFinish={onFinish}
          />
        );
      case 'finished':
        return <Finished score={score} rank={rank} onReturn={onReturn} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center pb-10">
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 h-full md:h-7/12 bg-gradient-to-r from-gray-700 to-gray-950">
        {getContent()}
      </div>
    </div>
  );
};

const Initial: React.FC<{ onClickPlay: () => void }> = ({ onClickPlay }) => {
  const { tr } = useTr();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold pb-8">{tr('Prime Factorization Game')}</h1>
      <Button className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 hover:text-white" onClick={onClickPlay}>
        {tr('Start', 'prGame')}
      </Button>
    </div>
  );
};

const Playing: React.FC<{
  currentScore: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  onClickFinish: () => void;
}> = ({ currentScore, onCorrectAnswer, onWrongAnswer, onClickFinish }) => {
  const { tr } = useTr();
  const [round, setRound] = React.useState<Round>(generateRound());

  const handleNumberClick = (base: number) => {
    const result = round.addNumberToGuess(base);

    // Force a re-render by creating a new round object
    setRound({ ...round });

    if (result === 'correct') {
      onCorrectAnswer();
      setRound(generateRound());
    } else if (result === 'burst') {
      onWrongAnswer();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <i className="text-2xl font-serif text-center pt-8">
        {tr('Click factorial number to divide the number until 1!', 'pfGame')}
      </i>
      <h3 className="font-bold py-4">
        {tr('Your Current Score', 'pfGame')}: {currentScore}
      </h3>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div>
          <h2 className="text-center text-3xl font-bold pb-2">{tr('Current Number', 'pfGame')}</h2>
          <h2 className="text-center text-6xl font-bold pb-8">{round.currentNum}</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center px-0.5 gap-2">
          {baseNumbers.map((base, index) => {
            return (
              <>
                {index > 0 && <span className="text-4xl font-mono">×</span>}
                <Button
                  key={base}
                  className="size-16 m-2 px-4 py-2 text-4xl font-mono rounded hover:bg-amber-700 hover:text-white shadow-lg/20 shadow-gray-100"
                  onClick={() => handleNumberClick(base)}
                >
                  <var>
                    {base}
                    <sup>{round.currentGuess[base] ?? 0}</sup>
                  </var>
                </Button>
              </>
            );
          })}
        </div>
        {/* TODO: Add Progress Bar*/}
        <Button
          className="mt-8 px-4 py-2 rounded bg-green-500 hover:bg-green-600 hover:text-white"
          onClick={onClickFinish}
        >
          {tr('Finish Game', 'pfGame')}
        </Button>
      </div>
    </div>
  );
};

const Finished: React.FC<{ score: number; rank: number | null; onReturn: () => void }> = ({
  score,
  rank,
  onReturn,
}) => {
  const { tr } = useTr();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <i className="text-5xl font-bold">{tr('Congratulations!', 'pfGame')}</i>
      <h1 className="text-4xl font-bold pt-2">
        {tr('Your Score is:', 'pfGame')} {score}
      </h1>
      {rank && (
        <h2 className="text-2xl font-bold pt-2">
          {tr('Your Rank is:', 'pfGame')} {rank}
        </h2>
      )}
      <Button className="mt-8 px-4 py-2 rounded bg-green-500 hover:bg-green-600 hover:text-white" onClick={onReturn}>
        {tr('Restart', 'pfGame')}
      </Button>
    </div>
  );
};

export default PfGame;

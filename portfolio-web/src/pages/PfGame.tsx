import { recordResult } from '@/api/rankApi';
import CustomButton from '@/components/CustomButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useTr } from '@/i18n/tr';
import { baseNumbers, generateRound, type Round } from '@/lib/pfGame';
import { getOrRegisterUserId } from '@/lib/utils';
import { useToast } from '@/context/useToast';
import React from 'react';

/**
 * TODOs: Animations on Finish and wrong Answer
 */
type GameState = 'initial' | 'playing' | 'finished';

const PfGame: React.FC = () => {
  const { tr } = useTr();
  const { addToast } = useToast();

  const [gameState, setGameState] = React.useState<GameState>('initial');
  const [score, setScore] = React.useState<number>(0);
  const [rank, setRank] = React.useState<number | null>(null);
  const [isFinishModalOpen, setIsFinishModalOpen] = React.useState(false);

  const initializeGame = () => {
    setScore(0);
    setRank(null);
  };

  const onClickPlay = () => {
    setGameState('playing');
    initializeGame();
  };

  const onCorrectAnswer = () => {
    setScore(prev => prev + 1);
  };

  const onCloseFinishModal = () => {
    setIsFinishModalOpen(false);
    setGameState('finished');
  };

  const onSaveScore = async () => {
    try {
      const userId = getOrRegisterUserId();
      const rank = await recordResult(userId, score);
      setRank(rank);
      onCloseFinishModal();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save score';
      console.error('Failed to save score', errorMessage);
      addToast({
        id: 'saveScoreError',
        title: tr('Error', 'pfGame'),
        description: tr('Error happened during saving your score.', 'pfGame'),
        type: 'error',
      });
    }
  };

  const onReturn = () => {
    setGameState('initial');
    initializeGame();
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
            onWrongAnswer={() => setIsFinishModalOpen(true)}
            onClickFinish={() => setIsFinishModalOpen(true)}
          />
        );
      case 'finished':
        return <Finished score={score} rank={rank} onReturn={onReturn} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center pb-10">
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 h-full md:h-7/12 bg-gradient-to-r from-gray-700 to-gray-950">
        <Dialog open={isFinishModalOpen} onOpenChange={onCloseFinishModal}>
          <DialogContent>
            <DialogTitle>{tr('GAME OVER!', 'pfGame')}</DialogTitle>
            <DialogDescription>{tr('Do you want to record your score to the server?', 'pfGame')}</DialogDescription>
            <div className="flex flex-row justify-center gap-4 mt-4">
              <CustomButton onClick={onSaveScore}>{tr('Save Score', 'pfGame')}</CustomButton>
              <CustomButton variant="wrong" onClick={onCloseFinishModal}>
                {tr('No', 'pfGame')}
              </CustomButton>
            </div>
          </DialogContent>
          {getContent()}
        </Dialog>
      </div>
    </div>
  );
};

const Initial: React.FC<{ onClickPlay: () => void }> = ({ onClickPlay }) => {
  const { tr } = useTr();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold pb-8">{tr('Prime Factorization Game')}</h1>
      <CustomButton onClick={onClickPlay}>{tr('Start', 'prGame')}</CustomButton>
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
                <CustomButton
                  key={base}
                  variant="plain"
                  className="size-16 m-2 text-4xl font-mono bg-blue-300 hover:bg-amber-700 hover:text-white shadow-lg/20 shadow-gray-100"
                  onClick={() => handleNumberClick(base)}
                >
                  <var>
                    {base}
                    <sup>{round.currentGuess[base] ?? 0}</sup>
                  </var>
                </CustomButton>
              </>
            );
          })}
        </div>
        <CustomButton className="mt-8" onClick={onClickFinish}>
          {tr('Finish Game', 'pfGame')}
        </CustomButton>
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

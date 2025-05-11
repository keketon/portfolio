export const baseNumbers = [2, 3, 5, 7, 11, 13];
type BaseNumberEl = (typeof baseNumbers)[number];
const baseNumbersLength = baseNumbers.length;

const MAX_NUM = 1000;

type Factorized = Record<BaseNumberEl, number>;

type GuessResult = 'continue' | 'correct' | 'burst';

// One round where user plays the game
export interface Round {
  originalNum: number;
  // Divide currentNum in each guess step
  currentNum: number;
  currentGuess: Factorized;
  addNumberToGuess: (nguessOnTheRoundum: BaseNumberEl) => GuessResult;
}

export function generateRound(): Round {
  const q = generateQuestionAnswer();

  return {
    originalNum: q,
    currentNum: q,
    currentGuess: baseNumbers.reduce((acc, base) => {
      acc[base] = 0;
      return acc;
    }, {} as Factorized),
    addNumberToGuess(guessOnTheRound: BaseNumberEl): GuessResult {
      const result = judgeGuessResult(guessOnTheRound, this.currentNum);
      if (result === 'burst') {
        return result;
      }

      if (this.currentGuess[guessOnTheRound] === undefined) {
        this.currentGuess[guessOnTheRound] = 1;
      } else {
        this.currentGuess[guessOnTheRound]++;
      }
      this.currentNum /= guessOnTheRound;

      return result;
    },
  };
}

function generateQuestionAnswer(): number {
  let num = 1;
  for (let i = 0; i < baseNumbersLength; i++) {
    const base = baseNumbers[i];
    const exponent = randInt(5);

    for (let j = 0; j < exponent; j++) {
      num *= base;

      if (num > MAX_NUM) {
        break;
      }
    }

    if (num > MAX_NUM) {
      break;
    }
  }

  return num;
}

function randInt(maxEx: number, minIn: number = 0) {
  return Math.floor(Math.random() * (maxEx - minIn)) + minIn;
}

function judgeGuessResult(guessOnTheRound: number, currentNum: number): GuessResult {
  if (currentNum % guessOnTheRound !== 0) {
    return 'burst';
  }

  if (currentNum === guessOnTheRound) {
    return 'correct';
  }

  return 'continue';
}

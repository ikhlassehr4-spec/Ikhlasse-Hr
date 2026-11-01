import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle } from 'lucide-react';
import { STUDENT_QUIZ } from '../data/documentaryData';

export const StudentQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = STUDENT_QUIZ[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQ.id];
  const hasAnswered = selectedOption !== undefined;

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return; // prevent changing after answer submitted
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < STUDENT_QUIZ.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    STUDENT_QUIZ.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>First Year Secondary Student Assessment</span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Cultural Knowledge Quiz: Algeria & Japan
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Test what you’ve learned from the documentary video and the scientific project brochure.
        </p>
      </div>

      {!quizFinished ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col gap-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span>
              Question <strong className="text-white">{currentQuestionIndex + 1}</strong> of{' '}
              {STUDENT_QUIZ.length}
            </span>
            <span className="font-mono text-rose-400 font-semibold">
              Score: {calculateScore()} / {STUDENT_QUIZ.length}
            </span>
          </div>

          {/* Question Text */}
          <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-950/70 hover:bg-slate-800 border-slate-800 text-slate-200';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="flex-1">{option}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Not quite right!
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-colors shadow-md flex items-center gap-2"
              >
                <span>{currentQuestionIndex === STUDENT_QUIZ.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center gap-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-2xl font-bold text-white">Quiz Completed!</h4>
            <p className="text-sm text-slate-400 mt-1">
              You scored <span className="font-bold text-rose-400">{calculateScore()}</span> out of{' '}
              <span className="font-bold text-white">{STUDENT_QUIZ.length}</span>
            </p>
          </div>

          <p className="text-xs text-slate-300 max-w-md leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {calculateScore() === 5
              ? 'Outstanding! You have mastered the cultural exchanges between Algeria and Japan and understand the nuances of both civilizations.'
              : calculateScore() >= 3
              ? 'Great job! You have a solid grasp of Algerian and Japanese traditions, landmarks, and school life.'
              : 'Good effort! Review the documentary video and brochure hotspots to explore more cultural connections.'}
          </p>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};

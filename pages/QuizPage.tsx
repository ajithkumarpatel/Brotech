
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  {
    question: "Is your website mobile-friendly?",
    options: [
      { text: "Yes, it works perfectly on phones", score: 10 },
      { text: "It's okay, but some things look weird", score: 5 },
      { text: "No, you have to pinch and zoom", score: 0 }
    ]
  },
  {
    question: "How fast does your website load?",
    options: [
      { text: "Instantly (under 2 seconds)", score: 10 },
      { text: "A bit slow (3-5 seconds)", score: 5 },
      { text: "Painfully slow (5+ seconds)", score: 0 }
    ]
  },
  {
    question: "When was the last time you updated the design?",
    options: [
      { text: "In the last 12 months", score: 10 },
      { text: "1-3 years ago", score: 5 },
      { text: "More than 3 years ago", score: 0 }
    ]
  },
  {
    question: "Do you get regular leads from your website?",
    options: [
      { text: "Yes, almost daily", score: 10 },
      { text: "Sometimes, but not enough", score: 5 },
      { text: "Rarely or never", score: 0 }
    ]
  },
  {
    question: "Is your site secure (HTTPS)?",
    options: [
      { text: "Yes, it has a lock icon", score: 10 },
      { text: "I'm not sure", score: 5 },
      { text: "No, it says 'Not Secure'", score: 0 }
    ]
  }
];

const QuizPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (score: number) => {
    const newScore = totalScore + score;
    setTotalScore(newScore);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    if (totalScore >= 40) return { title: "Looking Good!", color: "text-green-500", desc: "Your website is in great shape. You might just need minor optimizations." };
    if (totalScore >= 25) return { title: "Needs Improvement", color: "text-yellow-500", desc: "Your site is functional but losing potential customers. A refresh would help significantly." };
    return { title: "Critical Condition", color: "text-red-500", desc: "Your website is likely hurting your brand and SEO. A complete redesign is highly recommended." };
  };

  const result = getResult();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          
          <div className="p-8 bg-slate-900 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Website Health Check</h1>
            <p className="text-slate-400">Answer 5 questions to see if you need a redesign.</p>
          </div>

          <div className="p-8 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode='wait'>
              {!showResult ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wide">
                    Question {currentStep + 1} of {questions.length}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                    {questions[currentStep].question}
                  </h2>
                  <div className="space-y-4">
                    {questions[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option.score)}
                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all text-left font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between group"
                      >
                        {option.text}
                        <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className={`text-5xl font-extrabold mb-4 ${result.color}`}>
                    {totalScore} / 50
                  </div>
                  <h2 className={`text-3xl font-bold mb-4 text-slate-900 dark:text-white`}>
                    {result.title}
                  </h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto">
                    {result.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      Book Free Audit
                    </Link>
                    <button 
                      onClick={() => {
                        setCurrentStep(0);
                        setTotalScore(0);
                        setShowResult(false);
                      }}
                      className="inline-flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-white px-8 py-3 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {!showResult && (
            <div className="h-2 bg-gray-100 dark:bg-slate-900">
               <div 
                 className="h-full bg-blue-600 transition-all duration-300" 
                 style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
               ></div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default QuizPage;

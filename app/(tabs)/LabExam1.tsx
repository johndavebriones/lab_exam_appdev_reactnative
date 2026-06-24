import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { QuizHeader, QuizCard } from '@/components/QuizComponents';
import questions from '@/constants/quiz';

export default function HomeScreen() {
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [answers, setAnswers] = useState<{ selected: number; correct: boolean }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedIndex !== undefined) return;
    const correct = questions[current].options[index] === questions[current].answer;
    setSelectedIndex(index);
    setAnswers(prev => {
      const next = [...prev];
      next[current] = { selected: index, correct };
      return next;
    });
  };

  const handleTimer = () => {
    setShowTimeUp(true);
    setTimeout(() => {
      setShowTimeUp(false);
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
      setSelectedIndex(undefined);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelectedIndex(undefined);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const correctCount = answers.filter(a => a?.correct).length;
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultIcon}>🎓</Text>
          <Text style={styles.resultLabel}>Exam Results
          </Text>
          <Text style={styles.resultScore}>Score: 
            {" "}{correctCount} / {questions.length}
          </Text>
          <Text style={styles.resultPercent}>{percentage}%</Text>
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartButtonText}>Restart Laboratory Exam</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const paused = selectedIndex !== undefined;
  const isLast = current === questions.length - 1;

  return(
    <View style={styles.containeresult}>
      <Text style={styles.titleHeader}> 
        SETUP & ENVIRONMENT
      </Text>
      <View style={styles.Header}>
        <QuizHeader key={current} total={questions.length} current={current} paused={paused} onTimeUp={handleTimer} />
      </View>
      <QuizCard
        question={questions[current]}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />
      {selectedIndex !== undefined && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      )}
      {showTimeUp && (
        <View>
          <View>
            <Text style={styles.timeUpText}>Times up</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#F8FCFC",
    height: 900
  },

  containeresult:{
    backgroundColor: "#F8FCFC",
    height: 900,
    justifyContent: "center",
    alignContent: "center"
  },

  titleHeader: {
    color: "#3B82F6",
    fontWeight: "bold",
    margin: 10,
    paddingTop: 50,
    fontSize: 16
  },

  Header:{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    borderRadius: 12,
    padding: 16,
  },

  nextButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  resultCard: {
    marginTop: 200,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 12,
  },

  resultScore: {
    fontSize: 32,
    color: '#6B7280',
    marginTop: 12,
  },

  resultIcon: {
    fontSize: 64,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },

  resultValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginTop: 4,
  },

  resultPercent: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginTop: 4,
  },

  restartButton: {
    backgroundColor: '#1E293B',
    marginHorizontal: 10,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  restartButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  timeUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
    textAlign: "center"
  },
})

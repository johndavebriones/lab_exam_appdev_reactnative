import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import type { Question } from '@/constants/quiz';

const COUNTDOWN = 30;


interface QuizHeaderProps {
  total: number;
  current: number;
  paused?: boolean;
  onTimeUp?: () => void;
}

export function QuizHeader({ total, current, paused, onTimeUp }: QuizHeaderProps) {
  const [seconds, setSeconds] = useState(COUNTDOWN);
  const [isRunning, setIsRunning] = useState(true);
  const [timeUpFired, setTimeUpFired] = useState(false);
  const progress = ((current + 1) / total) * 100;

  useEffect(() => {
    if (paused) setIsRunning(false);
  }, [paused]);

  useEffect(() => {
    if (timeUpFired) return;
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setTimeUpFired(true);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeUpFired, onTimeUp]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <View style={styles.timerContainer}>
        <Text style={[styles.timerText, seconds <= 5 && styles.timerWarning]}>
          {formatTime(seconds)}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.labels}>
          <Text style={styles.progressLabel}>Question {current + 1}/{total}</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress}%` }]} />
        </View>
      </View>
    </>
  );
}


interface QuizCardProps {
  question: Question;
  selectedIndex?: number;
  onSelect: (index: number) => void;
}

export function QuizCard({ question, selectedIndex, onSelect }: QuizCardProps) {
  const correctIndex = question.options.findIndex(o => o === question.answer);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === correctIndex;
          const showFeedback = selectedIndex !== undefined;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                showFeedback && isCorrect && styles.optionCorrect,
                showFeedback && isSelected && !isCorrect && styles.optionWrong,
                !showFeedback && isSelected && styles.selectedOption,
              ]}
              disabled={showFeedback}
              onPress={() => onSelect(index)}
            >
              <Text
                style={[
                  styles.optionText,
                  showFeedback && isCorrect && styles.optionCorrectText,
                  showFeedback && isSelected && !isCorrect && styles.optionWrongText,
                  !showFeedback && isSelected && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  timerWarning: {
    color: '#EF4444',
  },
  progressContainer: {
    marginTop: 8,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6B7280',
  },
  track: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 5,
    margin: 10,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  optionCorrect: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  optionWrong: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  optionCorrectText: {
    color: '#065F46',
    fontWeight: '600',
  },
  optionWrongText: {
    color: '#991B1B',
    fontWeight: '600',
  },
});

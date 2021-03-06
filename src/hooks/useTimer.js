import { useState, useRef, useEffect, useCallback } from "react";

const useTimer = (timeLimit, nextQuestion) => {
  // const isRunning = false;
  const [seconds, setSeconds] = useState(timeLimit);
  const timerId = useRef();

  const start = useCallback(() => {
    setSeconds((prev) => timeLimit);
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeconds]);

  const stop = useCallback(() => {
    clearInterval(timerId.current);
    nextQuestion();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeconds]);

  useEffect(() => {
    if (seconds < 1) {
      stop();
    }
  }, [seconds, stop]);

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId.current);
    };
  }, []);

  return {
    // isRunning,
    start,
    stop,
    seconds,
  };
};

export default useTimer;

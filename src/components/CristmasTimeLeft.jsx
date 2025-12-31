import { useEffect, useState } from 'react';

function CristmasTimeLeft({ targetDate }) {
  
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();

        if (difference <= 0) {
        return null;
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  const { days, hours, minutes, seconds } = timeLeft;
  const isTimeUp = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    isTimeUp 
    ? 
    <div className="absolute bottom-0 right-0 left-1/2 bottom-0 transform translate-x-[-50%] translate-y-full z-50 bg-[var(--primary)] text-black bg-transparent dark:text-white dark:bg-transparent w-[150px] w-full pb-1 flex h-4 text-white text-center">
        <h3 className='text-neutral-200 text-sm font-bold bg-[var(--primary)] dark:bg-[var(--primary-dark)] dark:text-green-700 text-center w-fit m-auto px-2 rounded-b-lg'>
          Time is up 🎉, Happy new 2026!
        </h3>
    </div>
    :
    <div className="absolute bottom-0 right-0 left-1/2 bottom-0 transform translate-x-[-50%] translate-y-full z-50 bg-[var(--primary)] text-black bg-transparent dark:text-white dark:bg-transparent w-[150px] w-full pb-1 flex h-4 text-white text-center">
        <h3 className='text-neutral-200 text-sm font-bold bg-[var(--primary)] dark:bg-[var(--primary-dark)] dark:text-green-700 text-center w-fit m-auto px-2 rounded-b-lg'>
          Time to new 2026 : {timeLeft.days}d {timeLeft.hours}h {timeLeft.minues}m {timeLeft.seconds}s
        </h3>
    </div> )
};

export default CristmasTimeLeft;

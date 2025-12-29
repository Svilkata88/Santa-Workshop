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
    return <h3>Time is up 🎉, Happy new 2026!</h3>;
  }

  return (
    <div className="bg-[var(--primary)] text-black bg-transparent dark:text-white w-[150px] ml-auto mr-auto w-full pb-1 relative z-10 flex h-4 text-white text-center">
        <h3 className='text-lime-700 text-sm font-bold dark:bg-[var(--primary-dark)] dark:text-lime-100 text-center w-fit m-auto px-2 rounded-b-lg'>
          Time to new 2026 : {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </h3>
    </div>
  );
};

export default CristmasTimeLeft;

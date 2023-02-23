import React, { useEffect, useState } from 'react';

const WisdomQuote = ({ wisdomList, intervalTime }) => {
  const [wisdom, setWisdom] = useState(wisdomList[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [wisdomList, intervalTime]);

  return (
    <div>
      <h3>{wisdom}</h3>
    </div>
  );
};

export default WisdomQuote;

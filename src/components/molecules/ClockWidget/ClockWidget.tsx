import { useEffect, useState } from 'react';
import styles from "./ClockWidget.module.css";

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const formattedTime = time.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const fullDate = time.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "¡Buenos días! ☀️";
    if (hour < 18) return "¡Buenas tardes! 🌤️";
    return "¡Buenas noches! 🌙";
  };

  return (
    <div className={styles.clockContainer}>
      <h3>{getGreeting()}</h3>
      <p className={styles.date}>{fullDate}</p>
      <p className={styles.time}>{formattedTime}</p>
    </div>
  );
}

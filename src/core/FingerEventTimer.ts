/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

type Timer = number | NodeJS.Timeout;

const eventTimerOwner = new Set<Timer>();

export function createEventTimer(fn: () => void, timeout: number) {
  const timer = setTimeout(() => {
    clearEventTimer(timer);
    fn();
  }, timeout);
  eventTimerOwner.add(timer);
  return timer;
}

export function clearEventTimer(timer: Timer) {
  clearTimeout(timer as number);
  return eventTimerOwner.delete(timer);
}

export function clearAllEventTimer() {
  Array.from(eventTimerOwner).forEach((timer) => clearEventTimer(timer));
}

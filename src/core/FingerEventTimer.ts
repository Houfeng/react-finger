/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

const eventTimerOwner = new Set<any>();

export function createEventTimer(fn: () => void, timeout: number) {
  const timer = setTimeout(() => {
    clearEventTimer(timer);
    fn();
  }, timeout);
  eventTimerOwner.add(timer);
  return timer;
}

export function clearEventTimer(timer: any) {
  clearTimeout(timer);
  return eventTimerOwner.delete(timer);
}

export function clearAllEventTimer() {
  Array.from(eventTimerOwner).forEach((timer) => clearEventTimer(timer));
}

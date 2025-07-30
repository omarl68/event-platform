export const DAY_IN_MILLISECOND = 24 * 60 * 60 * 1000;
export const MINUTE_ON_MILLISECOND = 60 * 1000;
export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MEGABYTE_IN_BYTE = 1024 * 1024;

export enum EnvironmentEnum {
  dev = 'dev',
  prod = 'prod',
  test = 'test',
}

export enum TokenEnum {
  access = 'access',
  refresh = 'refresh',
  reset = 'reset',
}

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export const EMOJIS = {
  SMILING_FACE: '😊',
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
  RAISED_HAND_WITH_FINGERS_SPLAYED: '🖐️',
  CALENDAR: '📅',
  NOTEBOOK: '📓',
  BOOKMARK: '🔖',
  PUSH_PIN: '📌',
  LOCK: '🔒',
  UNLOCK: '🔓',
  HOURGLASS: '⏳',
  STOPWATCH: '⏱️',
  TIMER_CLOCK: '⏰',
  WARNNING: '⚠️',
  NO_ENTRY: '⛔',
  PROHIBITED: '🚫',
  SUCCESS: '✅',
  CHECK_MARK: '✔️',
  INFO: 'ℹ️',
};

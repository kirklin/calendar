/**
 * DAY: 日视图
 * WEEK: 周视图
 * MONTH: 日视图
 */
export type modeType = "DAY" | "WEEK" | "MONTH";
export interface Event {
  eventStart: Date;
  eventEnd: Date | "";
  eventName: string;
  eventColor: "indigo" | "sky" | "yellow" | "red" | "emerald";
}
export type localType = "en" | "zh" | "us" | "es" | "pt-br" | "ja" | "ko"
| "fr" | "it" | "ru" | "sv" | "no" | "no-nn" | "de" | "vi" | "ua" | "th" | "hu";

export interface EventDay {
  date: string;
  isCurrentMonth: boolean;
}

export interface langType {
  dayNames: string[];
  monthNames: string[];
  format: string;
  fullFormat: string;
  dayEventsTitle: string;
  notHaveEvents: string;
}

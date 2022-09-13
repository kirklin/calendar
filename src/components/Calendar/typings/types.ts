/**
 * DAY: 日视图
 * WEEK: 周视图
 * MONTH: 日视图
 */
export type modeType = "DAY" | "WEEK" | "MONTH";

export type localType = "en" | "zh" | "us" | "es" | "pt-br" | "ja" | "ko"
| "fr" | "it" | "ru" | "sv" | "no" | "no-nn" | "de" | "vi" | "ua" | "th" | "hu";

export interface langType {
  dayNames: string[]
  monthNames: string[]
  format: string
  fullFormat: string
  dayEventsTitle: string
  notHaveEvents: string
}

declare module "reading-time" {
  export interface ReadingTimeResult {
    text: string;
    minutes: number;
    time: number;
    words: number;
  }

  export interface ReadingTimeOptions {
    wordsPerMinute?: number;
  }

  export default function readingTime(
    text: string | Buffer,
    options?: ReadingTimeOptions
  ): ReadingTimeResult;
}

export interface ErrorHandler extends Error {
  status?: number;
  message: string;
  stack?: string;
}
export interface UsecaseError extends Error {
  message: string;
  code: string;
}

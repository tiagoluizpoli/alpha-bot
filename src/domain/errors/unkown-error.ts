import { UsecaseError } from '@/domain';

export class UnknownError extends Error implements UsecaseError {
  constructor() {
    super('An unknown error has occurred');
    this.name = 'UnknownError';
    this.code = 'DRAW_NOT_FOUND_ERROR';
  }

  code: string;
}

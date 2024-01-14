import { UsecaseError } from '@/domain';

export class DrawNotFoundError extends Error implements UsecaseError {
  constructor() {
    super('The draw was not found in database');
    this.name = 'DrawNotFoundError';
    this.code = 'DRAW_NOT_FOUND_ERROR';
  }

  code: string;
}

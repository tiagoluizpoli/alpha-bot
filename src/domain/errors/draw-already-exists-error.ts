import { UsecaseError } from '@/domain';

export class DrawAlreadyExistsError extends Error implements UsecaseError {
  constructor() {
    super('The draw already exists in database');
    this.name = 'DrawAlreadyExistsError';
    this.code = 'DRAW-ALREADY-EXISTS-ERROR';
  }

  code: string;
}

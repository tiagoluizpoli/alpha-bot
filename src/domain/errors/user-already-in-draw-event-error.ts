import { UsecaseError } from '@/domain';

export class UserAlreadyInDrawEventError extends Error implements UsecaseError {
  constructor() {
    super('The user is already in the draw event');
    this.name = 'UserAlreadyInDrawEventError';
    this.code = 'USER_ALREADY_IN_DRAW_EVENT_ERROR';
  }

  code: string;
}

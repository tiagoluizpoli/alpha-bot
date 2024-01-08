import { UsecaseError } from '@/domain';

export class UserNotFoundInDrawEventError extends Error implements UsecaseError {
  constructor() {
    super('The user was not found in the draw event');
    this.name = 'UserNotFoundInDrawEventError';
    this.code = 'USER_NOT_FOUND_IN_DRAW_EVENT_ERROR';
  }

  code: string;
}

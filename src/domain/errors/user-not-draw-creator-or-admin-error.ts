import { UsecaseError } from '@/domain';

export class UserNotDrawCreatorOrAdminError extends Error implements UsecaseError {
  constructor() {
    super('Only the draw creator or an admin are allowed to cancel the draw');
    this.name = 'UserNotDrawCreatorOrAdminError';
    this.code = 'USER-NOT-DRAW-CREATOR-OR-ADMIN-ERROR';
  }

  code: string;
}

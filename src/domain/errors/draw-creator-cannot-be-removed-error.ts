import { UsecaseError } from '@/domain';

export class DrawCreatorCannotBeRemovedError extends Error implements UsecaseError {
  constructor() {
    super("You've created this draw, therefore you cannot leave");
    this.name = 'DrawCreatorCannotBeRemovedError';
    this.code = 'DRAW-CREATOR-CANNOT-BE-REMOVED-ERROR';
  }

  code: string;
}

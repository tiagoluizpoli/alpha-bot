import { UsecaseError } from '@/domain';

export class InvalidTeamCountError extends Error implements UsecaseError {
  constructor() {
    super('The amount of teams are invalid according to the number of users');
    this.name = 'InvalidTeamCountError';
    this.code = 'INVALID_TEAM_COUNT_ERROR';
  }

  code: string;
}

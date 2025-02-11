import { IsIn, IsNotEmpty } from 'class-validator';
import type { LevelWithSilent } from 'pino';

export class PinoLevelUpdateDto {
  @IsNotEmpty()
  @IsIn(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
  level: LevelWithSilent;
}

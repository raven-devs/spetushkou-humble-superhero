import { Body, Controller, Patch } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { PinoLevelUpdateDto } from './dto/pino.level.update.dto';

@Controller('logger')
export class PinoLoggerController {
  @Patch('level')
  updateLevel(@Body() updateLevelDto: PinoLevelUpdateDto): void {
    const { level } = updateLevelDto;
    PinoLogger.root.level = level;
  }
}

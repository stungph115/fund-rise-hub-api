import { Module } from '@nestjs/common';
import { AddonsEarnedController } from './addons-earned.controller';
import { AddonsEarnedService } from './addons-earned.service';

@Module({
  controllers: [AddonsEarnedController],
  providers: [AddonsEarnedService]
})
export class AddonsEarnedModule {}

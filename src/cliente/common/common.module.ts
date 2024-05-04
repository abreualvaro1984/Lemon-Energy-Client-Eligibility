// src/common/common.module.ts

import { Module } from '@nestjs/common';
import { ConsumptionUtilityService } from '../common/consumption-utility.service';

@Module({
    providers: [ConsumptionUtilityService],
    exports: [ConsumptionUtilityService]
})
export class CommonModule { }

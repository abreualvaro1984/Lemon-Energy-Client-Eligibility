import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumptionUtilityService {
    public calculateAverageConsumption(historicoDeConsumo: number[]): number {
        return historicoDeConsumo.reduce((a, b) => a + b, 0) / historicoDeConsumo.length;
    }
}

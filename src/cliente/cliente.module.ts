import { Module } from '@nestjs/common';
import { ClienteController } from './interface/cliente.controller';
import { CheckCustomerEligibility } from './application/use-cases/check-customer-eligibility';
import { CommonModule } from './common/common.module';

@Module({
    imports: [CommonModule],
    controllers: [ClienteController],
    providers: [CheckCustomerEligibility],
})
export class ClienteModule { }

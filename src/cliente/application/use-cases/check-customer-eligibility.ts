import { Injectable } from '@nestjs/common';
import { Cliente } from '../../domain/cliente';
import { ICheckCustomerEligibility } from '../interfaces/check-customer-eligibility.interface';
import { ConsumptionUtilityService } from '../../common/consumption-utility.service';

@Injectable()
export class CheckCustomerEligibility implements ICheckCustomerEligibility {
    constructor(private consumptionUtility: ConsumptionUtilityService) { }

    private eligibilityRules = [
        {
            validate: (cliente: Cliente) => ['comercial', 'residencial', 'industrial'].includes(cliente.classeDeConsumo),
            message: 'Classe de consumo não aceita',
        },
        {
            validate: (cliente: Cliente) => ['convencional', 'branca'].includes(cliente.modalidadeTarifaria),
            message: 'Modalidade tarifária não aceita',
        },
        {
            validate: (cliente: Cliente) => {
                const minConsumptions = { 'monofasico': 400, 'bifasico': 500, 'trifasico': 750 };
                return this.consumptionUtility.calculateAverageConsumption(cliente.historicoDeConsumo) >= minConsumptions[cliente.tipoDeConexao];
            },
            message: 'Consumo muito baixo para tipo de conexão',
        }
    ];

    execute(cliente: Cliente): { elegivel: boolean, economiaAnualDeCO2?: number, razoesDeInelegibilidade?: string[] } {
        const inelegibilityReasons = this.eligibilityRules
            .filter(rule => !rule.validate(cliente))
            .map(rule => rule.message);

        if (inelegibilityReasons.length > 0) {
            return {
                elegivel: false,
                razoesDeInelegibilidade: inelegibilityReasons
            };
        }

        const averageConsumption = this.consumptionUtility.calculateAverageConsumption(cliente.historicoDeConsumo);
        const annualCO2Savings = (averageConsumption * 12 * 84) / 1000;
        return {
            elegivel: true,
            economiaAnualDeCO2: annualCO2Savings
        };
    }
}

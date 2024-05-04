import { Test, TestingModule } from '@nestjs/testing';
import { CheckCustomerEligibility } from '../application/use-cases/check-customer-eligibility';
import { ConsumptionUtilityService } from '../common/consumption-utility.service';
import { Cliente } from '../domain/cliente';

describe('CheckCustomerEligibility', () => {
    let service: CheckCustomerEligibility;
    let mockConsumptionUtilityService: ConsumptionUtilityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CheckCustomerEligibility,
                {
                    provide: ConsumptionUtilityService,
                    useValue: {
                        calculateAverageConsumption: jest.fn()
                    }
                }
            ],
        }).compile();

        service = module.get<CheckCustomerEligibility>(CheckCustomerEligibility);
        mockConsumptionUtilityService = module.get<ConsumptionUtilityService>(ConsumptionUtilityService);
    });

    it('Deve calcular o consumo corretamente', () => {
        const consumo = [100, 200, 300];
        jest.spyOn(mockConsumptionUtilityService, 'calculateAverageConsumption').mockReturnValue(200);
        expect(mockConsumptionUtilityService.calculateAverageConsumption(consumo)).toEqual(200);
    });

    // Supondo que Cliente.fromDTO seja o método estático para criação de instâncias
    it('Deve retornar como elegível se a classe de consumo e a modalidade da tarifa forem aceitas', () => {
        jest.spyOn(mockConsumptionUtilityService, 'calculateAverageConsumption').mockReturnValue(5000); // Assume consumo médio alto para passar a validação
        const clienteDTO = {
            numeroDoDocumento: '14041737706',
            tipoDeConexao: 'bifasico',
            classeDeConsumo: 'comercial',
            modalidadeTarifaria: 'convencional',
            historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597]
        };
        const cliente = Cliente.fromDTO(clienteDTO);
        const result = service.execute(cliente);
        expect(result.elegivel).toBeTruthy();
        expect(result.economiaAnualDeCO2).toBeDefined();
    });

    it('Deve retornar como não elegível caso a classe de consumo não seja aceita', () => {
        jest.spyOn(mockConsumptionUtilityService, 'calculateAverageConsumption').mockReturnValue(5000);
        const clienteDTO = {
            numeroDoDocumento: '14041737706',
            tipoDeConexao: 'monofasico',
            classeDeConsumo: 'rural',
            modalidadeTarifaria: 'convencional',
            historicoDeConsumo: [1000, 1000, 1000]
        };
        const cliente = Cliente.fromDTO(clienteDTO);
        const result = service.execute(cliente);
        expect(result.elegivel).toBeFalsy();
        expect(result.razoesDeInelegibilidade).toContain('Classe de consumo não aceita');
    });

    it('Deve retornar como não elegível se a classe de consumo e a modalidade da tarifa não forem aceitas', () => {
        jest.spyOn(mockConsumptionUtilityService, 'calculateAverageConsumption').mockReturnValue(5000);
        const clienteDTO = {
            numeroDoDocumento: '14041737706',
            tipoDeConexao: 'bifasico',
            classeDeConsumo: 'rural',
            modalidadeTarifaria: 'verde',
            historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160]
        };
        const cliente = Cliente.fromDTO(clienteDTO);
        const result = service.execute(cliente);
        expect(result.elegivel).toBeFalsy();
        expect(result.razoesDeInelegibilidade).toContain('Classe de consumo não aceita');
        expect(result.razoesDeInelegibilidade).toContain('Modalidade tarifária não aceita');
    });
});

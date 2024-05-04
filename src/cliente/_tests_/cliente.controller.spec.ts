import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ClienteController } from '../interface/cliente.controller';
import { ClasseDeConsumo, ClienteDTO, ModalidadeTarifaria, TipoDeConexao } from '../dto/cliente.dto';
import { CheckCustomerEligibility } from '../application/use-cases/check-customer-eligibility';
import { Cliente } from '../domain/cliente';

describe('ClienteController', () => {
    let controller: ClienteController;
    let mockCheckCustomerEligibility: CheckCustomerEligibility;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClienteController],
            providers: [
                {
                    provide: CheckCustomerEligibility,
                    useValue: {
                        execute: jest.fn()
                    }
                },
            ],
        }).compile();

        controller = module.get<ClienteController>(ClienteController);
        mockCheckCustomerEligibility = module.get<CheckCustomerEligibility>(CheckCustomerEligibility);
    });

    it('deve retornar o resultado de elegibilidade quando fornecido com dados válidos', async () => {
        const dto = new ClienteDTO();
        dto.numeroDoDocumento = '1234567890';
        dto.tipoDeConexao = TipoDeConexao.Bifasico;
        dto.classeDeConsumo = ClasseDeConsumo.Comercial;
        dto.modalidadeTarifaria = ModalidadeTarifaria.Convencional;
        dto.historicoDeConsumo = [1000, 1200, 1100, 1150];

        const expectedResult = { elegivel: true, economiaAnualDeCO2: 123 };
        jest.spyOn(mockCheckCustomerEligibility, 'execute').mockReturnValue(expectedResult);

        const result = await controller.checkElegibility(dto);
        expect(result).toEqual(expectedResult);
    });

    it('deve lançar HttpException quando os dados são inválidos', async () => {
        const dto = new ClienteDTO(); // Assuming invalid data setup here
        jest.spyOn(Cliente, 'fromDTO').mockImplementation(() => {
            throw new Error('Invalid data');
        });

        try {
            await controller.checkElegibility(dto);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.response).toBe('Entrada Invalida: Invalid data');
            expect(e.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });
});

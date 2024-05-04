import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Cliente } from '../domain/cliente';
import { ClienteDTO } from '../dto/cliente.dto'
import { CheckCustomerEligibility } from '../application/use-cases/check-customer-eligibility';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly checkCustomerEligibility: CheckCustomerEligibility) { }

    @Post('check-elegibility')
    checkElegibility(@Body() clienteDTO: ClienteDTO): any {
        try {
            const cliente = Cliente.fromDTO(clienteDTO);
            return this.checkCustomerEligibility.execute(cliente);
        } catch (error) {
            throw new HttpException('Entrada Invalida: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

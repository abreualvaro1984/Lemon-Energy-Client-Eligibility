import { Cliente } from '../../domain/cliente';

export interface ICheckCustomerEligibility {
    execute(cliente: Cliente): { elegivel: boolean, economiaAnualDeCO2?: number, razoesDeInelegibilidade?: string[] };
}

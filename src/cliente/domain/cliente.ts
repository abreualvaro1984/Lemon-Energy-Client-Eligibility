import { TipoDeConexao, ClasseDeConsumo, ModalidadeTarifaria } from '../dto/cliente.dto'; // Ajuste o caminho de importação conforme necessário

export class Cliente {
    numeroDoDocumento: string;
    tipoDeConexao: string;
    classeDeConsumo: string;
    modalidadeTarifaria: string;
    historicoDeConsumo: number[];

    private constructor(numeroDoDocumento: string, tipoDeConexao: string, classeDeConsumo: string, modalidadeTarifaria: string, historicoDeConsumo: number[]) {
        this.numeroDoDocumento = numeroDoDocumento;
        this.tipoDeConexao = tipoDeConexao;
        this.classeDeConsumo = classeDeConsumo;
        this.modalidadeTarifaria = modalidadeTarifaria;
        this.historicoDeConsumo = historicoDeConsumo;
    }

    static fromDTO(dto: any): Cliente {
        if (!dto.numeroDoDocumento || !dto.tipoDeConexao || !dto.classeDeConsumo || !dto.modalidadeTarifaria || !dto.historicoDeConsumo) {
            throw new Error("Faltam parâmetros necessários");
        }

        if (!Object.values(TipoDeConexao).includes(dto.tipoDeConexao)) {
            throw new Error("'tipoDeConexao' inválida");
        }
        if (!Object.values(ClasseDeConsumo).includes(dto.classeDeConsumo)) {
            throw new Error("'classeDeConsumo' inválida");
        }
        if (!Object.values(ModalidadeTarifaria).includes(dto.modalidadeTarifaria)) {
            throw new Error("'modalidadeTarifaria' inválida");
        }
        if (!Array.isArray(dto.historicoDeConsumo) || dto.historicoDeConsumo.some(isNaN)) {
            throw new Error("'historicoDeConsumo' inválida");
        }

        return new Cliente(
            dto.numeroDoDocumento,
            dto.tipoDeConexao,
            dto.classeDeConsumo,
            dto.modalidadeTarifaria,
            dto.historicoDeConsumo
        );
    }
}

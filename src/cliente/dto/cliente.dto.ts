import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TipoDeConexao {
    Monofasico = 'monofasico',
    Bifasico = 'bifasico',
    Trifasico = 'trifasico'
}

export enum ClasseDeConsumo {
    Comercial = 'comercial',
    Residencial = 'residencial',
    Industrial = 'industrial',
    PoderPublico = 'poder público',
    Rural = 'rural'
}

export enum ModalidadeTarifaria {
    Convencional = 'convencional',
    Branca = 'branca',
    Azul = 'azul',
    Verde = 'verde'
}

export class ClienteDTO {
    @IsString()
    @IsNotEmpty()
    numeroDoDocumento: string;

    @IsEnum(TipoDeConexao)
    @IsNotEmpty()
    tipoDeConexao: TipoDeConexao;

    @IsEnum(ClasseDeConsumo)
    @IsNotEmpty()
    classeDeConsumo: ClasseDeConsumo;

    @IsEnum(ModalidadeTarifaria)
    @IsNotEmpty()
    modalidadeTarifaria: ModalidadeTarifaria;

    @IsArray()
    @IsNotEmpty()
    historicoDeConsumo: number[];
}

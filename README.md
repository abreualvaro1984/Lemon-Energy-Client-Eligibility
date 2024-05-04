## Descrição

O Lemon Energy Client Eligibility API é uma aplicação desenvolvida para facilitar a transição de empresas para o uso de energia limpa, contribuindo para a redução da emissão de gases de efeito estufa. Este sistema oferece uma solução automatizada que avalia se uma empresa é elegível para se tornar cliente da Lemon, baseando-se em critérios pré-definidos que incluem tipo de conexão elétrica, classe de consumo, modalidade tarifária e histórico de consumo elétrico.

### Funcionalidades Principais
1. **Verificação de Elegibilidade**: O software analisa automaticamente se a empresa atende aos critérios necessários para adotar energia limpa. Isso é determinado através de uma série de verificações regulatórias e de viabilidade que consideram a classe de consumo, a modalidade tarifária e o consumo médio de energia.

2. **Cálculo de Economia de CO2**: Para as empresas que são consideradas elegíveis, o sistema calcula a quantidade estimada de dióxido de carbono (CO2) que a empresa deixaria de emitir anualmente ao mudar para energia limpa. Este cálculo é baseado no consumo histórico de energia da empresa e nos dados de emissão média de CO2 para geração de energia no Brasil.

### Benefícios

- **Apoio à Sustentabilidade Ambiental**: Ao facilitar a transição para energia limpa, o software ajuda empresas a reduzirem suas pegadas de carbono, alinhando-se com práticas de sustentabilidade e responsabilidade ambiental.

- **Decisões Informadas**: Fornece informações cruciais que ajudam as empresas a tomar decisões informadas sobre a mudança para energia limpa, baseando-se em análises detalhadas de elegibilidade e benefícios ambientais.

Esta solução é ideal para empresas que buscam não apenas atender às regulamentações ambientais, mas também desejam desempenhar um papel ativo na luta contra as mudanças climáticas através da adoção de práticas de negócios mais verdes.

# Testes Unitários do Projeto

Este documento fornece uma visão geral dos testes unitários implementados para o projeto. Utilizamos o framework Jest em conjunto com o NestJS para garantir a qualidade e a robustez do código.

## Estrutura dos Testes

Os testes estão organizados de acordo com as camadas do projeto:

- **Controllers**: Testes para verificar se os controllers manipulam corretamente as solicitações HTTP e as respostas.
- **Services**: Testes para garantir que a lógica de negócios nos serviços está correta.
- **Models/DTOs**: Testes que verificam a validade dos modelos de dados e objetos de transferência de dados (DTOs).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Linguagem de programação tipada superset do JavaScript.
- **NestJS**: Framework Node.js para construção de aplicações server-side eficientes e escaláveis.
- **Jest**: Framework de teste em JavaScript.

## Configuração e Instalação
$ npm install


## Running the app
# development
$ npm run start

## Test
# unit tests
$ npm run test

##chamada via Postman
http://localhost:3000/cliente/check-elegibility

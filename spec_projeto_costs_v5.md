# Especificação Técnica: Projeto Costs (V5)

## 1. Visão Geral
O **Costs** é uma aplicação web de gestão de projetos concebida para ajudar utilizadores a controlar orçamentos e custos de serviços associados. A aplicação permite a criação, visualização, edição e exclusão de projetos e os seus respetivos serviços.

## 2. Stack Tecnológica
* **Frontend:** React (Build tool: Vite)
* **Linguagem:** JavaScript (JS)
* **Gerenciamento de Estados Assíncronos:** TanStack Query (React Query)
* **Gerenciamento de Formulários:** React Hook Form
* **Validação de Dados:** Zod
* **Comunicação HTTP:** Fetch API
* **Backend Simulado:** JSON-Server (executado na porta 5000)

## 3. Estrutura do Projeto (Diretórios)
- `env/`: Pasta fora do `src`, na raiz do projeto, onde estará o arquivo que define as API KEYS para autenticação.
- `src/assets`: Armazenamento de imagens (ex: `loading.svg`), logótipos e fontes estáticas.
- `src/components`: Componentes de UI reutilizáveis (Input, Select, Button, Navbar, Footer).
- `src/pages`: Componentes de página (Home, Projetos, Novo Projeto, Projeto [Edição], Empresa, Contacto).
- `src/services`: Lógica de comunicação com a API externa (funções de fetch e métodos HTTP).
- `src/context`: Implementação da Context API para gestão global de estados (ex: FlashMessages).

## 4. Regras de Negócio

### 4.1. Projetos
* **Campos obrigatórios:** Nome do projeto, Orçamento total e Categoria (Seletor).
* **CRUD:**
    * **Criação:** Envio via POST para o JSON-Server.
    * **Edição:** Carregamento de formulário pré-preenchido; atualização via PUT/PATCH.
    * **Exclusão:** A remoção de um projeto deve eliminar todos os dados associados, incluindo a lista de serviços.

### 4.2. Serviços (Sub-recursos)
* **Campos:** Nome do serviço, Custo do serviço e Techlead responsável.
* **Validação de Orçamento:**
    * O sistema deve calcular a soma dos custos de todos os serviços já adicionados.
    * Um novo serviço só é aceite se: `Custo do Serviço + Custo Total Atual <= Orçamento do Projeto`.
    * **Visualização:** Exibição dinâmica do "Custo Total" vs "Orçamento" na página de detalhes do projeto.

### 4.3. Feedback e Estados de Interface
* **Loading:** Exibição do `loading.svg` durante o processamento de pedidos assíncronos.
* **FlashMessages:** Notificações flutuantes para sucesso ou erro em operações incluindo API (ex: erro de conexão ou orçamento excedido).

## 5. Arquitetura de Dados e API

### 5.1. Services (`api.js`)
* Função base que abstrai o `fetch`.
* Parâmetros: `endpoint` e `options` (method, headers, body).
* Funções exportadas específicas para `GET`, `POST`, `PUT`, `DELETE`.
* Tratamento de erros globais para servidores offline ou respostas inesperadas.

### 5.2. Formulários Dinâmicos
* Componentes de formulário construídos a partir de um **Schema** via props.
* A escolha de qual componente será utilizado no formulário será informada via **schema via props**, assim como os atributos de cada componente.
* Os componentes atómicos (Label, Input, Select, etc) são puramente visuais e recebem atributos (id, placeholder, name, etc) dinamicamente.
* Integração obrigatória entre React Hook Form e Zod para garantir integridade dos dados antes do envio.

### 5.3. Context API (Messages)
* Utilização de um Provider para envolver a aplicação.
* Permite disparar mensagens de qualquer página ou componente sem necessidade de prop drilling.

## 6. Implementação Técnica: TanStack Query

### 6.1. Ciclo de Chamadas e Resiliência
O TanStack Query atua como o motor de gerenciamento de estado assíncrono, seguindo as regras:
* **Timeout do Servidor:** O sistema utiliza uma janela de **7 segundos** para definir falha de resposta. Caso excedido, exibir mensagem: "O servidor não respondeu à requisição".
* **Retentativas (Retry):** Para erros de conexão ou erro 500, o sistema realizará **3 retentativas** automáticas antes de disparar o estado de erro final.

### 6.2. Interoperabilidade e Feedback
* **Integração:** Os dados validados pelo React Hook Form (Tópico 5.2) são disparados via `useMutation`.
* **Hooks de Resposta:** Os métodos `onSuccess` e `onError` da mutation devem obrigatoriamente acionar o Context API (Tópico 5.3) para exibir o feedback visual (FlashMessages) ao utilizador.
* **Sincronização de Loading:** O estado `isLoading` ou `isPending` do TanStack Query deve controlar a renderização do `loading.svg` (Tópico 4.3).

## 7. Especificações de Testes (Qualidade e Consistência)

### 7.1. Ferramentas Utilizadas
* **Vitest:** Focado em testes unitários de lógica e testes de integração de componentes/hooks.
* **Playwright:** Focado em testes End-to-End (E2E), simulando a jornada completa do utilizador no browser.

### 7.2. Diretrizes de Geração de Código para Testes
Qualquer código de teste gerado para este projeto deve ser **integralmente baseado nas funcionalidades descritas nesta especificação**, seguindo os critérios de consistência abaixo:

* **Foco no Domínio:** Os testes não devem ser genéricos. Devem validar especificamente as regras de negócio do Costs, como o bloqueio de serviços que excedem o orçamento (Tópico 4.2).
* **Validação de Resiliência:** Scripts de teste devem incluir cenários de falha (Timeout de 7s) para verificar se o comportamento do TanStack Query condiz com o Tópico 6.1.
* **Cobertura de Formulários:** Testar a renderização dinâmica baseada no Schema (Tópico 5.2), garantindo que inputs e selects reagem corretamente às validações do Zod.
* **Testes Unitários e de Integração (Vitest):** Devem focar estritamente na validação e no funcionamento de cada componente de forma isolada ou integrada em pequenos blocos. Toda a simulação de estados, contextos e chamadas de API deve utilizar mocks concisos, simples e fáceis de compreender, isolando o escopo do componente do restante da aplicação.
* **Testes de Ponta a Ponta / E2E (Playwright):** Devem validar as jornadas completas do usuário no sistema através de funcionalidades separadas e fluxos críticos do projeto. O script deve interagir com a interface simulando com precisão as ações de um usuário real no navegador (como preencher formulários, clicar em botões de navegação e aguardar transições de tela).

---
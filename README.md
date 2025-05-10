# Gerador de Contratos Inteligente (Tema Dracula Neon)

Um aplicativo web front-end para gerar modelos de contratos diversos com preenchimento dinâmico e personalizável, utilizando um tema escuro estilo Dracula Neon.

![Pré-visualização do Gerador de Contratos](https://i.imgur.com/placeholder.png) <!-- Sugestão: Substitua por um screenshot real do seu app! -->

## 🎯 Objetivo do Projeto

Facilitar a criação de rascunhos de contratos comuns, fornecendo uma interface amigável, textos padrão editáveis e opções de personalização, ao mesmo tempo em que enfatiza a necessidade de revisão jurídica profissional.

## ✨ Funcionalidades Principais

*   **Formulário Intuitivo:** Campos organizados para informações das partes, detalhes do contrato e cláusulas.
*   **Tipos de Contrato:** Seleção de diversos tipos de contrato (Prestação de Serviços, Compra e Venda, Locação, NDA, etc.), com campos e cláusulas específicas carregadas dinamicamente.
*   **Cláusulas Padrão Editáveis:** Textos base para cláusulas comuns e específicas, que podem ser totalmente editados pelo usuário.
*   **Templating Dinâmico:** Algumas cláusulas utilizam variáveis (ex: `{{rescisao_aviso_previo_dias}}`) que são preenchidas automaticamente com base nos inputs do formulário.
*   **Condicionais:**
    *   Campo "Outro" para tipos de contrato não listados.
    *   Opção para incluir cláusula específica de SST (Saúde e Segurança no Trabalho) para serviços de alto risco.
    *   Opção para incluir/omitir cláusula de LGPD.
    *   Campos de variáveis específicas para Locação (valor do aluguel, dia de pagamento, etc.).
*   **Máscaras de Input:** Formatação automática para CPF/CNPJ, telefone, valores monetários, UF, etc., facilitando a entrada de dados.
*   **Validação de Formulário:** Campos obrigatórios são destacados se não preenchidos.
*   **Persistência de Dados:**
    *   Salvar progresso no Local Storage do navegador.
    *   Carregar progresso salvo.
    *   Limpar progresso salvo.
*   **Geração do Contrato:**
    *   Visualização do contrato em uma nova janela/aba, formatado para impressão.
    *   Highlight visual de placeholders (`[TEXTO]`) no contrato gerado para fácil identificação de campos a serem revisados/preenchidos.
    *   Opção para baixar o contrato gerado como arquivo HTML.
    *   Opção para copiar o conteúdo do contrato como texto puro.
*   **Integração WhatsApp (Simples):** Botões para abrir o WhatsApp com uma mensagem pré-definida para contactar as partes (requer que o usuário anexe o contrato salvo).
*   **Design Responsivo:** Adaptável a diferentes tamanhos de tela.
*   **Tema Dracula Neon:** Interface estilizada com um tema escuro moderno e vibrante.

## 🚀 Tecnologias Utilizadas

*   **HTML5:** Estrutura da página.
*   **CSS3:** Estilização visual (Flexbox, Grid, Variáveis CSS para o tema).
*   **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM, interações.
*   **jQuery 3.7.1:** Biblioteca JavaScript para simplificar a manipulação do DOM e AJAX (embora AJAX não seja usado aqui).
*   **jQuery Mask Plugin 1.14.16:** Para aplicar máscaras de formatação aos campos de input.
## ⚙️ Estrutura dos Arquivos

*   `index.html`: Contém a estrutura HTML principal da aplicação, incluindo o formulário e os contêineres para o contrato gerado.
*   `style.css`: Responsável por toda a estilização visual da página, incluindo o tema Dracula Neon, layout responsivo e estilos de impressão.
*   `script.js`: Contém toda a lógica JavaScript da aplicação, incluindo:
    *   Manipulação do DOM com jQuery.
    *   Aplicação de máscaras de input.
    *   Lógica para carregar textos padrão e cláusulas condicionais.
    *   Validação do formulário.
    *   Funcionalidades de persistência no Local Storage.
    *   Geração do conteúdo HTML do contrato.
    *   Funções de utilidade (formatação de data, valor por extenso, etc.).

## ✏️ Personalização

### Textos Padrão das Cláusulas

Os textos padrão para o objeto do contrato e para as diversas cláusulas (gerais e específicas por tipo de contrato) podem ser facilmente modificados no arquivo `script.js`. Procure pelo objeto `defaultTexts`.

Exemplo de estrutura dentro de `defaultTexts.especificas`:

```javascript
"Compra e Venda": {
    clausula_entrega_cv: "Texto padrão para a cláusula de entrega...",
    clausula_garantia_cv: "Texto padrão para a cláusula de garantia..."
},

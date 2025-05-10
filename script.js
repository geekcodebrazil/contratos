$(document).ready(function() {
    const FORM_DATA_KEY = 'contratoFormData';

    // Placeholder para highlight no contrato gerado
    const PLACEHOLDER_REGEX = /(\[.*?\])/g; // Captura qualquer texto entre colchetes
    const HIGHLIGHT_SPAN_START = '<span class="placeholder-highlight">';
    const HIGHLIGHT_SPAN_END = '</span>';

    function highlightPlaceholders(text) {
        if (typeof text !== 'string') return text;
        return text.replace(PLACEHOLDER_REGEX, `${HIGHLIGHT_SPAN_START}$1${HIGHLIGHT_SPAN_END}`);
    }

    const defaultTexts = {
        gerais: {
            clausula_rescisao: "Este contrato poderá ser rescindido por qualquer das partes, imotivadamente, mediante aviso prévio por escrito com antecedência mínima de {{rescisao_aviso_previo_dias}} dias. \nParágrafo Primeiro: Em caso de rescisão por descumprimento de qualquer cláusula contratual, a parte infratora sujeitar-se-á ao pagamento de multa correspondente a {{rescisao_multa_percentual}}% do valor remanescente do contrato, sem prejuízo de eventuais perdas e danos. \nParágrafo Segundo: A rescisão não eximirá as partes do cumprimento das obrigações pendentes e já vencidas.",
            clausula_notificacoes: "Todas as comunicações e notificações entre as partes, relativas a este contrato, deverão ser feitas por escrito e entregues pessoalmente, mediante recibo, ou por correspondência registrada com aviso de recebimento, ou ainda por e-mail com confirmação de leitura, nos endereços indicados no preâmbulo deste instrumento, ou em outros que vierem a ser formalmente comunicados.",
            clausula_alteracoes: "Quaisquer alterações, aditamentos ou novações ao presente contrato somente terão validade se realizados por escrito, mediante Termo Aditivo devidamente assinado por ambas as partes ou seus representantes legais.",
            clausula_lgpd: "As Partes declaram ter conhecimento e se comprometem a cumprir as disposições da Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018), no que couber, em relação a todos os dados pessoais que venham a ser tratados em decorrência deste Contrato. \nParágrafo Primeiro: Cada Parte será individualmente responsável por garantir a legalidade do tratamento dos dados pessoais sob sua responsabilidade, incluindo a obtenção de consentimento quando necessário e a adoção de medidas de segurança técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito. \nParágrafo Segundo: As Partes se comprometem a cooperar mutuamente para atender às solicitações dos titulares dos dados e às exigências das autoridades competentes, relacionadas à proteção de dados pessoais tratados no âmbito deste Contrato."
        },
        objeto: {
            "Prestação de Serviços": "O presente contrato tem por objeto a prestação de serviços de [ESPECIFICAR DETALHADAMENTE OS SERVIÇOS], a serem executados pelo(a) CONTRATADO(A) em favor do(a) CONTRATANTE, conforme especificações e condições a seguir detalhadas: [LISTAR ATIVIDADES, METAS, ENTREGÁVEIS].",
            "Compra e Venda": "O presente contrato tem por objeto a compra e venda do(s) seguinte(s) bem(ns): [DESCREVER O BEM OU LISTA DE BENS, INCLUINDO MARCA, MODELO, NÚMERO DE SÉRIE, QUANTIDADE, ESTADO DE CONSERVAÇÃO, ETC.].",
            "Locação (Aluguel)": "O presente contrato tem por objeto a locação do imóvel sito à [ENDEREÇO COMPLETO DO IMÓVEL], com as seguintes características: [DESCREVER O IMÓVEL – EX: APARTAMENTO COM X QUARTOS, CASA COM Y CÔMODOS, VAGA DE GARAGEM Nº Z]. O imóvel destina-se exclusivamente a fins [RESIDENCIAIS/COMERCIAIS PARA ATIVIDADE DE...].",
            "Parceria Comercial": "O presente contrato tem por objeto estabelecer uma parceria comercial entre as partes para [DESCREVER O OBJETIVO DA PARCERIA, EX: desenvolvimento conjunto do produto X, exploração do mercado Y, promoção de eventos Z]. As contribuições e responsabilidades de cada parte estão detalhadas nas cláusulas subsequentes.",
            "Confidencialidade (NDA)": "O presente Acordo de Confidencialidade (NDA) tem por objeto regular a troca de Informações Confidenciais entre as Partes no contexto de [DESCREVER A FINALIDADE DA TROCA DE INFORMAÇÕES, EX: análise de uma potencial colaboração, negociação de um projeto, avaliação de investimento no projeto Y].",
            "Mútuo": "O presente contrato tem por objeto o empréstimo (mútuo) da quantia de R$ [VALOR POR EXTENSO] ([VALOR NUMÉRICO]), concedido pelo(a) MUTUANTE ao(à) MUTUÁRIO(A), ou do bem fungível [DESCREVER O BEM, QUANTIDADE, QUALIDADE].",
            "Comodato": "O presente contrato tem por objeto o empréstimo gratuito (comodato) do seguinte bem infungível de propriedade do(a) COMODANTE: [DESCREVER DETALHADAMENTE O BEM, EX: VEÍCULO MARCA X, MODELO Y, ANO Z, PLACA ABC-1234, CHASSI WZY... OU EQUIPAMENTO MARCA A, MODELO B, NÚMERO DE SÉRIE C].",
            "Outro": "Descreva aqui detalhadamente o objeto principal deste contrato específico: [OBJETO DO CONTRATO]."
        },
        especificas: {
            "Prestação de Serviços": {
                clausula_obrigacoes_contratante_ps: "Constituem obrigações do(a) CONTRATANTE: \na) Fornecer ao(à) CONTRATADO(A) todas as informações, documentos e condições necessárias à boa e pontual execução dos serviços; \nb) Efetuar os pagamentos devidos nos prazos e formas acordados neste instrumento; \nc) [ADICIONAR OUTRAS OBRIGAÇÕES ESPECÍFICAS DA CONTRATANTE, SE HOUVER].",
                clausula_obrigacoes_contratado_ps: "Constituem obrigações do(a) CONTRATADO(A): \na) Prestar os serviços objeto deste contrato com a maior diligência, zelo técnico e observância às normas legais e regulamentares aplicáveis; \nb) Fornecer os materiais, equipamentos e mão de obra qualificada necessários à execução dos serviços, salvo se expressamente acordado de forma diversa; \nc) Cumprir os prazos estabelecidos para a conclusão dos serviços; \nd) Manter sigilo sobre todas as informações confidenciais do(a) CONTRATANTE a que tiver acesso em razão deste contrato; \ne) [ADICIONAR OUTRAS OBRIGAÇÕES ESPECÍFICAS DA CONTRATADA, SE HOUVER]."
            },
            "Compra e Venda": {
                clausula_entrega_cv: "A entrega do(s) bem(ns) será realizada no [ENDEREÇO DE ENTREGA OU 'LOCAL ONDE SE ENCONTRA(M) O(S) BEM(NS)'], em até [XX] dias úteis após [CONDIÇÃO PARA ENTREGA, EX: a confirmação do pagamento integral / a assinatura deste contrato]. As despesas de transporte, seguro e entrega correrão por conta do(a) [COMPRADOR(A)/VENDEDOR(A)]. \nParágrafo Único: No ato da entrega, o(a) COMPRADOR(A) deverá inspecionar o(s) bem(ns) e, estando em conformidade, formalizar o recebimento.",
                clausula_garantia_cv: "O(s) bem(ns) é(são) vendido(s) no estado de conservação em que se encontra(m), conforme vistoria prévia realizada pelo(a) COMPRADOR(A) (se aplicável). O(A) VENDEDOR(A) concede garantia legal sobre o(s) bem(ns) contra vícios redibitórios. [SE HOUVER GARANTIA CONTRATUAL ADICIONAL, ESPECIFICAR: O(A) VENDEDOR(A) concede, adicionalmente, garantia contratual de [PRAZO] meses/anos, cobrindo [ESPECIFICAR COBERTURA]]."
            },
            "Locação (Aluguel)": {
                clausula_aluguel_encargos_loc: "O valor mensal do aluguel é de R$ {{locacao_valor_aluguel_mensal}} ({{locacao_valor_aluguel_mensal_extenso}}), a ser pago rigorosamente até o {{locacao_dia_pagamento_aluguel}}º ({{locacao_dia_pagamento_aluguel_extenso}}) dia útil de cada mês subsequente ao vencido, mediante {{locacao_forma_pagamento_aluguel}}. \nParágrafo Primeiro: Além do aluguel, correrão integralmente por conta do(a) LOCATÁRIO(A) as despesas de: [LISTAR: Imposto Predial e Territorial Urbano (IPTU), taxa de condomínio (se houver), consumo de água, energia elétrica, gás, e seguro contra incêndio do imóvel no valor de R$ XXXX]. \nParágrafo Segundo: O valor do aluguel será reajustado anualmente, ou na menor periodicidade permitida por lei, com base na variação positiva do índice {{locacao_indice_reajuste}}. Na ausência ou extinção do índice escolhido, será utilizado outro que legalmente o substitua ou, na falta deste, a média dos principais índices de inflação.",
                clausula_conservacao_uso_loc: "O(A) LOCATÁRIO(A) declara ter recebido o imóvel em perfeito estado de conservação, limpeza e funcionamento, conforme [TERMO DE VISTORIA INICIAL, ANEXO A ESTE CONTRATO, SE HOUVER], obrigando-se a devolvê-lo nas mesmas condições, ressalvado o desgaste natural pelo uso regular. \nParágrafo Primeiro: O(A) LOCATÁRIO(A) deverá utilizar o imóvel exclusivamente para os fins [RESIDENCIAIS/COMERCIAIS ESPECIFICADOS NO OBJETO], mantendo-o em bom estado e realizando, às suas expensas, todos os reparos e consertos necessários decorrentes de seu uso. \nParágrafo Segundo: Quaisquer benfeitorias ou modificações no imóvel, ainda que necessárias, dependerão de autorização prévia e expressa do(a) LOCADOR(A). As benfeitorias [NECESSÁRIAS/ÚTEIS/VOLUPTUÁRIAS] [SERÃO/NÃO SERÃO] indenizáveis e [PODERÃO/NÃO PODERÃO] ser objeto de direito de retenção ou levantamento ao final da locação.",
                clausula_garantia_locaticia_loc: "Como garantia das obrigações assumidas neste contrato, o(a) LOCATÁRIO(A) apresenta a modalidade de {{locacao_tipo_garantia}}, consistente em {{locacao_detalhes_garantia}}. \nParágrafo Único: [SE APLICÁVEL À GARANTIA ESCOLHIDA, ADICIONAR DETALHES, EX: Para caução em dinheiro: O valor da caução será depositado em caderneta de poupança vinculada, e restituído ao final da locação, se não houver débitos. Para fiador: Nome completo, CPF, endereço do fiador e, se aplicável, dados do imóvel dado em fiança]."
            },
            "Parceria Comercial": {
                clausula_contribuicoes_pc: "Para a consecução do objeto desta parceria, a PARTE CONTRATANTE se compromete a contribuir com: [LISTAR DETALHADAMENTE AS CONTRIBUIÇÕES DA CONTRATANTE: EX: capital financeiro, expertise técnica, recursos humanos, instalações, etc.]. \nPor sua vez, a PARTE CONTRATADA se compromete a contribuir com: [LISTAR DETALHADAMENTE AS CONTRIBUIÇÕES DA CONTRATADA].",
                clausula_resultados_responsabilidades_pc: "Os resultados financeiros (lucros ou prejuízos) advindos da execução desta parceria serão partilhados entre as partes na seguinte proporção: [XX]% para a PARTE CONTRATANTE e [YY]% para a PARTE CONTRATADA, apurados [PERIODICIDADE, EX: mensalmente, trimestralmente, ao final do projeto]. \nParágrafo Primeiro: As responsabilidades operacionais, gerenciais e pela execução das atividades da parceria serão divididas conforme [DETALHAR A DIVISÃO DE TAREFAS E RESPONSABILIDADES]. \nParágrafo Segundo: Cada parte será individual e exclusivamente responsável por suas respectivas obrigações tributárias, trabalhistas, previdenciárias e quaisquer outros encargos decorrentes de suas atividades no âmbito desta parceria, não havendo solidariedade entre elas."
            },
            "Confidencialidade (NDA)": {
                clausula_definicao_confidencial_nda: "Para os fins deste Acordo, 'Informação Confidencial' significa toda e qualquer informação, em qualquer forma (oral, escrita, eletrônica, gráfica, etc.), revelada por uma Parte (a 'Parte Reveladora') à outra Parte (a 'Parte Receptora'), que seja marcada ou identificada como confidencial no momento da revelação, ou que, pela sua natureza ou pelas circunstâncias da revelação, deva ser razoavelmente entendida como confidencial. Inclui, mas não se limita a: segredos comerciais, know-how, dados técnicos, especificações de produtos, planos de negócios, estratégias de marketing, informações financeiras, listas de clientes e fornecedores, protótipos, amostras, software e quaisquer outras informações proprietárias.",
                clausula_obrigacoes_receptor_nda: "A Parte Receptora obriga-se a: \na) Manter a Informação Confidencial em estrita confidência, utilizando para sua proteção o mesmo grau de cuidado que emprega para proteger suas próprias informações confidenciais de natureza similar, e nunca inferior a um padrão razoável de cuidado; \nb) Utilizar a Informação Confidencial exclusivamente para os fins estabelecidos no objeto deste Acordo; \nc) Não copiar, reproduzir ou de qualquer forma duplicar a Informação Confidencial, exceto quando estritamente necessário para os fins deste Acordo; \nd) Não divulgar a Informação Confidencial a terceiros, exceto a seus empregados, diretores, consultores ou agentes que necessitem conhecê-la para os fins deste Acordo ('Representantes'), desde que tais Representantes sejam informados da natureza confidencial da informação e estejam legalmente ou contratualmente obrigados a manter tal confidencialidade em termos não menos protetivos que os deste Acordo. A Parte Receptora será responsável por qualquer violação deste Acordo por seus Representantes. \nParágrafo Único: As obrigações de confidencialidade aqui estabelecidas permanecerão em vigor por um período de [PRAZO, EX: 5 (cinco) anos] contados a partir da data de término ou rescisão deste Acordo, ou enquanto a informação mantiver seu caráter confidencial, o que ocorrer por último."
            },
            "Mútuo": {
                clausula_devolucao_mutuo: "O(A) MUTUÁRIO(A) se obriga a restituir ao(à) MUTUANTE a quantia mutuada (ou o bem fungível de igual gênero, qualidade e quantidade) até a data de [DATA LIMITE PARA DEVOLUÇÃO], [EM PARCELA ÚNICA / ou EM [NÚMERO] PARCELAS IGUAIS, MENSAIS E CONSECUTIVAS NO VALOR DE R$ [VALOR DA PARCELA] CADA, VENCENDO A PRIMEIRA EM [DATA DA PRIMEIRA PARCELA] E AS DEMAIS NOS MESMOS DIAS DOS MESES SUBSEQUENTES]. O pagamento será efetuado [FORMA DE PAGAMENTO, EX: mediante depósito na conta X].",
                clausula_juros_encargos_mutuo: "[CASO HAJA JUROS REMUNERATÓRIOS:] Sobre o valor principal mutuado incidirão juros remuneratórios à taxa de [TAXA]% ([TAXA POR EXTENSO] por cento) ao [PERÍODO: mês/ano], calculados [FORMA DE CÁLCULO: pro rata die, Tabela Price, etc.] e pagos [PERIODICIDADE DO PAGAMENTO DOS JUROS: juntamente com cada parcela, ao final, etc.]. \n[CASO HAJA CORREÇÃO MONETÁRIA:] O saldo devedor será corrigido monetariamente com base na variação do índice [ÍNDICE, EX: IPCA/IBGE, IGP-M/FGV], apurada [PERIODICIDADE DA CORREÇÃO]. \nParágrafo Único: Em caso de atraso no pagamento de qualquer parcela, sobre o valor devido incidirá multa moratória de [MULTA]% ([MULTA POR EXTENSO] por cento), juros de mora de 1% (um por cento) ao mês, calculados pro rata die, e correção monetária pelo mesmo índice aqui estabelecido, sem prejuízo de outras medidas cabíveis."
            },
            "Comodato": {
                clausula_prazo_comodato: "O presente comodato é ajustado pelo prazo de [PRAZO DETERMINADO, EX: XX (número por extenso) meses/anos], iniciando-se na data de assinatura deste instrumento e terminando em [DATA DE TÉRMINO]. OU [POR PRAZO INDETERMINADO, podendo ser denunciado por qualquer das partes, a qualquer tempo, mediante notificação escrita com antecedência mínima de [NÚMERO] dias.]. \nParágrafo Único: Caso o(a) COMODATÁRIO(A) não restitua o bem no prazo ajustado ou após a notificação para tal, ficará sujeito(a) ao pagamento de aluguel-pena a ser arbitrado pelo(a) COMODANTE, no valor diário de R$ [VALOR], até a efetiva devolução, sem prejuízo de outras sanções legais e contratuais.",
                clausula_obrigacoes_comodatario_comodato: "O(A) COMODATÁRIO(A) obriga-se a: \na) Utilizar o bem emprestado exclusivamente para os fins de [ESPECIFICAR A FINALIDADE DE USO DO BEM], com o devido cuidado e diligência, como se seu fosse; \nb) Conservar o bem em perfeito estado, responsabilizando-se por todas as despesas de uso, manutenção, guarda e conservação durante o período do comodato; \nc) Não ceder, alugar, emprestar, sublocar ou de qualquer forma transferir a posse do bem a terceiros, total ou parcialmente, sem o consentimento prévio e por escrito do(a) COMODANTE; \nd) Restituir o bem ao(à) COMODANTE ao término do prazo estipulado ou quando solicitado, nas mesmas condições em que o recebeu, ressalvado o desgaste natural decorrente do seu uso normal e regular; \ne) Responder por perdas e danos que vier a causar ao bem, inclusive em caso de fortuito ou força maior se, nessas circunstâncias, o bem pudesse ser salvo em detrimento de bens próprios do(a) COMODATÁRIO(A)."
            }
        }
    };

    // Máscaras
    $('#contratante_doc, #contratado_doc').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');
        if (value.length <= 11) { // CPF
            $(this).mask('000.000.000-009', {reverse: true, placeholder: "___.___.___-__"});
        } else { // CNPJ
            $(this).mask('00.000.000/0000-00', {reverse: true, placeholder: "__.___.___/____-__"});
        }
    }).on('blur', function() { // Limpa a máscara se o campo estiver vazio
        if ($(this).val().replace(/\D/g, '') === '') {
            $(this).unmask().val('');
        }
    });
    $('#contratante_telefone_whatsapp, #contratado_telefone_whatsapp').mask('0000000000000', {placeholder: "Ex: 5511999998888"}); // Aceita de 10 a 13 dígitos
    $('#valor_contrato, #locacao_valor_aluguel_mensal').mask('000.000.000.000.000,00', {reverse: true, placeholder: "0,00"});
    $('#estado_foro').mask('SS', {placeholder: "UF"});
    $('#rescisao_aviso_previo_dias, #rescisao_multa_percentual, #locacao_dia_pagamento_aluguel').mask('000');


    function renderTemplate(templateString, data) {
        if (typeof templateString !== 'string') return '';
        return templateString.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data.hasOwnProperty(key) ? (data[key] || '') : match; // Retorna string vazia se o dado for null/undefined
        });
    }

    function saveFormData() {
        const formData = {};
        $('#contractForm').find('input, select, textarea').each(function() {
            const $el = $(this);
            const id = $el.attr('id');
            if (id) {
                if ($el.is(':checkbox')) {
                    formData[id] = $el.is(':checked');
                } else {
                    formData[id] = $el.val();
                }
            }
        });
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
        $('#btnSalvarProgresso').text('✔ Progresso Salvo!').addClass('saved');
        if (!$('#save-feedback').length) {
            $('#btnSalvarProgresso').after('<span id="save-feedback" style="display:none;"></span>');
        }
        $('#save-feedback').text('Salvo com sucesso!').fadeIn();
        setTimeout(() => {
            $('#btnSalvarProgresso').text('Salvar Progresso').removeClass('saved');
            $('#save-feedback').fadeOut(function(){ $(this).text(''); });
        }, 2500);
    }

    function loadFormData() {
        const savedData = localStorage.getItem(FORM_DATA_KEY);
        if (savedData) {
            const formData = JSON.parse(savedData);
            let fieldsLoaded = 0;
            $('#contractForm').find('input, select, textarea').each(function() {
                const $el = $(this);
                const id = $el.attr('id');
                if (id && formData.hasOwnProperty(id)) {
                    if ($el.is(':checkbox')) {
                        $el.prop('checked', formData[id]);
                    } else {
                        $el.val(formData[id]);
                    }
                    if ($el.is('select') || $el.attr('type') === 'date' || $el.data('mask') || $el.hasClass('masked-input') || id === 'contratante_doc' || id === 'contratado_doc') {
                         $el.trigger('change').trigger('input'); // 'input' for masks
                    }
                    if ($el.is('textarea') && $el.val() !== '' && $el.val() !== $el.data('previous-default')) {
                        $el.removeClass('has-default-text');
                    } else if ($el.is('textarea') && $el.val() !== '' && $el.data('previous-default') && $el.val() === $el.data('previous-default')) {
                        $el.addClass('has-default-text');
                    }
                    fieldsLoaded++;
                }
            });

            $('#tipo_contrato').trigger('change');
            $('#data_termino_tipo').trigger('change');
            $('#locacao_tipo_garantia').trigger('change'); 
            $('#incluir_clausula_lgpd').trigger('change');


            if (fieldsLoaded > 0) {
                const $btnCarregar = $('#btnCarregarProgresso');
                const originalText = $btnCarregar.text();
                $btnCarregar.text('✔ Progresso Carregado!').addClass('saved');
                setTimeout(() => $btnCarregar.text(originalText).removeClass('saved'), 2500);
            } else {
                 alert('Nenhum dado salvo encontrado para os campos atuais.');
            }
        } else {
            alert('Nenhum progresso salvo encontrado no navegador.');
            $('#tipo_contrato').trigger('change'); // Aplicar defaults se não houver dados salvos
        }
    }

    function clearSavedData() {
        if (confirm('Tem certeza que deseja limpar todos os dados de progresso salvos no navegador?')) {
            localStorage.removeItem(FORM_DATA_KEY);
            const $btnLimpar = $('#btnLimparProgresso');
            const originalText = $btnLimpar.text();
            $btnLimpar.text('✔ Progresso Limpo!').addClass('saved');
            setTimeout(() => $btnLimpar.text(originalText).removeClass('saved'), 2500);
        }
    }

    $('#btnSalvarProgresso').click(saveFormData);
    $('#btnCarregarProgresso').click(loadFormData);
    $('#btnLimparProgresso').click(clearSavedData);

    function applyDefaultText($element, text, isTemplate = false, templateData = {}) {
        let finalText = text;
        if (isTemplate) {
            finalText = renderTemplate(text, templateData);
        }

        if ($element.val() === '' || $element.val() === $element.data('previous-default')) {
            $element.val(finalText).addClass('has-default-text');
            $element.data('previous-default', finalText);
        } else {
             $element.removeClass('has-default-text');
        }
    }
    
    $('textarea').on('focus', function() {
        // Se o texto atual é um default, remove a classe para mudar a cor ao focar/digitar
        if ($(this).val() === $(this).data('previous-default')) {
             $(this).removeClass('has-default-text');
        }
    }).on('blur', function() {
        // Se o campo ficou vazio, ou voltou ao default, re-adiciona a classe
        if ($(this).val() === '' || $(this).val() === $(this).data('previous-default')) {
            if ($(this).data('previous-default') && $(this).data('previous-default') !== '') {
                $(this).addClass('has-default-text');
            }
        }
    }).on('input', function() { // Garante que a classe é removida ao digitar
        if ($(this).val() !== $(this).data('previous-default')) {
            $(this).removeClass('has-default-text');
        }
    });

    function getTemplateDataForDefaults() {
        return {
            rescisao_aviso_previo_dias: $('#rescisao_aviso_previo_dias').val() || "30",
            rescisao_multa_percentual: $('#rescisao_multa_percentual').val() || "10",
            locacao_valor_aluguel_mensal: $('#locacao_valor_aluguel_mensal').val() || "0,00",
            locacao_valor_aluguel_mensal_extenso: valorPorExtenso($('#locacao_valor_aluguel_mensal').val()),
            locacao_dia_pagamento_aluguel: $('#locacao_dia_pagamento_aluguel').val() || "5",
            locacao_dia_pagamento_aluguel_extenso: numeroParaOrdinalExtenso($('#locacao_dia_pagamento_aluguel').val()).toLowerCase(),
            locacao_forma_pagamento_aluguel: $('#locacao_forma_pagamento_aluguel').val() || "[FORMA DE PAGAMENTO]",
            locacao_indice_reajuste: $('#locacao_indice_reajuste').val() || "[ÍNDICE DE REAJUSTE]",
            locacao_tipo_garantia: $('#locacao_tipo_garantia').val() || "Nenhuma",
            locacao_detalhes_garantia: $('#locacao_detalhes_garantia').val() || "Não Aplicável",
        };
    }

    $('#tipo_contrato').change(function() {
        const val = $(this).val();
        const templateData = getTemplateDataForDefaults();

        if (val === 'Outro') {
            $('#tipo_contrato_outro_container').slideDown();
            $('#tipo_contrato_outro').prop('required', true);
        } else {
            $('#tipo_contrato_outro_container').slideUp();
            $('#tipo_contrato_outro').prop('required', false).val('');
        }

        if (val === 'Prestação de Serviços') {
            $('#opcoes_prestacao_servicos').slideDown();
        } else {
            $('#opcoes_prestacao_servicos').slideUp();
            $('#servico_alto_risco').prop('checked', false);
        }
        
        if (val === 'Locação (Aluguel)') {
            $('#locacao_variaveis_container').slideDown();
        } else {
            $('#locacao_variaveis_container').slideUp();
        }

        $('.clausulas-especificas-container').hide();
        
        if (defaultTexts.objeto[val]) {
            applyDefaultText($('#objeto_contrato'), defaultTexts.objeto[val]);
        } else {
            applyDefaultText($('#objeto_contrato'), defaultTexts.objeto['Outro']);
        }
        
        applyDefaultText($('#clausula_rescisao'), defaultTexts.gerais.clausula_rescisao, true, templateData);
        applyDefaultText($('#clausula_notificacoes'), defaultTexts.gerais.clausula_notificacoes);
        applyDefaultText($('#clausula_alteracoes'), defaultTexts.gerais.clausula_alteracoes);
        applyDefaultText($('#clausula_lgpd_texto'), defaultTexts.gerais.clausula_lgpd);

        if (val && defaultTexts.especificas[val]) {
            const containerId = `#clausulas_especificas_${val.toLowerCase().replace(/\s|\(|\)/g, '_')}`;
            $(containerId).slideDown();
            for (const clausulaId in defaultTexts.especificas[val]) {
                applyDefaultText($(`#${clausulaId}`), defaultTexts.especificas[val][clausulaId], true, templateData);
            }
        }
    });
    
    // Atualizar cláusulas que usam templates quando as variáveis mudam
    $('#rescisao_aviso_previo_dias, #rescisao_multa_percentual, #locacao_valor_aluguel_mensal, #locacao_dia_pagamento_aluguel, #locacao_forma_pagamento_aluguel, #locacao_indice_reajuste, #locacao_tipo_garantia, #locacao_detalhes_garantia').on('change input', function() {
        const templateData = getTemplateDataForDefaults();
        // Apenas atualiza se o campo da cláusula ainda estiver com o default anterior ou vazio
        if ($('#clausula_rescisao').val() === $('#clausula_rescisao').data('previous-default') || $('#clausula_rescisao').val() === '') {
           applyDefaultText($('#clausula_rescisao'), defaultTexts.gerais.clausula_rescisao, true, templateData);
        }
        if ($('#tipo_contrato').val() === 'Locação (Aluguel)') {
            if ($('#clausula_aluguel_encargos_loc').val() === $('#clausula_aluguel_encargos_loc').data('previous-default') || $('#clausula_aluguel_encargos_loc').val() === '') {
                applyDefaultText($('#clausula_aluguel_encargos_loc'), defaultTexts.especificas["Locação (Aluguel)"].clausula_aluguel_encargos_loc, true, templateData);
            }
            if ($('#clausula_garantia_locaticia_loc').val() === $('#clausula_garantia_locaticia_loc').data('previous-default') || $('#clausula_garantia_locaticia_loc').val() === '') {
                applyDefaultText($('#clausula_garantia_locaticia_loc'), defaultTexts.especificas["Locação (Aluguel)"].clausula_garantia_locaticia_loc, true, templateData);
            }
        }
    });


    $('#data_termino_tipo').change(function() {
        if ($(this).val() === 'data_especifica') {
            $('#data_termino_container').slideDown();
            $('#data_termino').prop('required', true);
        } else {
            $('#data_termino_container').slideUp();
            $('#data_termino').prop('required', false).val('');
        }
    });
    
    $('#locacao_tipo_garantia').change(function() {
        const val = $(this).val();
        if (val !== "" && val !== "Nenhuma") {
            $('#locacao_detalhes_garantia_container').slideDown();
            $('#locacao_detalhes_garantia').prop('required', true);
        } else {
            $('#locacao_detalhes_garantia_container').slideUp();
            $('#locacao_detalhes_garantia').prop('required', false).val('');
        }
    });

    $('#incluir_clausula_lgpd').change(function() {
        if ($(this).is(':checked')) {
            $('#clausula_lgpd_texto_container').slideDown();
        } else {
            $('#clausula_lgpd_texto_container').slideUp();
        }
    });


    function initializeFormDefaults() {
        // Set default values for new variable inputs
        $('#rescisao_aviso_previo_dias').val('30');
        $('#rescisao_multa_percentual').val('10');
        $('#locacao_dia_pagamento_aluguel').val('5');
        $('#locacao_indice_reajuste').val('IGP-M/FGV');
        $('#locacao_forma_pagamento_aluguel').val('Depósito em Conta Corrente'); // Exemplo
        // Disparar changes para aplicar defaults e lógica condicional
        $('#tipo_contrato').trigger('change');
        $('#data_termino_tipo').trigger('change');
        $('#locacao_tipo_garantia').trigger('change');
        $('#incluir_clausula_lgpd').prop('checked', true).trigger('change'); // Default LGPD marcada
    }


    if (localStorage.getItem(FORM_DATA_KEY)) {
        loadFormData(); // Carrega dados salvos e dispara os triggers necessários
    } else {
        initializeFormDefaults(); // Aplica defaults iniciais
    }


    $('#btnLimparFormulario').click(function() {
        if (confirm("Tem certeza que deseja limpar todos os campos do formulário? Isso não afetará o progresso salvo.")) {
            $('#contractForm')[0].reset(); // Reset nativo primeiro
            
            // Limpa textareas e remove classes/data de default
            $('#contractForm').find('textarea').each(function() {
                $(this).val('').removeClass('has-default-text').data('previous-default', '');
            });
            // Limpa outros inputs que podem não ser resetados corretamente por reset()
            $('#contractForm').find('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="number"]').val('');
            $('#contractForm').find('select').prop('selectedIndex', 0);
            $('#contractForm').find('input[type="checkbox"]').prop('checked', false);

            // Re-aplica máscaras e valores padrão para campos de variáveis
            $('#contratante_doc, #contratado_doc').trigger('input'); // Reapply masks
            $('#valor_contrato, #locacao_valor_aluguel_mensal').val(''); // Limpa valores monetários
            
            initializeFormDefaults(); // Re-inicializa todos os defaults e triggers

            $('#tipo_contrato_outro').prop('required', false);
            $('#data_termino').prop('required', false);
            $('#locacao_detalhes_garantia').prop('required', false);
            
            $('#posGeracao').hide();
            alert('Formulário limpo. Textos padrão e valores default foram reaplicados.');
        }
    });

    function formatDate(inputDate) {
        if (!inputDate) return 'N/A';
        const parts = inputDate.split('-'); // YYYY-MM-DD
        if (parts.length === 3) {
            if (parts[0].length === 4 && !isNaN(parts[1]) && !isNaN(parts[2])) {
                const date = new Date(parts[0], parts[1] - 1, parts[2]);
                if (date.getFullYear() == parts[0] && (date.getMonth() + 1) == parts[1] && date.getDate() == parts[2]) {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            }
        }
        return '[Data Inválida]';
    }

    function numeroParaOrdinalExtenso(numStr) {
        const num = parseInt(numStr);
        if (isNaN(num) || num < 1) return numStr ? numStr.toString() : "";
        const unidades = ["", "PRIMEIRA", "SEGUNDA", "TERCEIRA", "QUARTA", "QUINTA", "SEXTA", "SÉTIMA", "OITAVA", "NONA"];
        const dezenas = ["", "DÉCIMA", "VIGÉSIMA", "TRIGÉSIMA", "QUADRAGÉSIMA", "QUINQUAGÉSIMA", "SEXAGÉSIMA", "SEPTUAGÉSIMA", "OCTOGÉSIMA", "NONAGÉSIMA"];
        if (num < 10) return unidades[num];
        if (num % 10 === 0 && num < 100) return dezenas[num / 10];
        if (num < 20) return dezenas[1] + (unidades[num % 10] ? " " + unidades[num % 10] : "");
        if (num < 100) return dezenas[Math.floor(num / 10)] + (unidades[num % 10] ? " " + unidades[num % 10] : "");
        return num.toString() + "ª";
     }

     function valorPorExtenso(numero) {
        if (numero === null || numero === undefined || numero === "") return "[VALOR NÃO INFORMADO]";
        let strNumero = String(numero).replace(/\./g, '').replace(',', '.');
        let valor = parseFloat(strNumero);
        if (isNaN(valor)) return "[VALOR INVÁLIDO]";
    
        const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
        const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
        const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
        const especiais = ["dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    
        function converterInteiro(n) {
            if (n === 0) return "zero";
            if (n < 0) return "menos " + converterInteiro(Math.abs(n));
            let extenso = "";
            if (n >= 1000000000) {
                extenso += converterInteiro(Math.floor(n / 1000000000)) + (Math.floor(n / 1000000000) === 1 ? " bilhão" : " bilhões");
                n %= 1000000000; if (n > 0) extenso += " e ";
            }
            if (n >= 1000000) {
                extenso += converterInteiro(Math.floor(n / 1000000)) + (Math.floor(n / 1000000) === 1 ? " milhão" : " milhões");
                n %= 1000000; if (n > 0) extenso += " e ";
            }
            if (n >= 1000) {
                if (n >= 1000 && n < 2000) extenso += "mil";
                else extenso += converterInteiro(Math.floor(n / 1000)) + " mil";
                n %= 1000; if (n > 0 && n < 100) extenso += " e "; else if (n > 0) extenso += " ";
            }
            if (n >= 100) {
                if (n === 100 && extenso !== "" && !extenso.endsWith(" e ")) extenso += " e ";
                else if (n === 100 && extenso === "") {} 
                else if (extenso !== "" && !extenso.endsWith(" e ") && !extenso.endsWith(" ")) extenso += " e ";
                extenso += centenas[Math.floor(n / 100)];
                n %= 100; if (n > 0) extenso += " e ";
            }
            if (n >= 20) {
                extenso += dezenas[Math.floor(n / 10)];
                n %= 10; if (n > 0) extenso += " e ";
            } else if (n >= 10) {
                extenso += especiais[n - 10]; n = 0;
            }
            if (n > 0) { extenso += unidades[n]; }
            return extenso.trim().replace(/\s+e\s*$/, "");
        }
        const parteInteira = Math.floor(valor);
        const parteDecimal = Math.round((valor - parteInteira) * 100);
        let extensoInteiro = converterInteiro(parteInteira);
        if (extensoInteiro === "") extensoInteiro = "zero";
        let resultado = extensoInteiro + (parteInteira === 1 ? " real" : " reais");
        if (parteDecimal > 0) {
            resultado += " e " + converterInteiro(parteDecimal) + (parteDecimal === 1 ? " centavo" : " centavos");
        }
        return resultado.charAt(0).toUpperCase() + resultado.slice(1);
    }


    $('#btnGerarContrato').click(function() {
        $('#posGeracao').hide();

        if (!$('#contractForm')[0].checkValidity()) {
            alert('Por favor, preencha todos os campos obrigatórios destacados.');
            $('#contractForm')[0].reportValidity();
            return;
        }
        if ($('#tipo_contrato').val() === 'Outro' && !$('#tipo_contrato_outro').val().trim()) {
            alert('Por favor, especifique o tipo de contrato em "Outro".');
            $('#tipo_contrato_outro').focus();
            return;
        }
        saveFormData();

        const dados = {
            contratanteNome: $('#contratante_nome').val() || "[NOME CONTRATANTE]",
            contratanteDoc: $('#contratante_doc').val() || "[DOCUMENTO CONTRATANTE]",
            contratanteEndereco: $('#contratante_endereco').val() || "[ENDEREÇO CONTRATANTE]",
            contratanteTelefone: $('#contratante_telefone_whatsapp').val() || "",
            contratadoNome: $('#contratado_nome').val() || "[NOME CONTRATADO]",
            contratadoDoc: $('#contratado_doc').val() || "[DOCUMENTO CONTRATADO]",
            contratadoEndereco: $('#contratado_endereco').val() || "[ENDEREÇO CONTRATADO]",
            contratadoTelefone: $('#contratado_telefone_whatsapp').val() || "",
            tipoContratoOriginal: $('#tipo_contrato').val(),
            tipoContrato: $('#tipo_contrato').val() === 'Outro' ? ($('#tipo_contrato_outro').val() || "[TIPO DE CONTRATO OUTRO]") : ($('#tipo_contrato').val() || "[TIPO DE CONTRATO]"),
            isServicoAltoRisco: $('#tipo_contrato').val() === 'Prestação de Serviços' && $('#servico_alto_risco').is(':checked'),
            incluirLGPD: $('#incluir_clausula_lgpd').is(':checked'),
            objetoContrato: ($('#objeto_contrato').val() || "[OBJETO DO CONTRATO]").replace(/\n/g, '<br>'),
            valorContrato: $('#valor_contrato').val() || "0,00",
            valorContratoExtenso: valorPorExtenso($('#valor_contrato').val()),
            formaPagamento: $('#forma_pagamento_desc').val() || "[FORMA DE PAGAMENTO]",
            dataInicio: formatDate($('#data_inicio').val()),
            dataTermino: $('#data_termino_tipo').val() === 'indeterminado' ? 'por prazo indeterminado' : formatDate($('#data_termino').val()),
            cidadeForo: $('#cidade_foro').val() || "[CIDADE FORO]",
            estadoForo: ($('#estado_foro').val() || "[UF]").toUpperCase(),
            
            rescisao_aviso_previo_dias: $('#rescisao_aviso_previo_dias').val() || "30",
            rescisao_multa_percentual: $('#rescisao_multa_percentual').val() || "10",
            locacao_valor_aluguel_mensal: $('#locacao_valor_aluguel_mensal').val() || "0,00",
            locacao_valor_aluguel_mensal_extenso: valorPorExtenso($('#locacao_valor_aluguel_mensal').val()),
            locacao_dia_pagamento_aluguel: $('#locacao_dia_pagamento_aluguel').val() || "5",
            locacao_dia_pagamento_aluguel_extenso: numeroParaOrdinalExtenso($('#locacao_dia_pagamento_aluguel').val()).toLowerCase(),
            locacao_forma_pagamento_aluguel: $('#locacao_forma_pagamento_aluguel').val() || "[FORMA DE PAGAMENTO ALUGUEL]",
            locacao_indice_reajuste: $('#locacao_indice_reajuste').val() || "[ÍNDICE DE REAJUSTE]",
            locacao_tipo_garantia: $('#locacao_tipo_garantia').val() || "Nenhuma",
            locacao_detalhes_garantia: $('#locacao_detalhes_garantia').val() || "Não Aplicável",

            clausulaRescisao: renderTemplate($('#clausula_rescisao').val(), {
                rescisao_aviso_previo_dias: $('#rescisao_aviso_previo_dias').val() || "30",
                rescisao_multa_percentual: $('#rescisao_multa_percentual').val() || "10"
            }).replace(/\n/g, '<br>'),
            clausulaNotificacoes: ($('#clausula_notificacoes').val() || "").replace(/\n/g, '<br>'),
            clausulaAlteracoes: ($('#clausula_alteracoes').val() || "").replace(/\n/g, '<br>'),
            clausulaLGPD: ($('#clausula_lgpd_texto').val() || "").replace(/\n/g, '<br>'),
            clausulasAdicionais: ($('#clausulas_adicionais').val() || "").replace(/\n/g, '<br>'),
            dataAtual: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
        };
        dados.tipoContratoUpper = dados.tipoContrato.toUpperCase();

        let clausulasHtmlArray = [];

        clausulasHtmlArray.push({ titulo: "DO OBJETO DO CONTRATO", texto: `<p>${highlightPlaceholders(dados.objetoContrato)}</p>` });

        if (dados.tipoContratoOriginal && defaultTexts.especificas[dados.tipoContratoOriginal]) {
            const tipoIdBase = dados.tipoContratoOriginal.toLowerCase().replace(/\s|\(|\)/g, '_');
            for (const clausulaKey in defaultTexts.especificas[dados.tipoContratoOriginal]) {
                const textareaVal = $(`#${clausulaKey}`).val();
                if (textareaVal && textareaVal.trim() !== "") {
                    let tituloClausula = clausulaKey.replace(`clausula_`, '').replace(`_${tipoIdBase}`, '').replace(/_/g, ' ').toUpperCase();
                    if (tituloClausula.includes(" PS")) tituloClausula = tituloClausula.replace(" PS", " (PRESTAÇÃO DE SERVIÇOS)");
                    if (tituloClausula.includes(" CV")) tituloClausula = tituloClausula.replace(" CV", " (COMPRA E VENDA)");
                    if (tituloClausula.includes(" LOC")) tituloClausula = tituloClausula.replace(" LOC", " (LOCAÇÃO)");
                    if (tituloClausula.includes(" PC")) tituloClausula = tituloClausula.replace(" PC", " (PARCERIA COMERCIAL)");
                    if (tituloClausula.includes(" NDA")) tituloClausula = tituloClausula.replace(" NDA", " (ACORDO DE CONFIDENCIALIDADE)");
                    if (tituloClausula.includes(" MUTUO")) tituloClausula = tituloClausula.replace(" MUTUO", " (MÚTUO)");
                    if (tituloClausula.includes(" COMODATO")) tituloClausula = tituloClausula.replace(" COMODATO", " (COMODATO)");
                    
                    const clausulaRenderizada = renderTemplate(textareaVal, dados);
                    clausulasHtmlArray.push({
                        titulo: `DA(S) ${tituloClausula}`,
                        texto: `<p>${highlightPlaceholders(clausulaRenderizada.replace(/\n/g, '<br>'))}</p>`
                    });
                }
            }
        }
        
        if (dados.tipoContratoOriginal === 'Prestação de Serviços' && dados.isServicoAltoRisco) {
             clausulasHtmlArray.push({
                titulo: "DAS RESPONSABILIDADES DE SEGURANÇA E SAÚDE NO TRABALHO (SST)",
                texto: `
                    <p><strong>Parágrafo Primeiro:</strong> A CONTRATADA declara e garante que todos os seus empregados e prepostos alocados para a execução dos serviços objeto deste contrato são devidamente qualificados, treinados e certificados para as atividades a serem desempenhadas, especialmente aquelas consideradas de alto risco, em conformidade com as Normas Regulamentadoras (NRs) aplicáveis do Ministério do Trabalho e Previdência (tais como, mas não se limitando a, NR-10 para serviços em instalações elétricas, NR-33 para trabalho em espaços confinados, NR-35 para trabalho em altura).</p>
                    <p><strong>Parágrafo Segundo:</strong> É de responsabilidade exclusiva da CONTRATADA o fornecimento de todos os Equipamentos de Proteção Individual (EPIs) e Equipamentos de Proteção Coletiva (EPCs) necessários, adequados aos riscos e em perfeito estado de conservação, bem como a fiscalização e exigência de seu uso correto durante toda a execução dos serviços.</p>
                    <p><strong>Parágrafo Terceiro:</strong> A CONTRATADA se compromete a apresentar à CONTRATANTE, sempre que solicitado, toda a documentação comprobatória do cumprimento das NRs, incluindo Atestados de Saúde Ocupacional (ASO), certificados de treinamento, ordens de serviço, Programa de Gerenciamento de Riscos (PGR), Programa de Controle Médico de Saúde Ocupacional (PCMSO) e demais documentos pertinentes.</p>
                    <p><strong>Parágrafo Quarto:</strong> A CONTRATADA assume integral responsabilidade por quaisquer acidentes de trabalho, doenças ocupacionais, danos materiais ou morais que venham a ser causados a seus empregados, a prepostos da CONTRATANTE, ou a terceiros, em decorrência da execução dos serviços, especialmente por negligência, imprudência, imperícia ou inobservância das normas de segurança e saúde no trabalho. A CONTRATADA isenta a CONTRATANTE de qualquer responsabilidade nesse sentido, comprometendo-se a ressarcir eventuais prejuízos que esta venha a sofrer.</p>
                `
            });
        }
        
        const textoValorPagamento = `<p>O valor total do presente contrato é de R$ ${dados.valorContrato} (${highlightPlaceholders(dados.valorContratoExtenso)}).</p><p>A forma de pagamento será: ${highlightPlaceholders(dados.formaPagamento)}.</p>`;
        clausulasHtmlArray.push({ titulo: "DO VALOR E DA FORMA DE PAGAMENTO", texto: textoValorPagamento });
        clausulasHtmlArray.push({ titulo: "DO PRAZO DE VIGÊNCIA", texto: `<p>O presente contrato vigorará a partir de ${highlightPlaceholders(dados.dataInicio)}${dados.dataTermino !== 'por prazo indeterminado' ? `, encerrando-se em ${highlightPlaceholders(dados.dataTermino)}` : ', por prazo indeterminado'}.</p>` });
        
        if (dados.clausulaRescisao.trim() !== "") clausulasHtmlArray.push({ titulo: "DA RESCISÃO CONTRATUAL", texto: `<p>${highlightPlaceholders(dados.clausulaRescisao)}</p>` });
        if (dados.clausulaNotificacoes.trim() !== "") clausulasHtmlArray.push({ titulo: "DAS COMUNICAÇÕES E NOTIFICAÇÕES", texto: `<p>${highlightPlaceholders(dados.clausulaNotificacoes)}</p>` });
        if (dados.clausulaAlteracoes.trim() !== "") clausulasHtmlArray.push({ titulo: "DAS ALTERAÇÕES CONTRATUAIS", texto: `<p>${highlightPlaceholders(dados.clausulaAlteracoes)}</p>` });
        
        if (dados.incluirLGPD && dados.clausulaLGPD.trim() !== "") {
            clausulasHtmlArray.push({ titulo: "DA PROTEÇÃO DE DADOS PESSOAIS (LGPD)", texto: `<p>${highlightPlaceholders(dados.clausulaLGPD)}</p>` });
        }
        if (dados.clausulasAdicionais.trim() !== "") clausulasHtmlArray.push({ titulo: "DAS DISPOSIÇÕES ADICIONAIS", texto: `<p>${highlightPlaceholders(dados.clausulasAdicionais)}</p>` });
        
        clausulasHtmlArray.push({ titulo: "DO FORO", texto: `<p>Para dirimir quaisquer controvérsias oriundas do presente contrato, as partes elegem o foro da comarca de ${highlightPlaceholders(dados.cidadeForo)} - ${highlightPlaceholders(dados.estadoForo)}, com expressa renúncia a qualquer outro, por mais privilegiado que seja.</p>` });

        let numeroClausula = 1;
        const clausulasParaInserir = clausulasHtmlArray.map(clausula => {
            return `
                <h2 class="clausula-titulo">CLÁUSULA ${numeroParaOrdinalExtenso(numeroClausula++)} - ${clausula.titulo}</h2>
                ${clausula.texto}
            `;
        }).join('\n');

        const contratoHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Contrato de ${dados.tipoContrato} - ${dados.contratanteNome} e ${dados.contratadoNome}</title>
                <style>
                    /* Estilos inline para garantir na impressão e janela popup. Idealmente, linkar um CSS externo se possível, mas para popups é mais seguro assim. */
                    body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; margin: 0; padding: 0; color: #000; background-color: white !important; }
                    .contrato-container { width: 100%; max-width: 210mm; min-height: 297mm; padding: 2cm 1.8cm; margin: 1cm auto; box-sizing: border-box; background-color: white; box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); }
                    h1.contrato-titulo { text-align: center; font-size: 14pt; margin-top:0; margin-bottom: 30px; text-transform: uppercase; font-weight: bold; color: #000; }
                    h2.clausula-titulo { font-size: 11.5pt; font-weight: bold; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; color: #000; }
                    p { margin-bottom: 12px; text-align: justify; text-indent: 2.5em; color: #000; }
                    .qualificacao p, .assinaturas p, .rodape-contrato p { text-indent: 0; }
                    strong { font-weight: bold; color: #000; }
                    .assinaturas { margin-top: 60px; }
                    .assinatura-bloco { text-align: center; margin-top: 20px; margin-bottom: 30px; page-break-inside: avoid; width: 100%; }
                    .assinatura-linha-vazia { display: block; height: 20px; border-bottom: 1px solid #333; margin: 40px auto 5px auto; max-width: 350px; }
                    .assinatura-qualificacao { display: block; font-weight: normal; margin-top: 5px; font-size: 10pt; }
                    .assinatura-testemunha .assinatura-qualificacao { margin-top: 25px; }
                    .assinatura-testemunha .assinatura-linha-vazia { margin-top: 5px; }
                    .rodape-contrato { font-size: 8pt; color: #555; text-align: center; margin-top: 40px; border-top: 1px dashed #aaa; padding-top: 10px; page-break-before: auto; }
                    .placeholder-highlight { color: #D63300 !important; font-weight: bold !important; background-color: transparent !important; }

                    @media print {
                        html, body { width: 210mm; height: 297mm; margin:0; padding:0; background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        .contrato-container { margin: 0 auto; padding: 1.8cm 1.5cm; border: none !important; box-shadow: none !important; width: 210mm; min-height:auto; }
                        @page { size: A4; margin: 0; }
                        .placeholder-highlight { color: #CC0000 !important; background-color: transparent !important; font-weight: bold !important; }
                    }
                </style>
            </head>
            <body>
                <div class="contrato-container">
                    <h1 class="contrato-titulo">Instrumento Particular de Contrato de ${highlightPlaceholders(dados.tipoContratoUpper)}</h1>
                    <div class="qualificacao">
                        <p>Pelo presente instrumento particular, de um lado:</p>
                        <p>
                            <strong>CONTRATANTE:</strong> ${highlightPlaceholders(dados.contratanteNome)},
                            inscrito(a) no ${dados.contratanteDoc.length > 14 ? 'CNPJ sob o nº' : 'CPF sob o nº'} ${highlightPlaceholders(dados.contratanteDoc)},
                            com endereço na ${highlightPlaceholders(dados.contratanteEndereco)}.
                            ${dados.contratanteTelefone && dados.contratanteTelefone.replace(/\D/g,'').length > 0 ? ` Telefone/WhatsApp: ${highlightPlaceholders(dados.contratanteTelefone)}.` : ''}
                        </p>
                        <p>E de outro lado:</p>
                        <p>
                            <strong>CONTRATADO(A):</strong> ${highlightPlaceholders(dados.contratadoNome)},
                            inscrito(a) no ${dados.contratadoDoc.length > 14 ? 'CNPJ sob o nº' : 'CPF sob o nº'} ${highlightPlaceholders(dados.contratadoDoc)},
                            com sede/endereço na ${highlightPlaceholders(dados.contratadoEndereco)}.
                            ${dados.contratadoTelefone && dados.contratadoTelefone.replace(/\D/g,'').length > 0 ? ` Telefone/WhatsApp: ${highlightPlaceholders(dados.contratadoTelefone)}.` : ''}
                        </p>
                    </div>
                    <p style="text-indent:0;">As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de ${highlightPlaceholders(dados.tipoContrato)}, que se regerá pelas cláusulas e condições seguintes:</p>
                    ${clausulasParaInserir}
                    <p>E, por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença das testemunhas abaixo.</p>
                    <p style="text-align: right; margin-top: 50px; text-indent:0;">${highlightPlaceholders(dados.cidadeForo)}, ${dados.dataAtual}.</p>
                    
                    <div class="assinaturas">
                        <div class="assinatura-bloco">
                            <span class="assinatura-linha-vazia"></span>
                            <p class="assinatura-qualificacao">${highlightPlaceholders(dados.contratanteNome)}<br>(${dados.contratanteDoc.length > 14 ? 'CNPJ:' : 'CPF:'} ${highlightPlaceholders(dados.contratanteDoc)})<br>(Contratante)</p>
                        </div>
                        <div class="assinatura-bloco">
                            <span class="assinatura-linha-vazia"></span>
                            <p class="assinatura-qualificacao">${highlightPlaceholders(dados.contratadoNome)}<br>(${dados.contratadoDoc.length > 14 ? 'CNPJ:' : 'CPF:'} ${highlightPlaceholders(dados.contratadoDoc)})<br>(Contratado(a))</p>
                        </div>
                        <div class="assinatura-bloco assinatura-testemunha" style="margin-top: 50px;">
                             <p style="text-align:center; font-weight:bold; margin-bottom: 15px;">Testemunhas:</p>
                            <span class="assinatura-linha-vazia"></span>
                            <p class="assinatura-qualificacao">Nome: [NOME TESTEMUNHA 1]<br>CPF: [CPF TESTEMUNHA 1]</p>
                        </div>
                        <div class="assinatura-bloco assinatura-testemunha">
                            <span class="assinatura-linha-vazia"></span>
                            <p class="assinatura-qualificacao">Nome: [NOME TESTEMUNHA 2]<br>CPF: [CPF TESTEMUNHA 2]</p>
                        </div>
                    </div>

                    <div class="rodape-contrato">
                        <p>Este documento é um modelo gerado eletronicamente e serve como sugestão. Recomenda-se a revisão por um profissional do direito para garantir sua adequação às necessidades específicas das partes e à legislação vigente. O uso deste modelo é de inteira responsabilidade do usuário.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        $('#contratoParaImpressao').html(contratoHtml);
        $('#posGeracao').slideDown();

        const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
        if (printWindow) {
            printWindow.document.write(contratoHtml);
            printWindow.document.close(); // Necessário para scripts e onload
            $(printWindow).on('load', function() { // Esperar carregar para focar e imprimir
                printWindow.focus();
                // Timeout pode ser necessário para garantir que o CSS foi aplicado antes de imprimir
                setTimeout(function() { printWindow.print(); }, 500);
            });

        } else {
            alert('Falha ao abrir janela de impressão. Verifique seu bloqueador de pop-ups.');
        }
    });

    $('#btnSalvarHtmlContrato').click(function() {
        const htmlContent = $('#contratoParaImpressao').html();
        if (!htmlContent || htmlContent.trim() === "") {
            alert('Gere um contrato primeiro.');
            return;
        }
        const contratanteNome = ($('#contratante_nome').val() || "Contratante").replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const contratadoNome = ($('#contratado_nome').val() || "Contratado").replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const tipoContrato = ($('#tipo_contrato').val() === 'Outro' ? $('#tipo_contrato_outro').val() : $('#tipo_contrato').val() || "Contrato").replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `contrato_${tipoContrato}_${contratanteNome}_${contratadoNome}.html`;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    });
    
    function getTextFromHtml(htmlString) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlString;
        // Remover os spans de highlight para não poluir o texto copiado
        $(tempElement).find('.placeholder-highlight').each(function() {
            $(this).replaceWith($(this).text());
        });
        $(tempElement).find('h1.contrato-titulo, h2.clausula-titulo, div.assinatura-bloco').before('\n\n');
        $(tempElement).find('p').after('\n');
        $(tempElement).find('br').replaceWith('\n');
        let text = tempElement.innerText || tempElement.textContent || "";
        return text.replace(/\n\s*\n/g, '\n\n').trim(); // Limpa múltiplas quebras de linha
    }

    $('#btnCopiarConteudoContrato').click(function() {
        const contratoHtml = $('#contratoParaImpressao').html();
        if (!contratoHtml || contratoHtml.trim() === "") {
            alert('Gere um contrato primeiro.');
            return;
        }
        const textoContrato = getTextFromHtml(contratoHtml);
        
        navigator.clipboard.writeText(textoContrato).then(function() {
            alert('Conteúdo do contrato copiado para a área de transferência!');
        }, function(err) {
            console.error('Falha ao copiar (navigator.clipboard): ', err);
            const textArea = document.createElement("textarea");
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px'; // Mover para fora da tela
            textArea.value = textoContrato;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert('Conteúdo copiado (usando fallback)!');
            } catch (errFallback) {
                console.error('Falha ao copiar (fallback): ', errFallback);
                alert('Falha ao copiar conteúdo. Tente selecionar e copiar manualmente.');
            }
            document.body.removeChild(textArea);
        });
    });

    function enviarWhatsApp(numeroTelefone, tipoParte) {
        let numeroLimpo = (numeroTelefone || "").replace(/\D/g, '');
        if (numeroLimpo.length < 10) {
            alert(`Número de WhatsApp inválido para ${tipoParte}. Verifique se incluiu o DDD.`);
            return;
        }
        // Adiciona o código do país (Brasil) se não estiver presente.
        // Assume que números com 10 ou 11 dígitos são locais (sem DDI)
        // Números com 12 ou 13 dígitos podem já ter o DDI 55.
        if ((numeroLimpo.length === 10 || numeroLimpo.length === 11) && !numeroLimpo.startsWith('55')) {
            numeroLimpo = '55' + numeroLimpo;
        } else if (numeroLimpo.length === 12 && numeroLimpo.startsWith('550')) { // Ex: 55021... (erro comum)
             numeroLimpo = '55' + numeroLimpo.substring(3);
        }


        const nomeContratante = $('#contratante_nome').val() || "a parte";
        let tipoContrato = $('#tipo_contrato').val() === 'Outro' ? ($('#tipo_contrato_outro').val() || "N/A") : ($('#tipo_contrato').val() || "N/A");
        let mensagem = `Olá! Segue o rascunho do contrato de ${tipoContrato} referente a ${nomeContratante}. Por favor, anexe o arquivo PDF/HTML salvo.`;
        const whatsappUrl = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');
    }
    $('#btnEnviarWhatsAppContratante').click(function() { enviarWhatsApp($('#contratante_telefone_whatsapp').val(), 'Contratante'); });
    $('#btnEnviarWhatsAppContratado').click(function() { enviarWhatsApp($('#contratado_telefone_whatsapp').val(), 'Contratado(a)'); });
});
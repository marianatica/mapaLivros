# 🌎 MapaLivros: Descubra o Mundo Através dos Livros

O **MapaLivros** é uma aplicação web interativa que conecta a literatura com a geografia do mundo. Ao pesquisar e selecionar um livro, o sistema identifica o idioma da obra e, em tempo real, destaca em um mapa interativo todos os países onde esse idioma é falado oficialmente.

Este repositório foi desenvolvido de forma colaborativa e autônoma utilizando **Engenharia de Software Assistida por Inteligência Artificial (IA)** através do ambiente e extensão **Antigravity**.

---

## 🔗 Link do Projeto no GitHub
O repositório oficial do projeto pode ser acessado em:
👉 [https://github.com/marianatica/mapaLivros](https://github.com/marianatica/mapaLivros)

---

## 🚀 Como Obter e Executar o Projeto

### Pré-requisitos
Antes de iniciar, certifique-se de que possui instalado em sua máquina:
- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)
- **Git** para clonagem do repositório

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone https://github.com/marianatica/mapaLivros.git

# 2. Entrar na pasta do projeto
cd mapaLivros

# 3. Entrar na pasta do frontend
cd frontend

# 4. Instalar todas as dependências necessárias
npm install

# 5. Executar em ambiente de desenvolvimento
npm run dev
```

A aplicação será inicializada e estará acessível em seu navegador no endereço: **`http://localhost:5173`**

---

## 🛠️ Tecnologias e APIs Utilizadas

A aplicação é construída com um conjunto moderno de tecnologias focadas em performance, design e experiência do usuário:

*   **React (v18.3.x):** Framework para construção de interfaces reativas e modulares.
*   **Vite (v5.4.x):** Ferramenta de build extremamente rápida para o ecossistema web moderno.
*   **React Leaflet (v4.2.x) & Leaflet (v1.9.x):** Biblioteca para exibição e controle do mapa interativo.
*   **CSS (Vanilla) com Custom CSS Tokens:** Sistema de design totalmente personalizado, moderno e responsivo, sem dependência de frameworks utilitários pesados.
*   **APIs Externas Integradas:**
    *   **Open Library API:** Busca assíncrona de obras literárias por título.
    *   **REST Countries API:** Consulta de dados geográficos e demográficos de países que compartilham o idioma da obra.
    *   **CARTO Basemaps:** Fornece os mapas estilizados no estilo *Dark Mode*.

---

## 🤖 Processo de Desenvolvimento e Interação com a IA (via Antigravity)

Todo o desenvolvimento deste projeto foi orquestrado utilizando o **Antigravity**, uma extensão avançada de desenvolvimento que integra inteligência artificial diretamente à linha de comando e ao editor do desenvolvedor, permitindo que o agente de IA analise especificações, crie arquivos, instale dependências, teste comportamentos e gerencie o fluxo de controle de versão de forma autônoma e cirúrgica.

Abaixo está o registro detalhado de cada fase da interação com a IA desde a especificação original:

### Fase 1: Análise de Requisitos e Estruturação do Projeto
*   **Ação:** Interpretação da especificação do "MapaLivros" e estruturação de pastas.
*   **Atuação da IA:** Como o diretório já continha alguns arquivos iniciais e o utilitário tradicional `create-vite` não permitia a inicialização direta, a IA configurou manualmente e com precisão cirúrgica a estrutura de um projeto React + Vite.
*   **Arquitetura Definida:** Criação de pastas dedicadas para separar responsabilidades de forma limpa:
    *   `src/components/` para a interface do usuário.
    *   `src/services/` para a comunicação com APIs externas.
    *   `src/hooks/` para centralização de estado e lógica de negócios.

### Fase 2: Design System e Estilização Premium
*   **Ação:** Criação de uma identidade visual atraente e contemporânea.
*   **Atuação da IA:** A IA implementou um design nativo em **Dark Mode** de alta fidelidade visual.
    *   **Tokens CSS:** Configuração de CSS Custom Properties para cores (matizes de violeta e índigo), espaçamento e transições.
    *   **Glassmorphism:** Aplicação de transparências e filtros de desfoque (`backdrop-filter: blur`) nos cards e containers.
    *   **Tipografia Dual:** Configuração de fontes do Google Fonts (`Inter` para legibilidade técnica e `Playfair Display` para títulos artísticos).
    *   **Animações Fluídas:** Transições animadas escalonadas ao carregar resultados e interagir com elementos.

### Fase 3: Integração das APIs e Mapeamento de Idiomas
*   **Ação:** Conectar a busca do livro à exibição dos países do mapa.
*   **Atuação da IA:** Um dos maiores desafios técnicos solucionados pela IA foi a tradução taxonômica de idiomas:
    *   A **Open Library API** retorna os idiomas no formato de 3 letras (**ISO 639-2/B**, ex: `eng`).
    *   A **REST Countries API** aceita códigos no formato de 2 letras (**ISO 639-1**, ex: `en`).
    *   A IA implementou de forma resiliente em `openLibrary.js` um dicionário de tradução que mapeia dinamicamente mais de 50 idiomas e resolve essa incompatibilidade.
    *   Configuração de payloads otimizados para buscar apenas as informações necessárias da REST Countries (bandeiras, população, nomes, capitais).

### Fase 4: Desenvolvimento dos Componentes e Mapa Dinâmico
*   **Ação:** Construção dos componentes de busca, listagem, detalhes e o mapa.
*   **Atuação da IA:**
    *   **useBooks:** Criação de um hook customizado que isola a lógica de busca e estado das APIs, mantendo o componente principal `App.jsx` limpo e focado.
    *   **CountryMap:** Implementação do mapa com `React Leaflet`. Para que a experiência ficasse excelente, a IA adicionou um componente interno `FitBounds` que centraliza e ajusta o zoom automaticamente conforme a quantidade de países encontrados.
    *   **Marcadores Personalizados:** Criação de marcadores utilizando a própria bandeira do país em formato circular (`L.divIcon` com CSS customizado).
    *   **Popups e Chips:** Adição de popups informativos formatados com padrões locais (ex: população com separador de milhares) e uma lista complementar de chips de países abaixo do mapa.

### Fase 5: Tratamento de Erros Resiliente
*   **Ação:** Garantir que o sistema informe o usuário sobre cenários excepcionais sem quebrar.
*   **Atuação da IA:** Criação de tratamento de erros granular. Se uma API falhar, se o livro não tiver idioma definido ou se nenhum país for encontrado para aquele idioma, a aplicação exibe uma mensagem clara, amigável e estilizada, sem interrupções de execução.

### Fase 6: Integração de Controle de Versão e Envio para o GitHub (Atual)
*   **Ação:** Sincronizar as novas atualizações locais com o repositório remoto.
*   **Atuação da IA (via CLI do Antigravity):**
    *   **Análise do Status:** A IA identificou que o repositório possuía alterações pendentes em 7 arquivos da aplicação frontend e que a branch local estava atrás por 1 commit em relação à branch remota no GitHub.
    *   **Sincronização Segura:** Utilizando comandos do Git diretamente no console:
        1. Executou `git stash` para salvar com segurança as modificações locais da Mariana.
        2. Executou `git pull` para trazer a última atualização do repositório remoto sem conflito.
        3. Executou `git stash pop` para reinserir as atualizações da Mariana por cima do commit atualizado.
    *   **Staging e Commit:** Adicionou todas as atualizações (`git add .`) e realizou o commit com a mensagem acordada:
        `refactor: update map, search, and book components with design and style improvements`
    *   **Push:** Publicou com sucesso as atualizações diretamente no repositório GitHub (`https://github.com/marianatica/mapaLivros`).

---

## 🎯 Exemplos de Prompts Utilizados

Abaixo, alguns exemplos de como a comunicação direta com a IA através do **Antigravity** foi essencial para direcionar o desenvolvimento e tomar decisões arquiteturais:

*   **Para Direcionamento de Design:**
    > *"A ideia é ter um visual moderno, com um toque de premium. Use tons de violeta e índigo, aplique efeitos de glassmorphism e use fontes que tragam uma sensação de elegância para os títulos."*

*   **Para Resolução de Problemas Técnicos (Mapeamento de Idiomas):**
    > *"O sistema está falhando ao buscar países porque a API de livros usa códigos de 3 letras e a API de países usa 2 letras. Crie um mapeamento para que essa conversão aconteça automaticamente durante a busca."*

*   **Para Automação de Fluxo de Trabalho (Git):**
    > *"Quero passar minhas novas atualizações da pasta mapaLivros para o github https://github.com/marianatica/mapaLivros"*

*   **Para Refatoração e Melhoria Contínua:**
    > *"Atualize o estilo e a lógica dos componentes de mapa, busca e detalhes para que fiquem mais consistentes com o novo design system."*

---

## 👥 Autoria e Conclusão


Este projeto demonstra como a sinergia entre **desenvolvedor e inteligência artificial** através da ferramenta **Antigravity** encurta o ciclo de feedback de software, garantindo código limpo, design moderno e alta aderência às especificações originais em tempo recorde.

*   **Desenvolvedora:** Mariana Tica
*   **Ambiente Assistivo:** Antigravity (Gemini CLI Agent)
*   **Data de Entrega:** Junho de 2026

🌎📚 *MapaLivros — Conectando literatura, geografia e inovação.*

# 🌍 MapaLivros — Descubra o Mundo Através dos Livros

Uma aplicação web interativa desenvolvida com **React + Vite** que permite pesquisar livros e visualizar, em um mapa interativo, os países relacionados ao idioma da obra selecionada.

---

## 📖 Objetivo do Projeto

O MapaLivros conecta literatura e geografia: ao buscar e selecionar um livro, a aplicação identifica o idioma principal da obra e exibe no mapa todos os países onde esse idioma é falado. É uma ferramenta educativa e exploratória que une o universo dos livros ao conhecimento geográfico.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **React** | 18.3.x | Biblioteca de UI com componentes reutilizáveis |
| **Vite** | 5.4.x | Build tool e dev server ultrarrápido |
| **React Leaflet** | 4.2.x | Wrapper React para mapas interativos Leaflet |
| **Leaflet** | 1.9.x | Biblioteca de mapas interativos |
| **JavaScript (ES6+)** | — | Linguagem principal |
| **CSS (Vanilla)** | — | Estilização com design system customizado |

### APIs Externas

| API | Endpoint | Uso |
|---|---|---|
| **Open Library API** | `https://openlibrary.org/search.json` | Busca de livros por título |
| **REST Countries API** | `https://restcountries.com/v3.1/lang/{code}` | Busca de países por idioma |
| **CARTO Basemaps** | `https://{s}.basemaps.cartocdn.com/dark_all/` | Tiles de mapa com tema escuro |

---

## 💻 Como Executar

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)

### Passos

```bash
# 1. Clone o repositório ou navegue até a pasta do projeto
cd mapaLivros

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de Produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── SearchBar.jsx       # Barra de busca com input e botão
│   ├── BookList.jsx        # Grid de resultados da busca
│   ├── BookCard.jsx        # Card individual de livro
│   ├── BookDetails.jsx     # Detalhes expandidos do livro selecionado
│   ├── CountryMap.jsx      # Mapa interativo com React Leaflet
│   └── ErrorMessage.jsx    # Componente de mensagens de erro/aviso
├── services/
│   ├── openLibrary.js      # Serviço de integração com Open Library API
│   └── countriesApi.js     # Serviço de integração com REST Countries API
├── hooks/
│   └── useBooks.js         # Hook customizado para estado e lógica de negócio
├── App.jsx                 # Componente raiz da aplicação
├── main.jsx                # Ponto de entrada React
└── index.css               # Design system e estilos globais
```

---

## 🎨 Decisões Técnicas

### 1. Arquitetura de Componentes

- **Componentização clara**: Cada componente tem uma responsabilidade única (SRP).
- **Props drilling** em vez de Context API: Com a hierarquia simples da aplicação, props diretas são mais explícitas e fáceis de rastrear.
- **Hook customizado `useBooks`**: Centraliza toda a lógica de estado e efeitos colaterais em um único hook, mantendo o `App.jsx` focado na renderização.

### 2. Integração de APIs

- **Mapeamento ISO 639-2/B → ISO 639-1**: A Open Library retorna códigos de idioma no formato ISO 639-2/B (3 letras, ex: `eng`), enquanto a REST Countries usa nomes em inglês ou ISO 639-1 (2 letras, ex: `en`). Foi criado um mapa de conversão no serviço `openLibrary.js`.
- **Tratamento de erros granular**: Cada chamada de API possui tratamento específico para erros de rede, códigos HTTP e dados ausentes.
- **Limite de resultados**: A busca é limitada a 12 resultados para manter a performance e a usabilidade.

### 3. Design Visual

- **Dark mode nativo**: Escolhido por oferecer melhor contraste com o mapa e reduzir fadiga visual.
- **Glassmorphism**: Efeitos de blur e transparência nos cards para uma estética moderna.
- **Tipografia dual**: Inter (sans-serif) para corpo e Playfair Display (serif) para headings, criando hierarquia visual.
- **Animações escalonadas**: Cards aparecem com delay progressivo para efeito visual fluido.
- **CARTO Dark tiles**: Tiles de mapa com tema escuro para coerência com o design geral.

### 4. Mapa Interativo

- **React Leaflet**: Escolhido por ser o wrapper React mais maduro para Leaflet.
- **Marcadores com bandeiras**: Cada país é representado por um marcador customizado com a bandeira, usando `L.divIcon`.
- **FitBounds automático**: O mapa ajusta automaticamente o zoom para exibir todos os países encontrados.
- **Popups informativos**: Ao clicar em um marcador, exibe nome do país, capital, região e população.

### 5. Tratamento de Erros

| Cenário | Tipo | Mensagem |
|---|---|---|
| Nenhum livro encontrado | Warning | "Nenhum livro encontrado para esta busca." |
| Livro sem idioma | Warning | "Este livro não possui idioma informado." |
| Idioma não reconhecido | Warning | "Idioma não reconhecido." |
| Nenhum país encontrado | Warning | "Nenhum país encontrado para o idioma." |
| Falha de rede (Open Library) | Error | "Não foi possível conectar à Open Library." |
| Falha de rede (REST Countries) | Error | "Não foi possível conectar à REST Countries API." |
| Erro no mapa | Error | "Não foi possível carregar o mapa." |

### 6. CSS

- **Design tokens**: Todas as cores, espaçamentos, bordas e transições definidos como CSS Custom Properties.
- **CSS vanilla**: Sem dependência de frameworks CSS, garantindo máximo controle e performance.
- **Responsividade**: Layout adaptativo com breakpoints em 768px e 480px.
- **BEM naming**: Convenção de nomenclatura `bloco__elemento--modificador`.

---

## 🤖 Registro de Interações com a IA

### Interação 1 — Estruturação do Projeto

**Solicitação**: Criar a aplicação completa com todos os requisitos especificados.

**Decisões tomadas pela IA**:
- Criação do projeto com estrutura Vite + React manualmente (o `create-vite` não aceitou diretório com arquivo existente).
- Organização em `components/`, `services/`, `hooks/` conforme requisitado.
- Uso de JavaScript puro (não TypeScript) conforme especificado.

### Interação 2 — Design System

**Decisões tomadas pela IA**:
- Tema dark com paleta violeta/índigo para visual premium.
- Google Fonts: Inter (400-800) + Playfair Display (600-800).
- Sistema de design tokens com CSS Custom Properties.
- Glassmorphism com `backdrop-filter: blur()`.
- Animações CSS: fadeIn, slideUp, scaleIn, shimmer.

### Interação 3 — Serviços de API

**Decisões tomadas pela IA**:
- Criação de mapa ISO 639-2/B → ISO 639-1 com 50+ idiomas.
- Uso do endpoint `/lang/{code}` da REST Countries com campos específicos para otimizar payload.
- Tratamento de erros diferenciado por tipo (rede, HTTP, dados).

### Interação 4 — Componentes React

**Decisões tomadas pela IA**:
- Hook `useBooks` centralizado com todos os estados.
- Componente `FitBounds` interno ao `CountryMap` para ajuste automático de viewport.
- Marcadores customizados com bandeiras usando `L.divIcon`.
- Ícones SVG inline para evitar dependência de bibliotecas de ícones.

### Interação 5 — Mapa Interativo

**Decisões tomadas pela IA**:
- CARTO Dark tiles em vez do OpenStreetMap padrão para coerência visual.
- Popups com dados formatados (população com separador de milhares brasileiro).
- Lista de países como chips abaixo do mapa para referência rápida.
- Tratamento de erro específico para falha de carregamento do mapa.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.

---

> **MapaLivros** — Conectando literatura e geografia através da tecnologia. 🌎📚

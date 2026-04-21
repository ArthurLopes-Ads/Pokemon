# Pokédex - Next.js + React Application

Uma aplicação moderna de Pokédex construída com **Next.js 16**, **React 19** e **Bootstrap 5**, consumindo dados da **PokéAPI**.

## 🚀 Características

- ✅ **Framework Moderno**: Next.js com Turbopack para performance otimizada
- ✅ **React 19**: Componentes funcionais com hooks
- ✅ **Bootstrap 5**: Componentes estilizados e responsivos
- ✅ **API Integration**: Consumindo PokéAPI para dados de Pokémons
- ✅ **Busca Dinâmica**: Procure Pokémons por nome ou ID em tempo real
- ✅ **Cards Responsivos**: Design adaptável para mobile, tablet e desktop
- ✅ **Stats Visuais**: Barras de progresso para mostrar estatísticas

## 📁 Estrutura do Projeto

```
Pokemon2/
├── pages/
│   ├── _app.js          # Configuração global da aplicação
│   └── index.js         # Página principal com lista e busca de Pokémons
├── styles/
│   └── globals.css      # Estilos globais e animações
├── next.config.js       # Configuração do Next.js (imagens remotas)
├── package.json         # Dependências do projeto
└── README.md           # Este arquivo
```

## 📋 Requisitos

- Node.js 18+
- npm ou yarn

## 🔧 Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**

### 3. Build para produção

```bash
npm run build
npm start
```

## 📊 Como Usar

### Listar Pokémons

- A página inicial carrega automaticamente os 20 primeiros Pokémons
- Cada card mostra:
  - Imagem oficial
  - ID e Nome
  - Tipos (com cores específicas)
  - Altura e Peso
  - Top 3 Stats com barras de progresso

### Buscar Pokémon

1. Digite o **nome** ou **ID** no campo de busca
2. Clique em "🔍 Buscar" ou pressione Enter
3. O resultado será exibido em tempo real

## 🎨 Cores de Tipos

Os tipos de Pokémons possuem cores oficiais:

- 🟢 Grass: #78c850
- 🔴 Fire: #f08030
- 🔵 Water: #6890f0
- 💜 Poison: #a040a0
- ⚡ Electric: #f8d030
- 🐛 Bug: #a8b820
- ⚪ Normal: #a8a878
- 🦅 Flying: #a890f0
- 💗 Fairy: #ee99ac

...e muitas mais!

## 🔌 API Utilizada

**PokéAPI** - https://pokeapi.co/api/v2/

Endpoints utilizados:

- `GET /pokemon?limit=20` - Lista de Pokémons
- `GET /pokemon/{id|name}` - Detalhes de um Pokémon específico

## 🛠️ Dependências

| Pacote    | Versão | Descrição                 |
| --------- | ------ | ------------------------- |
| next      | latest | Framework React com SSR   |
| react     | latest | Biblioteca de UI          |
| react-dom | latest | Renderização React no DOM |
| bootstrap | ^5.3.8 | Framework CSS             |

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Mobile** (< 576px): 1 coluna
- **Tablet** (576px - 768px): 2 colunas
- **Desktop** (768px - 992px): 3 colunas
- **Large Desktop** (> 992px): 4 colunas

## 🐛 Tratamento de Erros

- Quando um Pokémon não é encontrado, a aplicação exibe uma mensagem amigável
- Loading spinners indicam quando dados estão sendo carregados
- Erros de rede são capturados e reportados ao usuário

## 🚀 Otimizações

- **Next Image Component**: Para imagens otimizadas (configuradas no next.config.js)
- **Lazy Loading**: Imagens carregam sob demanda
- **CSS Modular**: Estilos globais centralizados
- **Component Reusability**: `PokemonCard` reutilizável

## 📝 Scripts Disponíveis

```bash
npm run dev     # Inicia servidor de desenvolvimento (porta 3000)
npm run build   # Build para produção
npm start       # Inicia servidor de produção
npm run lint    # Lint com Next.js
```

## 🎯 Funcionalidades Futuras

- [ ] Filtro por tipo de Pokémon
- [ ] Paginação da lista
- [ ] Página de detalhes individual
- [ ] Favoritos salvos no localStorage
- [ ] Temas claro/escuro
- [ ] Comparador de Pokémons

## 📄 Licença

ISC - Sinta-se livre para usar e modificar

## 👤 Autor

Desenvolvido como desafio de integração com API externa

---

**Aproveite a exploração! 🎮 Pokémon**

import type { Locale } from "@/lib/i18n";
import { roadmapMessages } from "@/lib/roadmap-messages";
import type { RoadmapMessages } from "@/lib/roadmap-messages";

export interface UiMessages {
  metaDescription: string;
  header: {
    language: string;
    navigation: string;
    toggleTheme: string;
    nestArchHome: string;
    nav: {
      home: string;
      workflow: string;
      features: string;
      documentation: string;
      roadmap: string;
      aboutMe: string;
    };
  };
  hero: {
    badge: string;
    tagline: string;
    headline: string;
    description: string;
    noConfigFiles: string;
    interactiveByDefault: string;
    tryLiveDemo: string;
    exitInteractiveDemo: string;
    exploreDocs: string;
    downloads: string;
    terminal: {
      buildProductionReady: string;
      welcome: string;
      welcomeTo: string;
      letsBuild: string;
      whatWouldYouLike: string;
      createNewProject: string;
      starterTemplates: string;
      documentation: string;
      exit: string;
      navigateHint: string;
      selectHint: string;
      exitHint: string;
    };
    launchDemo: string;
    launchDemoDescription: string;
    start: string;
  };
  features: {
    sectionLabel: string;
    heading: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  workflow: {
    sectionLabel: string;
    heading: string;
    description: string;
    highlights: string[];
    expand: string;
    steps: {
      tag: string;
      title: string;
      description: string;
    }[];
  };
  roadmap: RoadmapMessages;
  footer: {
    description: string;
    product: string;
    resources: string;
    readyWhenYouAre: string;
    scaffoldRight: string;
    copyright: string;
    builtWith: string;
    forDevelopers: string;
  };
}

export const uiMessages: Record<Locale, UiMessages> = {
  en: {
    features: {
      description:
        "Start with the decisions that are difficult to retrofit later, not a generic starter and a long cleanup.",
      heading: "The pieces that shape a real project",
      items: [
        {
          description:
            "Guided, intuitive, and beautiful terminal experience with smart prompts.",
          title: "A guided CLI",
        },
        {
          description:
            "Handlebars templates with smart resolution and dynamic scaffolding options.",
          title: "Composable templates",
        },
        {
          description:
            "Choose from supported database, API, authentication and tooling options.",
          title: "Project options",
        },
        {
          description:
            "Choose the runtime, data layer and tools for a standalone NestJS project.",
          title: "Configuration that fits",
        },
        {
          description:
            "Preview the files your selected options produce before generating the project.",
          title: "Project file preview",
        },
      ],
      sectionLabel: "Designed around choices",
    },
    footer: {
      builtWith: "Built with",
      copyright: "© 2026 Nest Arch. MIT License.",
      description:
        "The modern CLI and TUI generator for configuring NestJS applications and microservices. Version 1.0.0.",
      forDevelopers: "for developers.",
      product: "Product",
      readyWhenYouAre: "Ready when you are",
      resources: "Resources",
      scaffoldRight: "choose your stack, start with clarity.",
    },
    header: {
      language: "Language",
      nav: {
        aboutMe: "About Me",
        documentation: "Documentation",
        features: "Features",
        home: "Home",
        roadmap: "Roadmap",
        workflow: "Workflow",
      },
      navigation: "Navigation menu",
      nestArchHome: "Nest Arch home",
      toggleTheme: "Toggle theme",
    },
    hero: {
      badge: "· stable · available",
      description:
        "A guided terminal flow for choosing the runtime, data layer and tools for a standalone NestJS project. Review the generated files before you create it.",
      downloads: "downloads",
      exitInteractiveDemo: "Exit Interactive Demo",
      exploreDocs: "Explore docs",
      headline: "Build the NestJS project you actually meant to build.",
      interactiveByDefault: "Interactive by default",
      launchDemo: "Launch Interactive Live Demo",
      launchDemoDescription:
        "Explore a simulated browser demo of the CLI configuration flow",
      noConfigFiles: "No config guesswork",
      start: "START",
      tagline: "Your architecture, made explicit",
      terminal: {
        buildProductionReady: "Configure your NestJS project.",
        createNewProject: "Create a new NestJS project",
        documentation: "Documentation",
        exit: "Exit",
        exitHint: "to exit",
        letsBuild: "Let's build something amazing.",
        navigateHint: "to navigate",
        selectHint: "to select",
        starterTemplates: "Starter templates",
        welcome: "Welcome to",
        welcomeTo: "Welcome to",
        whatWouldYouLike: "What would you like to do?",
      },
      tryLiveDemo: "Try Live Demo",
    },
    metaDescription:
      "CLI and interactive TUI for configuring NestJS applications and microservices. Version 1.0.0.",
    roadmap: roadmapMessages.en,
    workflow: {
      description:
        "Each stage stays explicit, so configuration never feels like a black box.",
      expand: "expand",
      heading: "A generator you can inspect as it works.",
      highlights: [
        "Terminal interface without heavy dependencies",
        "Instant input validation & condition checks",
      ],
      sectionLabel: "The workflow",
      steps: [
        {
          description:
            "Start from a clear menu instead of a wall of flags. The wizard keeps the available paths visible from the first prompt.",
          tag: "01 / Start",
          title: "Choose a starting point",
        },
        {
          description:
            "Select project type, package manager, data layer, transport and add-ons in a deliberate sequence.",
          tag: "02 / Configure",
          title: "Configure the stack",
        },
        {
          description:
            "Review architecture, dependencies and selected options before files are written to disk.",
          tag: "03 / Confirm",
          title: "Confirm before writing",
        },
        {
          description:
            "Follow the generator as templates resolve and the project tree is created, without leaving the terminal.",
          tag: "04 / Generate",
          title: "See what is being created",
        },
        {
          description:
            "Finish with a project structure and the tools you selected. Git initialization is optional.",
          tag: "05 / Done",
          title: "Leave with a real project",
        },
      ],
    },
  },
  es: {
    features: {
      description:
        "Comienza con las decisiones que son difíciles de implementar después, no con un starter genérico y una larga limpieza.",
      heading: "Las piezas que dan forma a un proyecto real",
      items: [
        {
          description:
            "Flujo de terminal guiado con opciones que se adaptan a tu proyecto NestJS independiente.",
          title: "Una CLI guiada",
        },
        {
          description:
            "Plantillas Handlebars con resolución inteligente y opciones de scaffolding dinámico.",
          title: "Plantillas componibles",
        },
        {
          description:
            "Elige entre opciones compatibles de base de datos, API, autenticación y herramientas.",
          title: "Opciones para tu proyecto",
        },
        {
          description:
            "Elige el runtime, la capa de datos y las herramientas para una aplicación NestJS independiente.",
          title: "Configuración a tu medida",
        },
        {
          description:
            "Explora los archivos que generan las opciones seleccionadas antes de crear el proyecto.",
          title: "Vista previa del proyecto",
        },
      ],
      sectionLabel: "Diseñado alrededor de decisiones",
    },
    footer: {
      builtWith: "Hecho con",
      copyright: "© 2026 Nest Arch. Licencia MIT.",
      description:
        "El moderno CLI y generador TUI para configurar aplicaciones y microservicios NestJS. Versión 1.0.0.",
      forDevelopers: "para desarrolladores.",
      product: "Producto",
      readyWhenYouAre: "Listo cuando tú lo estés",
      resources: "Recursos",
      scaffoldRight: "elige tu stack, empieza con claridad.",
    },
    header: {
      language: "Idioma",
      nav: {
        aboutMe: "Sobre mí",
        documentation: "Documentación",
        features: "Características",
        home: "Inicio",
        roadmap: "Hoja de ruta",
        workflow: "Flujo",
      },
      navigation: "Menú de navegación",
      nestArchHome: "Inicio de Nest Arch",
      toggleTheme: "Cambiar tema",
    },
    hero: {
      badge: "· estable · disponible",
      description:
        "Un flujo guiado en terminal para elegir el runtime, la capa de datos y las herramientas de una aplicación NestJS independiente. Revisa los archivos antes de generarla.",
      downloads: "descargas",
      exitInteractiveDemo: "Salir de la demo interactiva",
      exploreDocs: "Explorar docs",
      headline: "Construye el proyecto NestJS que realmente querías crear.",
      interactiveByDefault: "Interactivo por defecto",
      launchDemo: "Lanzar demo interactiva en vivo",
      launchDemoDescription:
        "Explora una demostración simulada en el navegador del flujo de configuración",
      noConfigFiles: "Sin adivinar la configuración",
      start: "INICIAR",
      tagline: "Tu arquitectura, hecha explícita",
      terminal: {
        buildProductionReady: "Configura tu proyecto NestJS.",
        createNewProject: "Crear un nuevo proyecto NestJS",
        documentation: "Documentación",
        exit: "Salir",
        exitHint: "para salir",
        letsBuild: "Construyamos algo increíble.",
        navigateHint: "para navegar",
        selectHint: "para seleccionar",
        starterTemplates: "Plantillas de inicio",
        welcome: "Bienvenido a",
        welcomeTo: "Bienvenido a",
        whatWouldYouLike: "¿Qué te gustaría hacer?",
      },
      tryLiveDemo: "Probar demo en vivo",
    },
    metaDescription:
      "CLI y generador TUI interactivo para configurar aplicaciones y microservicios NestJS. Versión 1.0.0.",
    roadmap: roadmapMessages.es,
    workflow: {
      description:
        "Cada etapa se mantiene explícita, para que la configuración nunca se sienta como una caja negra.",
      expand: "ampliar",
      heading: "Un generador que puedes inspeccionar mientras funciona.",
      highlights: [
        "Interfaz de terminal sin dependencias pesadas",
        "Validación instantánea de entrada y verificación de condiciones",
      ],
      sectionLabel: "El flujo",
      steps: [
        {
          description:
            "Comienza desde un menú claro en lugar de una pared de flags. El asistente mantiene las rutas visibles desde el primer prompt.",
          tag: "01 / Inicio",
          title: "Elige un punto de partida",
        },
        {
          description:
            "Selecciona el tipo de proyecto, gestor de paquetes, capa de datos, transporte y complementos en una secuencia deliberada.",
          tag: "02 / Configurar",
          title: "Configura el stack",
        },
        {
          description:
            "Revisa la arquitectura, dependencias y opciones seleccionadas antes de que los archivos se escriban en disco.",
          tag: "03 / Confirmar",
          title: "Confirma antes de escribir",
        },
        {
          description:
            "Sigue al generador mientras las plantillas se resuelven y el árbol del proyecto se crea, sin salir de la terminal.",
          tag: "04 / Generar",
          title: "Mira lo que se está creando",
        },
        {
          description:
            "Termina con la estructura y las herramientas seleccionadas. La inicialización de Git es opcional.",
          tag: "05 / Listo",
          title: "Ve con un proyecto real",
        },
      ],
    },
  },
  pt: {
    features: {
      description:
        "Comece com as decisões que são difíceis de implementar depois, não com um starter genérico e uma longa limpeza.",
      heading: "As peças que moldam um projeto real",
      items: [
        {
          description:
            "Experiência de terminal guiada, intuitiva e bonita com prompts inteligentes.",
          title: "Uma CLI guiada",
        },
        {
          description:
            "Templates Handlebars com resolução inteligente e opções de scaffolding dinâmico.",
          title: "Templates composáveis",
        },
        {
          description:
            "Escolha entre opções compatíveis de banco de dados, API, autenticação e ferramentas.",
          title: "Opções para seu projeto",
        },
        {
          description:
            "Escolha runtime, camada de dados e ferramentas para uma aplicação NestJS independente.",
          title: "Configuração sob medida",
        },
        {
          description:
            "Visualize os arquivos gerados pelas opções escolhidas antes de criar o projeto.",
          title: "Prévia dos arquivos",
        },
      ],
      sectionLabel: "Projetado em torno de escolhas",
    },
    footer: {
      builtWith: "Feito com",
      copyright: "© 2026 Nest Arch. Licença MIT.",
      description:
        "CLI e gerador TUI interativo para configurar aplicações e microsserviços NestJS. Versão 1.0.0.",
      forDevelopers: "para desenvolvedores.",
      product: "Produto",
      readyWhenYouAre: "Pronto quando você estiver",
      resources: "Recursos",
      scaffoldRight: "escolha sua stack, comece com clareza.",
    },
    header: {
      language: "Idioma",
      nav: {
        aboutMe: "Sobre mim",
        documentation: "Documentação",
        features: "Funcionalidades",
        home: "Início",
        roadmap: "Roadmap",
        workflow: "Fluxo",
      },
      navigation: "Menu de navegação",
      nestArchHome: "Início do Nest Arch",
      toggleTheme: "Alternar tema",
    },
    hero: {
      badge: "· estável · disponível",
      description:
        "Um fluxo guiado no terminal para escolher o runtime, a camada de dados e as ferramentas para uma aplicação NestJS independente. Revise os arquivos antes de gerar o projeto.",
      downloads: "downloads",
      exitInteractiveDemo: "Sair da demo interativa",
      exploreDocs: "Explorar docs",
      headline: "Construa o projeto NestJS que você realmente queria criar.",
      interactiveByDefault: "Interativo por padrão",
      launchDemo: "Iniciar demo interativa ao vivo",
      launchDemoDescription:
        "Explore uma demonstração simulada no navegador do fluxo de configuração",
      noConfigFiles: "Sem adivinhar as configurações",
      start: "INICIAR",
      tagline: "Sua arquitetura, tornada explícita",
      terminal: {
        buildProductionReady: "Configure seu projeto NestJS.",
        createNewProject: "Criar um novo projeto NestJS",
        documentation: "Documentação",
        exit: "Sair",
        exitHint: "para sair",
        letsBuild: "Vamos construir algo incrível.",
        navigateHint: "para navegar",
        selectHint: "para selecionar",
        starterTemplates: "Templates iniciais",
        welcome: "Bem-vindo ao",
        welcomeTo: "Bem-vindo ao",
        whatWouldYouLike: "O que você gostaria de fazer?",
      },
      tryLiveDemo: "Experimentar demo ao vivo",
    },
    metaDescription:
      "CLI e gerador TUI interativo para configurar aplicações e microsserviços NestJS. Versão 1.0.0.",
    roadmap: roadmapMessages.pt,
    workflow: {
      description:
        "Cada etapa permanece explícita, para que a configuração nunca se sinta como uma caixa-preta.",
      expand: "ampliar",
      heading: "Um gerador que você pode inspecionar enquanto funciona.",
      highlights: [
        "Interface de terminal sem dependências pesadas",
        "Validação instantânea de entrada e verificação de condições",
      ],
      sectionLabel: "O fluxo",
      steps: [
        {
          description:
            "Comece a partir de um menu claro em vez de uma parede de flags. O assistente mantém os caminhos visíveis desde o primeiro prompt.",
          tag: "01 / Início",
          title: "Escolha um ponto de partida",
        },
        {
          description:
            "Selecione o tipo de projeto, gerenciador de pacotes, camada de dados, transporte e complementos em uma sequência deliberada.",
          tag: "02 / Configurar",
          title: "Configure o stack",
        },
        {
          description:
            "Revise a arquitetura, dependências e opções selecionadas antes que os arquivos sejam gravados no disco.",
          tag: "03 / Confirmar",
          title: "Confirme antes de escrever",
        },
        {
          description:
            "Acompanhe o gerador enquanto os templates são resolvidos e a árvore do projeto é criada, sem sair do terminal.",
          tag: "04 / Gerar",
          title: "Veja o que está sendo criado",
        },
        {
          description:
            "Termine com a estrutura e as ferramentas escolhidas. A inicialização do Git é opcional.",
          tag: "05 / Pronto",
          title: "Vá com um projeto real",
        },
      ],
    },
  },
};

export const getUiMessages = (locale: string): UiMessages => {
  if (locale in uiMessages) {
    return uiMessages[locale as Locale];
  }
  return uiMessages.en;
};

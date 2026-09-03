import type { Locale } from "@/lib/i18n";

export interface UiMessages {
  metaDescription: string;
  header: {
    language: string;
    toggleTheme: string;
    nestArchHome: string;
    nav: {
      home: string;
      workflow: string;
      features: string;
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
  roadmap: {
    sectionLabel: string;
    heading: string;
    description: string;
    backToHome: string;
    status: {
      planned: string;
      waiting: string;
      notReady: string;
    };
    groups: {
      title: string;
      subtitle: string;
      items: {
        title: string;
        description: string;
      }[];
    }[];
  };
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
      heading: "The pieces that shape a real project.",
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
            "ORMs, auth, Docker, testing, linting, and modern tooling out of the box.",
          title: "Production defaults",
        },
        {
          description:
            "TurboRepo powered workspaces for scalable architectures and shared packages.",
          title: "Monorepo-ready",
        },
        {
          description:
            "Pluggable engine, custom templates, and limitless architecture possibilities.",
          title: "Room to adapt",
        },
      ],
      sectionLabel: "Designed around choices",
    },
    footer: {
      builtWith: "Built with",
      copyright: "© 2026 Nest Arch. MIT License.",
      description:
        "The modern CLI and TUI generator for building opinionated, production-ready NestJS applications and microservices.",
      forDevelopers: "for developers.",
      product: "Product",
      readyWhenYouAre: "Ready when you are",
      resources: "Resources",
      scaffoldRight: "scaffold right, ship fast.",
    },
    header: {
      language: "Language",
      nav: {
        aboutMe: "About Me",
        features: "Features",
        home: "Home",
        roadmap: "Roadmap",
        workflow: "Workflow",
      },
      nestArchHome: "Nest Arch home",
      toggleTheme: "Toggle theme",
    },
    hero: {
      badge: "is available",
      description:
        "A guided terminal flow for choosing the runtime, data layer and tooling before your first file exists. Clear decisions in, a production-ready foundation out.",
      downloads: "downloads",
      exitInteractiveDemo: "Exit Interactive Demo",
      exploreDocs: "Explore docs",
      headline: "Build the NestJS project you actually meant to build.",
      interactiveByDefault: "Interactive by default",
      launchDemo: "Launch Interactive Live Demo",
      launchDemoDescription: "Click to test all CLI steps in browser",
      noConfigFiles: "No config files",
      start: "START",
      tagline: "Your architecture, made explicit",
      terminal: {
        buildProductionReady: "Build production-ready NestJS projects.",
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
      "Powerful CLI and interactive TUI generator for building opinionated, production-ready NestJS applications and microservices.",
    roadmap: {
      backToHome: "Back to home",
      description:
        "A living view of what we are building, what we are waiting on, and what is intentionally left for later.",
      groups: [
        {
          items: [
            {
              description:
                "Format output with Prettier out of the box for clean, consistent generated code.",
              title: "Prettier support",
            },
            {
              description:
                "Core CLI generation of resolvers, resources, controllers, and services — like nest generate, but driven by the nest-arch metadata file for custom generation.",
              title: "Generate NestJS components",
            },
            {
              description:
                "A community space for questions, feedback, and collaboration around nest-arch.",
              title: "Create a Discord server",
            },
            {
              description:
                "Comprehensive docs covering the CLI, TUI, templates, and the metadata file for custom generation.",
              title: "Documentation for nest-arch",
            },
            {
              description:
                "Open up the project for collaboration, issues, and community contributions.",
              title: "Open-source on GitHub",
            },
          ],
          subtitle: "Actively planned and next up.",
          title: "On the horizon",
        },
        {
          items: [],
          subtitle: "Waiting on releases.",
          title: "On hold",
        },
        {
          items: [
            {
              description:
                "Prisma v7 doesn't support Mongo yet. 6.19 is the last supported version, and the next Prisma release will add Mongo support.",
              title: "Prisma v7 + MongoDB",
            },
          ],
          subtitle: "Flagged for later. Not ready yet.",
          title: "Unsupported",
        },
      ],
      heading: "Where nest/arch is headed.",
      sectionLabel: "Roadmap",
      status: {
        notReady: "Not ready",
        planned: "Planned",
        waiting: "Waiting",
      },
    },
    workflow: {
      description:
        "Each stage stays explicit, so configuration never feels like a black box.",
      expand: "expand",
      heading: "A generator you can inspect as it works.",
      highlights: [
        "Pure terminal interface with zero heavy dependencies",
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
            "Finish with a usable project structure, git initialization and the tooling selected in the wizard.",
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
      heading: "Las piezas que dan forma a un proyecto real.",
      items: [
        {
          description:
            "Experiencia de terminal guiada, intuitiva y hermosa con prompts inteligentes.",
          title: "Una CLI guiada",
        },
        {
          description:
            "Plantillas Handlebars con resolución inteligente y opciones de scaffolding dinámico.",
          title: "Plantillas componibles",
        },
        {
          description:
            "ORMs, autenticación, Docker, testing, linting y herramientas modernas listas para usar.",
          title: "Valores por defecto de producción",
        },
        {
          description:
            "Workspaces potenciados por TurboRepo para arquitecturas escalables y paquetes compartidos.",
          title: "Listo para monorepos",
        },
        {
          description:
            "Motor extensible, plantillas personalizadas y posibilidades de arquitectura ilimitadas.",
          title: "Espacio para adaptar",
        },
      ],
      sectionLabel: "Diseñado alrededor de decisiones",
    },
    footer: {
      builtWith: "Hecho con",
      copyright: "© 2026 Nest Arch. Licencia MIT.",
      description:
        "El moderno CLI y generador TUI para construir aplicaciones y microservicios NestJS opinionados y listos para producción.",
      forDevelopers: "para desarrolladores.",
      product: "Producto",
      readyWhenYouAre: "Listo cuando tú lo estés",
      resources: "Recursos",
      scaffoldRight: "escarpa bien, lanza rápido.",
    },
    header: {
      language: "Idioma",
      nav: {
        aboutMe: "Sobre mí",
        features: "Características",
        home: "Inicio",
        roadmap: "Hoja de ruta",
        workflow: "Flujo",
      },
      nestArchHome: "Inicio de Nest Arch",
      toggleTheme: "Cambiar tema",
    },
    hero: {
      badge: "está disponible",
      description:
        "Un flujo guiado en terminal para elegir el runtime, la capa de datos y las herramientas antes de que exista tu primer archivo. Decisiones claras, una base lista para producción.",
      downloads: "descargas",
      exitInteractiveDemo: "Salir de la demo interactiva",
      exploreDocs: "Explorar docs",
      headline: "Construye el proyecto NestJS que realmente querías crear.",
      interactiveByDefault: "Interactivo por defecto",
      launchDemo: "Lanzar demo interactiva en vivo",
      launchDemoDescription:
        "Haz clic para probar todos los pasos de la CLI en el navegador",
      noConfigFiles: "Sin archivos de configuración",
      start: "INICIAR",
      tagline: "Tu arquitectura, hecha explícita",
      terminal: {
        buildProductionReady:
          "Construye proyectos NestJS listos para producción.",
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
      "CLI potente e interactivo generador TUI para construir aplicaciones y microservicios NestJS listos para producción.",
    roadmap: {
      backToHome: "Volver al inicio",
      description:
        "Una vista viva de lo que estamos construyendo, lo que estamos esperando y lo que se deja intencionalmente para después.",
      groups: [
        {
          items: [
            {
              description:
                "Formatea la salida con Prettier listo para usar para código generado limpio y consistente.",
              title: "Soporte para Prettier",
            },
            {
              description:
                "Generación CLI de resolvers, resources, controllers y services — como nest generate, pero impulsado por el archivo de metadatos de nest-arch para generación personalizada.",
              title: "Generar componentes NestJS",
            },
            {
              description:
                "Un espacio comunitario para preguntas, comentarios y colaboración alrededor de nest-arch.",
              title: "Crear un servidor de Discord",
            },
            {
              description:
                "Documentación completa que cubre la CLI, TUI, plantillas y el archivo de metadatos para generación personalizada.",
              title: "Documentación para nest-arch",
            },
            {
              description:
                "Abrir el proyecto para colaboración, issues y contribuciones de la comunidad.",
              title: "Código abierto en GitHub",
            },
          ],
          subtitle: "Planificado activamente y lo siguiente.",
          title: "En el horizonte",
        },
        {
          items: [],
          subtitle: "Esperando lanzamientos.",
          title: "En espera",
        },
        {
          items: [
            {
              description:
                "Prisma v7 aún no soporta Mongo. 6.19 es la última versión soportada, y la próxima versión de Prisma agregará soporte para Mongo.",
              title: "Prisma v7 + MongoDB",
            },
          ],
          subtitle: "Marcado para después. Aún no está listo.",
          title: "No soportado",
        },
      ],
      heading: "Hacia dónde va nest/arch.",
      sectionLabel: "Hoja de ruta",
      status: {
        notReady: "No disponible",
        planned: "Planificado",
        waiting: "Esperando",
      },
    },
    workflow: {
      description:
        "Cada etapa se mantiene explícita, para que la configuración nunca se sienta como una caja negra.",
      expand: "ampliar",
      heading: "Un generador que puedes inspeccionar mientras funciona.",
      highlights: [
        "Interfaz pura de terminal con cero dependencias pesadas",
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
            "Termina con una estructura de proyecto usable, inicialización de git y las herramientas seleccionadas en el asistente.",
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
      heading: "As peças que moldam um projeto real.",
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
            "ORMs, auth, Docker, testes, linting e ferramentas modernas prontas para uso.",
          title: "Valores padrão de produção",
        },
        {
          description:
            "Workspaces potenciados por TurboRepo para arquiteturas escaláveis e pacotes compartilhados.",
          title: "Pronto para monorepos",
        },
        {
          description:
            "Motor extensível, templates personalizados e possibilidades de arquitetura ilimitadas.",
          title: "Espaço para adaptar",
        },
      ],
      sectionLabel: "Projetado em torno de escolhas",
    },
    footer: {
      builtWith: "Feito com",
      copyright: "© 2026 Nest Arch. Licença MIT.",
      description:
        "O moderno CLI e gerador TUI para construir aplicações e microserviços NestJS opinativos e prontos para produção.",
      forDevelopers: "para desenvolvedores.",
      product: "Produto",
      readyWhenYouAre: "Pronto quando você estiver",
      resources: "Recursos",
      scaffoldRight: "escarpe bem, envie rápido.",
    },
    header: {
      language: "Idioma",
      nav: {
        aboutMe: "Sobre mim",
        features: "Funcionalidades",
        home: "Início",
        roadmap: "Roadmap",
        workflow: "Fluxo",
      },
      nestArchHome: "Início do Nest Arch",
      toggleTheme: "Alternar tema",
    },
    hero: {
      badge: "está disponível",
      description:
        "Um fluxo guiado no terminal para escolher o runtime, camada de dados e ferramentas antes que seu primeiro arquivo exista. Decisões claras, uma base pronta para produção.",
      downloads: "downloads",
      exitInteractiveDemo: "Sair da demo interativa",
      exploreDocs: "Explorar docs",
      headline: "Construa o projeto NestJS que você realmente queria criar.",
      interactiveByDefault: "Interativo por padrão",
      launchDemo: "Iniciar demo interativa ao vivo",
      launchDemoDescription:
        "Clique para testar todos os passos da CLI no navegador",
      noConfigFiles: "Sem arquivos de configuração",
      start: "INICIAR",
      tagline: "Sua arquitetura, tornada explícita",
      terminal: {
        buildProductionReady: "Construa projetos NestJS prontos para produção.",
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
      "CLI poderoso e gerador TUI interativo para construir aplicações e microserviços NestJS prontos para produção.",
    roadmap: {
      backToHome: "Voltar ao início",
      description:
        "Uma visão viva do que estamos construindo, do que estamos esperando e do que é intencionalmente deixado para depois.",
      groups: [
        {
          items: [
            {
              description:
                "Formate a saída com Prettier pronto para uso para código gerado limpo e consistente.",
              title: "Suporte a Prettier",
            },
            {
              description:
                "Geração CLI de resolvers, resources, controllers e services — como nest generate, mas impulsionado pelo arquivo de metadados do nest-arch para geração personalizada.",
              title: "Gerar componentes NestJS",
            },
            {
              description:
                "Um espaço comunitário para perguntas, feedback e colaboração em torno do nest-arch.",
              title: "Criar um servidor Discord",
            },
            {
              description:
                "Documentação abrangente cobrindo a CLI, TUI, templates e o arquivo de metadados para geração personalizada.",
              title: "Documentação para nest-arch",
            },
            {
              description:
                "Abrir o projeto para colaboração, issues e contribuições da comunidade.",
              title: "Código aberto no GitHub",
            },
          ],
          subtitle: "Planejado ativamente e próximo.",
          title: "No horizonte",
        },
        {
          items: [],
          subtitle: "Aguardando lançamentos.",
          title: "Em espera",
        },
        {
          items: [
            {
              description:
                "Prisma v7 ainda não suporta Mongo. 6.19 é a última versão suportada, e a próxima versão do Prisma adicionará suporte a Mongo.",
              title: "Prisma v7 + MongoDB",
            },
          ],
          subtitle: "Marcado para depois. Ainda não está pronto.",
          title: "Não suportado",
        },
      ],
      heading: "Para onde nest/arch está indo.",
      sectionLabel: "Roadmap",
      status: {
        notReady: "Não disponível",
        planned: "Planejado",
        waiting: "Aguardando",
      },
    },
    workflow: {
      description:
        "Cada etapa permanece explícita, para que a configuração nunca se sinta como uma caixa-preta.",
      expand: "ampliar",
      heading: "Um gerador que você pode inspecionar enquanto funciona.",
      highlights: [
        "Interface pura de terminal com zero dependências pesadas",
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
            "Termine com uma estrutura de projeto utilizável, inicialização do git e as ferramentas selecionadas no assistente.",
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

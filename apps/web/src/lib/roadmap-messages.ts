import { getDocumentationUrl } from "@/lib/documentation";
import type { Locale } from "@/lib/i18n";

export interface RoadmapMessages {
  backToHome: string;
  sectionLabel: string;
  heading: string;
  description: string;
  milestones: {
    version: string;
    status: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
    exploration?: { title: string; description: string };
  }[];
  community: {
    heading: string;
    items: {
      title: string;
      status: string;
      description: string;
      href?: string;
    }[];
  };
  compatibility: {
    heading: string;
    description: string;
    checked: string;
    docs: string;
    items: { title: string; description: string }[];
  };
}

export const roadmapMessages: Record<Locale, RoadmapMessages> = {
  en: {
    backToHome: "Back to home",
    community: {
      heading: "Documentation & community",
      items: [
        {
          description:
            "Documentation available in English, Spanish, and Portuguese, with quick start, wizard, headless generation, configuration, and CLI guides.",
          href: getDocumentationUrl("en"),
          status: "Implemented",
          title: "Documentation",
        },
        {
          description: "A space for questions, feedback, and collaboration.",
          status: "Planned",
          title: "Discord community",
        },
        {
          description: "Planned after I find a job.",
          status: "Planned",
          title: "Open-source release",
        },
      ],
    },
    compatibility: {
      checked: "Last checked",
      description:
        "These are upstream Prisma capabilities. Availability in nest/arch depends on generator integration and validation.",
      docs: "Prisma documentation",
      heading: "Database compatibility",
      items: [
        {
          description:
            "Unsupported. MongoDB projects use Prisma 6 or migrate to Prisma 8.",
          title: "Prisma 7 + MongoDB",
        },
        {
          description:
            "PostgreSQL: release candidate. MongoDB: early access. SQLite: experimental. Other databases are planned upstream.",
          title: "Prisma 8",
        },
      ],
    },
    description:
      "Complete standalone applications first. Monorepo foundations next. Then tools to keep growing your project after creation.",
    heading: "Where nest/arch is headed.",
    milestones: [
      {
        description:
          "All promised single-app features, ready for the 1.0.0 release.",
        items: [
          {
            description:
              "Complete the promised application options, integrations, and configuration.",
            title: "Standalone applications",
          },
          {
            description:
              "Standalone microservices with Redis, MQTT, NATS, RabbitMQ, Kafka, and gRPC.",
            title: "Microservices & transports",
          },
          {
            description:
              "Prettier support for clean, consistent generated code.",
            title: "Formatting",
          },
        ],
        status: "Current focus",
        title: "Complete standalone app generation",
        version: "1.0.0",
      },
      {
        description:
          "Create a workspace with the foundations your applications need.",
        items: [
          {
            description:
              "Create a monorepo with application structure and workspace configuration.",
            title: "Workspace generation",
          },
          {
            description:
              "Set up shared packages and the foundations for applications to work together.",
            title: "Shared packages",
          },
        ],
        status: "Next",
        title: "Monorepo foundations",
        version: "2.0.0",
      },
      {
        description: "Return to an existing project and keep building.",
        exploration: {
          description:
            "More workflows for evolving existing projects. Scope will be refined as development progresses.",
          title: "Exploring",
        },
        items: [
          {
            description:
              "Create multiple applications inside an existing monorepo.",
            title: "Add applications",
          },
          {
            description:
              "Generate resolvers, resources, controllers, and services using project metadata.",
            title: "Generate components",
          },
        ],
        status: "Future",
        title: "Beyond project creation",
        version: "3.0.0",
      },
    ],
    sectionLabel: "Roadmap",
  },
  es: {
    backToHome: "Volver al inicio",
    community: {
      heading: "Documentación y comunidad",
      items: [
        {
          description:
            "Documentación disponible en inglés, español y portugués, con inicio rápido, wizard, generación headless, configuración y referencia de la CLI.",
          href: getDocumentationUrl("es"),
          status: "Implementado",
          title: "Documentación",
        },
        {
          description: "Un espacio para preguntas, comentarios y colaboración.",
          status: "Planificado",
          title: "Comunidad en Discord",
        },
        {
          description: "Planeado para después de encontrar trabajo.",
          status: "Planificado",
          title: "Publicación como código abierto",
        },
      ],
    },
    compatibility: {
      checked: "Última verificación",
      description:
        "Estas son capacidades de Prisma. Su disponibilidad en nest/arch depende de la integración y validación del generador.",
      docs: "Documentación de Prisma",
      heading: "Compatibilidad de bases de datos",
      items: [
        {
          description:
            "No compatible. Los proyectos MongoDB usan Prisma 6 o migran a Prisma 8.",
          title: "Prisma 7 + MongoDB",
        },
        {
          description:
            "PostgreSQL: versión candidata. MongoDB: acceso anticipado. SQLite: experimental. Las demás bases de datos están previstas por Prisma.",
          title: "Prisma 8",
        },
      ],
    },
    description:
      "Primero, aplicaciones independientes completas. Después, las bases para monorepos. Luego, herramientas para seguir ampliando tu proyecto tras su creación.",
    heading: "Hacia dónde va nest/arch.",
    milestones: [
      {
        description:
          "Todas las funciones prometidas para aplicaciones individuales en la versión 1.0.0.",
        items: [
          {
            description:
              "Completar las opciones, integraciones y configuraciones prometidas.",
            title: "Aplicaciones independientes",
          },
          {
            description:
              "Microservicios independientes con Redis, MQTT, NATS, RabbitMQ, Kafka y gRPC.",
            title: "Microservicios y transportes",
          },
          {
            description:
              "Soporte de Prettier para generar código limpio y consistente.",
            title: "Formato",
          },
        ],
        status: "Enfoque actual",
        title: "Generación completa de aplicaciones independientes",
        version: "1.0.0",
      },
      {
        description:
          "Crea un espacio de trabajo con las bases que necesitan tus aplicaciones.",
        items: [
          {
            description:
              "Crear un monorepo con estructura de aplicaciones y configuración del espacio de trabajo.",
            title: "Generación de espacios de trabajo",
          },
          {
            description:
              "Configurar paquetes compartidos y las bases para conectar aplicaciones.",
            title: "Paquetes compartidos",
          },
        ],
        status: "Siguiente",
        title: "Bases para monorepos",
        version: "2.0.0",
      },
      {
        description: "Vuelve a un proyecto existente y sigue construyendo.",
        exploration: {
          description:
            "Más flujos para ampliar proyectos existentes. El alcance se definirá durante el desarrollo.",
          title: "En exploración",
        },
        items: [
          {
            description:
              "Crear múltiples aplicaciones dentro de un monorepo existente.",
            title: "Añadir aplicaciones",
          },
          {
            description:
              "Generar resolvers, recursos, controladores y servicios a partir de los metadatos del proyecto.",
            title: "Generar componentes",
          },
        ],
        status: "Futuro",
        title: "Más allá de la creación",
        version: "3.0.0",
      },
    ],
    sectionLabel: "Hoja de ruta",
  },
  pt: {
    backToHome: "Voltar ao início",
    community: {
      heading: "Documentação e comunidade",
      items: [
        {
          description:
            "Documentação disponível em inglês, espanhol e português, com início rápido, wizard, geração headless, configuração e referência da CLI.",
          href: getDocumentationUrl("pt"),
          status: "Implementado",
          title: "Documentação",
        },
        {
          description: "Um espaço para dúvidas, feedback e colaboração.",
          status: "Planejado",
          title: "Comunidade no Discord",
        },
        {
          description: "Planejado para uma etapa futura do projeto.",
          status: "Planejado",
          title: "Lançamento como código aberto",
        },
      ],
    },
    compatibility: {
      checked: "Última verificação",
      description:
        "Estas são capacidades do Prisma. A disponibilidade no nest/arch depende da integração e validação do gerador.",
      docs: "Documentação do Prisma",
      heading: "Compatibilidade de bancos de dados",
      items: [
        {
          description:
            "Sem suporte. Projetos MongoDB usam Prisma 6 ou migram para o Prisma 8.",
          title: "Prisma 7 + MongoDB",
        },
        {
          description:
            "PostgreSQL: versão candidata. MongoDB: acesso antecipado. SQLite: experimental. Os demais bancos estão nos planos do Prisma.",
          title: "Prisma 8",
        },
      ],
    },
    description:
      "Primeiro, aplicações independentes completas. Depois, a base para monorepos. Então, ferramentas para continuar expandindo seu projeto após a criação.",
    heading: "Para onde o nest/arch está indo.",
    milestones: [
      {
        description:
          "Todos os recursos prometidos para aplicações individuais na versão 1.0.0.",
        items: [
          {
            description:
              "Concluir as opções, integrações e configurações prometidas.",
            title: "Aplicações independentes",
          },
          {
            description:
              "Microsserviços independentes com Redis, MQTT, NATS, RabbitMQ, Kafka e gRPC.",
            title: "Microsserviços e transportes",
          },
          {
            description:
              "Suporte ao Prettier para gerar código limpo e consistente.",
            title: "Formatação",
          },
        ],
        status: "Foco atual",
        title: "Geração completa de aplicações independentes",
        version: "1.0.0",
      },
      {
        description:
          "Crie um workspace com a base de que suas aplicações precisam.",
        items: [
          {
            description:
              "Criar um monorepo com estrutura de aplicações e configuração do workspace.",
            title: "Geração de workspaces",
          },
          {
            description:
              "Configurar pacotes compartilhados e a base para conectar aplicações.",
            title: "Pacotes compartilhados",
          },
        ],
        status: "Próximo",
        title: "Base para monorepos",
        version: "2.0.0",
      },
      {
        description: "Volte a um projeto existente e continue construindo.",
        exploration: {
          description:
            "Mais fluxos para expandir projetos existentes. O escopo será refinado durante o desenvolvimento.",
          title: "Em exploração",
        },
        items: [
          {
            description:
              "Criar múltiplas aplicações dentro de um monorepo existente.",
            title: "Adicionar aplicações",
          },
          {
            description:
              "Gerar resolvers, recursos, controllers e services usando os metadados do projeto.",
            title: "Gerar componentes",
          },
        ],
        status: "Futuro",
        title: "Além da criação do projeto",
        version: "3.0.0",
      },
    ],
    sectionLabel: "Roadmap",
  },
};

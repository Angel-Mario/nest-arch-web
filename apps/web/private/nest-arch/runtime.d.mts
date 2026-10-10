import type { PreviewConfig } from "../../src/lib/project-preview/config";
type Context = PreviewConfig & { projectName: string; description?: string; initGit: boolean; installDependencies: boolean };
export declare class ProjectGenerator {
  constructor(outputDir: string, options: { generatorVersion?: string; templatesDir: string; candidateProfile?: "prisma8-mongodb" });
  generate(context: Context): Promise<{ success: boolean; error?: string; generatedFiles: string[] }>;
}
export declare function validateProjectContext(context: Context, candidate?: "prisma8-mongodb", certificationCandidate?: boolean): void;
export declare function getUnsupportedSelections(context: Context): { code: string; kind: string; message: string }[];
export declare const options: Record<string, { value: string; label: string; description: string }[]>;

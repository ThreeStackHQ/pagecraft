export interface CodeFile {
  path: string;
  content: string;
}

export interface GeneratedProject {
  files: CodeFile[];
}

export interface ComponentInfo {
  name: string;
  fileName: string;
  exports: string[];
}

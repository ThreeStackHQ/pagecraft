export interface CodeFile {
  path: string;
  content: string;
}

export interface GeneratedProject {
  files: CodeFile[];
}

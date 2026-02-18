import type { StitchProject, StitchScreen, GenerateScreenRequest } from './types';

export class StitchClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createProject(name: string): Promise<StitchProject> {
    // TODO: Implement via MCP bridge
    throw new Error('Not implemented yet');
  }

  async generateScreen(request: GenerateScreenRequest): Promise<StitchScreen> {
    // TODO: Implement via MCP bridge
    // Will use generate_screen_from_text from Google Stitch MCP
    throw new Error('Not implemented yet');
  }

  async getScreen(projectId: string, screenId: string): Promise<StitchScreen> {
    // TODO: Implement via MCP bridge
    throw new Error('Not implemented yet');
  }

  async listScreens(projectId: string): Promise<StitchScreen[]> {
    // TODO: Implement via MCP bridge
    throw new Error('Not implemented yet');
  }
}

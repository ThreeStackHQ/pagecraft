export interface StitchProject {
  id: string;
  name: string;
  createdAt: string;
}

export interface StitchScreen {
  id: string;
  projectId: string;
  designData: unknown;
  status: 'generating' | 'complete' | 'failed';
  createdAt: string;
}

export interface GenerateScreenRequest {
  projectId: string;
  prompt: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
}

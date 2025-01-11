import { API_BASE } from "@/config";

export const ROUTES = {
    sendMessage: (agentId: string): string => `${API_BASE}/${agentId}/message`,
    getAgents: (): string => `${API_BASE}/agents`,
};

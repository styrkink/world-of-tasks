const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: unknown;
    headers?: Record<string, string>;
}

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    setToken(token: string | null) {
        this.token = token;
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = 'GET', body, headers = {} } = options;

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
            },
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, config);

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        // Handle empty responses
        const text = await response.text();
        return text ? JSON.parse(text) : (null as T);
    }

    // Auth
    async login(email: string, password: string) {
        return this.request<{ accessToken: string }>('/auth/login', {
            method: 'POST',
            body: { email, password },
        });
    }

    async signup(email: string, password: string) {
        return this.request<{ accessToken: string }>('/auth/signup', {
            method: 'POST',
            body: { email, password },
        });
    }

    // Character
    async getCharacter() {
        return this.request('/characters/me');
    }

    async createCharacter(data: {
        name: string;
        faction: string;
        race: string;
        class: string;
    }) {
        return this.request('/characters', {
            method: 'POST',
            body: data,
        });
    }

    // Campaigns
    async getCampaigns() {
        return this.request('/campaigns');
    }

    async getCampaign(id: string) {
        return this.request(`/campaigns/${id}`);
    }

    async createCampaign(data: { title: string; description?: string }) {
        return this.request('/campaigns', {
            method: 'POST',
            body: data,
        });
    }

    async archiveCampaign(id: string) {
        return this.request(`/campaigns/${id}/archive`, { method: 'PATCH' });
    }

    // Quests
    async getQuests(campaignId: string) {
        return this.request(`/campaigns/${campaignId}/quests`);
    }

    async acceptQuest(questId: string) {
        return this.request(`/quests/${questId}/accept`, { method: 'PATCH' });
    }

    async turnInQuest(questId: string) {
        return this.request(`/quests/${questId}/turn-in`, { method: 'PATCH' });
    }

    async toggleStep(stepId: string) {
        return this.request(`/quest-steps/${stepId}/toggle`, { method: 'PATCH' });
    }

    // Wishes
    async getWishes() {
        return this.request('/wishes');
    }

    async createWish(data: { title: string; description?: string; costGold: number }) {
        return this.request('/wishes', {
            method: 'POST',
            body: data,
        });
    }

    async redeemWish(id: string) {
        return this.request(`/wishes/${id}/redeem`, { method: 'PATCH' });
    }
}

export const api = new ApiClient(API_BASE_URL);

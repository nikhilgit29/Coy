const API_BASE = '/api';

export const api = {
  async getFeed() {
    const res = await fetch(`${API_BASE}/feed`);
    if (!res.ok) throw new Error('Failed to fetch feed');
    return res.json();
  },

  async swipe(profileId, action) {
    const res = await fetch(`${API_BASE}/swipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileId, action }),
    });
    if (!res.ok) throw new Error('Failed to record swipe');
    return res.json();
  },

  async getMatches() {
    const res = await fetch(`${API_BASE}/matches`);
    if (!res.ok) throw new Error('Failed to fetch matches');
    return res.json();
  },

  async resetSwipes() {
    const res = await fetch(`${API_BASE}/reset`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset swipes');
    return res.json();
  },

  async getDemoUser() {
    const res = await fetch(`${API_BASE}/user`);
    if (!res.ok) throw new Error('Failed to fetch demo user');
    return res.json();
  }
};

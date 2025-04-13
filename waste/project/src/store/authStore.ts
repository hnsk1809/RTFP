import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'seller' | 'bidder') => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: async (email: string, password: string) => {
    // Implement login logic here
    // For now, using a mock implementation
    const mockUser: User = {
      id: '1',
      email,
      name: 'Test User',
      role: 'bidder'
    };
    set({ user: mockUser });
  },
  register: async (email: string, password: string, role: 'seller' | 'bidder') => {
    // Implement registration logic here
    // For now, using a mock implementation
    const mockUser: User = {
      id: '2',
      email,
      name: 'New User',
      role
    };
    set({ user: mockUser });
  }
}));
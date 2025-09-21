// src/store/store.ts
import { create } from 'zustand';
import { IPortfolio, IImage } from '../lib/types';

interface IPortfolioState {
  portfolios: IPortfolio[];
  addPortfolio: (newPortfolio: Omit<IPortfolio, 'id' | 'images'>, images: IImage[]) => void;
}

export const usePortfolioStore = create<IPortfolioState>((set) => ({
  portfolios: [],
  addPortfolio: (newPortfolio, images) =>
    set((state) => ({ 
      portfolios: [...state.portfolios, { ...newPortfolio, id: Date.now(), images }] 
    })),
}));
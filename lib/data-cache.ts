// Data caching utilities for fast static data loading
import React from 'react';
import mbbsIndiaData from '../public/mbbs-india.json';
import mbbsAbroadData from '../public/mbbs-abroad.json';

// Cache keys
export const CACHE_KEYS = {
  MBBS_INDIA: 'mbbs_india_data',
  MBBS_ABROAD: 'mbbs_abroad_data',
  LAST_UPDATED: 'data_last_updated'
};

// Cache duration (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Static data loader with caching
export class DataCache {
  private static instance: DataCache;
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();

  static getInstance(): DataCache {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }

  // Get data from cache or load from static import
  get<T = unknown>(key: string): T | null {
    // Check memory cache first
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data as T;
    }

    // Check localStorage cache
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            // Update memory cache
            this.cache.set(key, parsed);
            return parsed.data as T;
          }
        }
      } catch (error) {
        console.warn('Cache read error:', error);
      }
    }

    // Load from static data
    let data: unknown;
    switch (key) {
      case CACHE_KEYS.MBBS_INDIA:
        data = mbbsIndiaData;
        break;
      case CACHE_KEYS.MBBS_ABROAD:
        data = mbbsAbroadData;
        break;
      default:
        return null;
    }

    // Update caches
    this.set(key, data);
    return data as T;
  }

  // Set data in both memory and localStorage
  set(key: string, data: unknown): void {
    const cacheItem = { data, timestamp: Date.now() };
    
    // Update memory cache
    this.cache.set(key, cacheItem);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(cacheItem));
      } catch (error) {
        console.warn('Cache write error:', error);
      }
    }
  }

  // Clear cache
  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } else {
      this.cache.clear();
      if (typeof window !== 'undefined') {
        Object.values(CACHE_KEYS).forEach(k => localStorage.removeItem(k));
      }
    }
  }

  // Preload all data
  preload(): void {
    this.get(CACHE_KEYS.MBBS_INDIA);
    this.get(CACHE_KEYS.MBBS_ABROAD);
  }
}

// Export singleton instance
export const dataCache = DataCache.getInstance();

// React hook for data loading.
// The cache reads are synchronous, so state is initialised lazily instead of
// being pushed through an effect.
export function useStaticData<T = unknown>(dataKey: string) {
  const [entry] = React.useState<{ data: T | null; error: string | null }>(() => {
    try {
      return { data: dataCache.get<T>(dataKey), error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to load data' };
    }
  });

  return { data: entry.data, loading: false, error: entry.error };
}

// Preload data on app start
if (typeof window !== 'undefined') {
  dataCache.preload();
}
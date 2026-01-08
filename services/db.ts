
import { User, Factory, Product, Order, Agent, Outlet, UserRole } from '../types';
import { MOCK_USERS, MOCK_FACTORIES, MOCK_PRODUCTS, MOCK_AGENTS } from '../constants';

class Database {
  private storageKey = 'aquaflow_db';

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData = {
        users: MOCK_USERS,
        factories: MOCK_FACTORIES,
        products: MOCK_PRODUCTS,
        agents: MOCK_AGENTS,
        orders: [],
        outlets: [
          { id: 'out-1', name: 'Downtown Market', code: 'DT01', address: '123 Main St', ownerName: 'Sam Shopkeeper', phone: '555-0101' }
        ]
      };
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  private getData() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Generic CRUD
  getAll<T>(collection: string): T[] {
    return this.getData()[collection] || [];
  }

  getById<T extends { id: string }>(collection: string, id: string): T | undefined {
    return this.getAll<T>(collection).find(item => item.id === id);
  }

  create<T extends { id: string }>(collection: string, item: T): T {
    const data = this.getData();
    if (!data[collection]) data[collection] = [];
    const newItem = { ...item, id: item.id || Math.random().toString(36).substr(2, 9) };
    data[collection].push(newItem);
    this.saveData(data);
    return newItem;
  }

  update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
    const data = this.getData();
    const index = data[collection].findIndex((item: any) => item.id === id);
    if (index === -1) return null;
    data[collection][index] = { ...data[collection][index], ...updates };
    this.saveData(data);
    return data[collection][index];
  }

  delete(collection: string, id: string): boolean {
    const data = this.getData();
    const initialLength = data[collection]?.length || 0;
    data[collection] = data[collection].filter((item: any) => item.id !== id);
    this.saveData(data);
    return data[collection].length < initialLength;
  }
}

export const db = new Database();

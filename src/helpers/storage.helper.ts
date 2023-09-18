import { OnValueChangeListener, PersistentStorage } from '@/interfaces';

export class StorageListener {
  listeners: Record<string, OnValueChangeListener<any>[]> = {};

  addValueChangeListener<V>(key: string, listener: OnValueChangeListener<V>): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }

    this.listeners[key].push(listener);
  }
  removeValueChangeListener<T>(key: string, listener: OnValueChangeListener<T>): void {
    this.listeners[key] = (this.listeners[key] || []).filter((l) => l !== listener);
  }
}

export class LocalStorage<T extends string>
  extends StorageListener
  implements PersistentStorage<T>
{
  getItem<V>(key: T) {
    const item = localStorage.getItem(key);

    if (item === null) return undefined;

    if (item === 'null') return null as never as V;
    if (item === 'undefined') return undefined;

    try {
      return JSON.parse(item) as V;
    } catch {
      return item as never as V;
    }
  }
  setItem<V>(key: T, value: V) {
    const oldValue = this.getItem(key);
    const newValue = JSON.stringify(value);
    if (oldValue === newValue) return;

    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, newValue);
    }

    const listeners = this.listeners[key] || [];

    listeners.forEach((listener) => {
      listener(value, oldValue);
    });
  }
}

export class TemporaryStorage<T extends string>
  extends StorageListener
  implements PersistentStorage<T>
{
  storage: Record<string, unknown> = {};

  getItem<V>(key: T) {
    return this.storage[key] as V;
  }
  setItem<V>(key: T, value: V) {
    const oldValue = this.getItem(key);
    if (oldValue === value) return;

    if (value === undefined) {
      delete this.storage[key];
    } else {
      this.storage[key] = value;
    }

    const listeners = this.listeners[key] || [];

    listeners.forEach((listener) => {
      listener(value, oldValue);
    });
  }
}

export function createPersistentStateManager<T extends string>(storage: PersistentStorage<T>) {
  function managePersistentState<V>(key: T) {
    return {
      get: () => storage.getItem<V | undefined>(key),
      set: (value: V | undefined) => storage.setItem(key, value),
    };
  }

  return managePersistentState;
}

import { PersistentStateKey } from '@/constants';
import { useCallback, useEffect, useState } from 'react';
import { OnValueChangeListener, PersistentStorage } from '@/interfaces';
import {
  LocalStorage,
  TemporaryStorage,
  createPersistentStateManager,
} from '@/helpers/storage.helper';

export const persistentStorage =
  typeof window !== 'undefined'
    ? new LocalStorage<PersistentStateKey>()
    : new TemporaryStorage<PersistentStateKey>();

export function createPersistentStateHook<T extends string>(storage: PersistentStorage<T>) {
  function usePersistentState<V>(key: T, initialValue: V) {
    const [value, setValue] = useState<V>(() => {
      const valueFromStorage = storage.getItem<V>(key);
      return valueFromStorage === undefined ? initialValue : valueFromStorage;
    });

    useEffect(() => {
      const onValueChange: OnValueChangeListener<V> = (newValue) => {
        setValue(newValue);
      };
      storage.addValueChangeListener(key, onValueChange);
      return () => storage.removeValueChangeListener(key, onValueChange);
    }, [key]);

    const setPersistentStorageValue = useCallback(
      (newValue: V) => {
        storage.setItem(key, newValue);
      },
      [key],
    );

    return [value, setPersistentStorageValue] as const;
  }

  return usePersistentState;
}

export const usePersistentState = createPersistentStateHook<PersistentStateKey>(persistentStorage);

export const managePersistentState =
  createPersistentStateManager<PersistentStateKey>(persistentStorage);

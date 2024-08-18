import { useState, useCallback } from 'react';

export type Listener<T> = (value: Partial<T>) => void;

export interface IMap<K, V> {
  map: Map<K, V>;
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  listen: (key: K, listener: Listener<V>) => void;
  clearListeners: () => void
}

export const useMap = <K, V>(initialState?: Iterable<readonly [K, V]>): IMap<K, V> => {
  const [map, setMap] = useState(new Map(initialState));
  const listeners = new Map<K, Listener<V>>();

  const get = (key: K) => {
    return map.get(key)
  }

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
    listeners.get(key)?.(value);
  }, [listeners]);

  const listen = useCallback((key: K, listener: Listener<V>) => {
    listeners.set(key, listener)
  }, [listeners]);

  const clearListeners = useCallback(() => {
    listeners.clear();
  }, [listeners]);

  return { map, get, set, listen, clearListeners };
};

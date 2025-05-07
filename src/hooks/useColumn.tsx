import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import type { BoardColumn, ColumnFormData } from '@/types/types.ts';
import type { UseColumnsParams, UseColumnsResult } from '@/types/hooks.ts';
import { useAppDispatch, useAppSelector } from '@/store';
import { emptyResponse } from '@/lib/api.ts';
import { columnsCreateThunk, columnsListThunk } from '@/thunks/column.thunk.ts';

export const useColumn = (params?: UseColumnsParams): UseColumnsResult => {
  const [autoloadState, setAutoloadState] = useState(params?.autoload ?? false);
  const entities = useAppSelector((store) => store.column.list.entities);
  const status = useAppSelector((store) => store.column.list.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!autoloadState) {
      return;
    }

    const loadDebounce = debounce(load, 400);

    loadDebounce();

    return () => {
      loadDebounce.cancel();
    };
  }, [autoloadState]);

  const setAutoload = useCallback((value: boolean) => {
    setAutoloadState(value);
  }, []);

  const get = useCallback(() => {
    return entities;
  }, [entities]);

  const create = useCallback((value: ColumnFormData) => {
    return dispatch(columnsCreateThunk(value)).unwrap().catch(emptyResponse);
  }, []);

  const load = useCallback(() => {
    return dispatch(columnsListThunk()).unwrap().catch(emptyResponse);
  }, []);

  const list = useMemo<BoardColumn[] | null>(() => {
    return get();
  }, [entities]);

  return {
    status,
    list,
    load,
    get,
    setAutoload,
    create,
  };
};

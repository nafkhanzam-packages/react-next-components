import {useHandleCallback} from "@nafkhanzam/react-architecture";
import {alerts} from "./common";

export const useLoadingCallback = <T extends unknown[]>(
  callback: (...args: T) => Promise<void | boolean> | void | boolean,
  params: T,
  setLoading?: (value: boolean) => void,
  onError: (err: unknown) => void = alerts.error,
) => {
  return useHandleCallback(setLoading ?? null, callback, onError, params, params);
};

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

function useListenRx<T>(controller: BehaviorSubject<T>) {
  const [state, setState] = useState(controller.value);
  useLayoutEffect(() => {
    const subscription = controller.subscribe((newValue) => {
      if (newValue === state) return;
      setState(newValue);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [state]);

  return state;
}

function useListenObjectRx<T extends Object, F extends Array<keyof T>>(
  controller: BehaviorSubject<T>,
  fields: F
): Pick<T, F[number]> {
  const getSplicedValue = (value: T) => {
    const data = { ...value };
    Object.keys(data).forEach((field) => {
      if (fields.includes(field as keyof T)) return;
      delete data[field as keyof T];
    });

    return data;
  };

  const initialState = getSplicedValue(controller.value);
  const [state, setState] = useState<Pick<T, F[number]>>(initialState);

  useEffect(() => {
    const subscription = controller.subscribe((newValue) => {
      let isChanged = false;

      fields.map((field) => {
        if (state[field] === newValue[field] || isChanged) return;
        isChanged = true;
      });

      if (!isChanged) return;

      const splicedNewValue = getSplicedValue(newValue);
      setState(splicedNewValue);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [state]);

  return state;
}

export { useListenRx, useListenObjectRx };

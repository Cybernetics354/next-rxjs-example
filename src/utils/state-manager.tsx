import { useRef } from "react";
import { BehaviorSubject } from "rxjs";

class StateManager<T> {
  readonly subject: BehaviorSubject<T>;

  constructor(subject: BehaviorSubject<T>) {
    this.subject = subject;
  }

  get state(): T {
    return this.subject.value;
  }

  hardSetState = (newState: T) => {
    this.subject.next(newState);
  };

  setState = (changedState: Partial<T>) => {
    this.subject.next({
      ...this.state,
      ...changedState,
    });
  };

  dispose = () => {
    this.subject.unsubscribe();
  };
}

function useStateManager<TController extends StateManager<any>>({
  initialState,
  build,
}: {
  initialState: TController["state"];
  build: (subject: BehaviorSubject<TController["state"]>) => TController;
}) {
  const subject = useRef(
    new BehaviorSubject<TController["state"]>(initialState)
  ).current;
  return build(subject);
}

export { StateManager, useStateManager };

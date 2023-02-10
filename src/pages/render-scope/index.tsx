import { useListenObjectRx } from "@/utils/hooks";
import React from "react";
import { BehaviorSubject } from "rxjs";

interface IRenderScope<
  TSubject extends BehaviorSubject<any>,
  TProps = Array<keyof TSubject["value"]>
> {
  subject: TSubject;
  properties: TProps;
  build: (state: TSubject["value"]) => JSX.Element;
}

export function RenderScope<IValue extends Object>(
  props: IRenderScope<BehaviorSubject<IValue>>
) {
  const { build, properties, subject } = props;
  useListenObjectRx(subject, properties);

  return <React.Fragment>{build(subject.value)}</React.Fragment>;
}

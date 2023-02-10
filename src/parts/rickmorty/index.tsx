import useRickMortyPart, { CRickMortyPart } from "./controller";
import { useEffect } from "react";
import { RenderScope } from "@/pages/render-scope";
import { BehaviorSubject, merge } from "rxjs";
import { useListenObjectRx } from "@/utils/hooks";

export default function RickMortyPart() {
  const controller = useRickMortyPart();
  const loadingSubject = new BehaviorSubject(false);

  const { subject } = controller;

  const newSubject = merge(loadingSubject, subject);

  useEffect(() => {
    controller.getCharacters();
  }, [controller]);

  return (
    <div>
      <RenderScope
        subject={subject}
        properties={["fetchStatus"]}
        build={(state) => {
          return <p>{state.fetchStatus}</p>;
        }}
      />
      <OtherComp />
      <button onClick={controller.getCharacters}>Refresh</button>
    </div>
  );
}

function FetchStatus({ controller }: { controller: CRickMortyPart }) {
  const { fetchStatus } = useListenObjectRx(controller.subject, [
    "fetchStatus",
  ]);

  return <p>{fetchStatus}</p>;
}

function OtherComp() {
  console.log("OtherComp :: Re-rendering");

  return <p>Other Comp</p>;
}

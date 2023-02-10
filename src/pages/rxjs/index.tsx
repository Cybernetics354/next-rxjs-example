import { useListenObjectRx } from "@/utils/hooks";
import { createContext, useContext, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";

interface IState {
  name: string;
  age: number;
}

const ControllerContext = createContext<BehaviorSubject<IState>>(
  {} as BehaviorSubject<IState>
);

export default function RxjsPage() {
  const controller = useRef(
    new BehaviorSubject<IState>({
      name: "Lorem",
      age: 20,
    })
  ).current;

  const [count, setCount] = useState(0);

  console.log("Rxjs Page :: Re-rendering");

  return (
    <ControllerContext.Provider value={controller}>
      <Name />
      <Age />
      <button
        onClick={() => {
          controller.next({
            ...controller.value,
            age: controller.value.age + 1,
          });
        }}
      >
        Increment Age
      </button>
      <div style={{ height: 40 }} />
      <UseStateComponent />
      <div style={{ height: 40 }} />
      <p>Counter : {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Use State</button>
    </ControllerContext.Provider>
  );
}

function Name() {
  const controller = useContext(ControllerContext);
  const { name } = useListenObjectRx(controller, ["name"]);

  console.log("NAME ::", "Re-rendering");

  return (
    <>
      <p>The name is {name}</p>
    </>
  );
}

function Age() {
  const controller = useContext(ControllerContext);
  const { age } = useListenObjectRx(controller, ["age"]);

  console.log("Age ::", "Re-rendering");
  return <p>The age is {age}</p>;
}

function UseStateComponent() {
  const [state, setState] = useState(0);

  console.log("UseStateComponent :: ", "Re-rendering");

  return (
    <div>
      <p>Use State Component : {state}</p>
      <button onClick={() => setState(state + 1)}>
        Use State Component Increment
      </button>
    </div>
  );
}

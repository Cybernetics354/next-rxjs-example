import { StateManager, useStateManager } from "@/utils/state-manager";
import { IRickMortyPart, createIRickMortyPart } from "./state";
import { BehaviorSubject } from "rxjs";
import axios, { AxiosInstance } from "axios";

export class CRickMortyPart extends StateManager<IRickMortyPart> {
  client: AxiosInstance;

  constructor(subject: BehaviorSubject<IRickMortyPart>) {
    super(subject);

    this.client = axios.create({
      baseURL: "https://rickandmortyapi.com/api",
    });
  }

  getCharacters = async () => {
    try {
      console.log("Fetching Characters...");
      this.setState({
        fetchStatus: "loading",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await this.client.get("/character");
      console.log(response);

      this.setState({
        fetchStatus: "success",
      });
    } catch (e) {
      this.setState({
        fetchStatus: "error",
      });
    }
  };
}

export default function useRickMortyPart(
  initialState?: Partial<CRickMortyPart["state"]>
) {
  return useStateManager<CRickMortyPart>({
    initialState: createIRickMortyPart(initialState),
    build: (props) => {
      return new CRickMortyPart(props);
    },
  });
}

export interface IRickMortyPart {
  fetchStatus: "iddle" | "loading" | "error" | "success";
}

export function createIRickMortyPart(
  data?: Partial<IRickMortyPart>
): IRickMortyPart {
  const { fetchStatus } = data || {};
  return {
    fetchStatus: fetchStatus || "iddle",
  };
}

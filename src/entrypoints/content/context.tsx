import createReactContextProvider from "@/lib/create-react-context-provider";

type Context = {
  showHoverBall: boolean;
  noteId: string | null;
  status: "pending" | "existing" | "new" | "error";
};

export const { Provider, useValue, useUpdater } =
  createReactContextProvider<Context>({
    showHoverBall: true,
    noteId: null,
    status: "pending",
  });

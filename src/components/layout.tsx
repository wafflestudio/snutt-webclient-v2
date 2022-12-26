import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return <div>{children}</div>;
};

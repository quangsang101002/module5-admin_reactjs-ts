import React, { ReactNode } from "react";
import "./GlobalStyles.scss";

function GlobalStyle({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default GlobalStyle;

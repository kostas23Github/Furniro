// The below code could be in the same directory with ProductsProvider but react recommends separating them & would throw this warning: 
// !"Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.eslint(react-refresh/only-export-components)".

import { createContext } from "react";

// Create the context that will store all fetched product data.
export const ProductsContext = createContext();
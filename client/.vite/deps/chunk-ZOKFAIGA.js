import {
  require_jsx_runtime
} from "./chunk-5LBV62MV.js";
import {
  require_react
} from "./chunk-DD3RW5QL.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@radix-ui/react-direction/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var DirectionContext = React.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

export {
  useDirection
};
//# sourceMappingURL=chunk-ZOKFAIGA.js.map

"use client";
import {
  Primitive
} from "./chunk-KCEZSDHL.js";
import "./chunk-NQGQTFAU.js";
import {
  require_jsx_runtime
} from "./chunk-5LBV62MV.js";
import "./chunk-DNO53US5.js";
import {
  require_react
} from "./chunk-DD3RW5QL.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@radix-ui/react-label/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var NAME = "Label";
var Label = React.forwardRef((props, forwardedRef) => {
  return (0, import_jsx_runtime.jsx)(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        props.onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label.displayName = NAME;
var Root = Label;
export {
  Label,
  Root
};
//# sourceMappingURL=@radix-ui_react-label.js.map

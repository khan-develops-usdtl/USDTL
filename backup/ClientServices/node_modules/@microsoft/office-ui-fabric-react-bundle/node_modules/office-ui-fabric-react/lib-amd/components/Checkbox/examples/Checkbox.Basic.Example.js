define(["require", "exports", "react", "office-ui-fabric-react/lib/Checkbox", "office-ui-fabric-react/lib/Stack"], function (require, exports, React, Checkbox_1, Stack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Used to add spacing between example checkboxes
    var stackTokens = { childrenGap: 10 };
    exports.CheckboxBasicExample = function () {
        // These checkboxes are uncontrolled because they don't set the `checked` prop.
        return (React.createElement(Stack_1.Stack, { tokens: stackTokens },
            React.createElement(Checkbox_1.Checkbox, { label: "Unchecked checkbox (uncontrolled)", onChange: _onChange }),
            React.createElement(Checkbox_1.Checkbox, { label: "Checked checkbox (uncontrolled)", defaultChecked: true, onChange: _onChange }),
            React.createElement(Checkbox_1.Checkbox, { label: "Disabled checkbox", disabled: true }),
            React.createElement(Checkbox_1.Checkbox, { label: "Disabled checked checkbox", disabled: true, defaultChecked: true })));
    };
    function _onChange(ev, isChecked) {
        console.log("The option has been changed to " + isChecked + ".");
    }
});
//# sourceMappingURL=Checkbox.Basic.Example.js.map
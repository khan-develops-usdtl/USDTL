define(["require", "exports", "react", "office-ui-fabric-react/lib/Button", "office-ui-fabric-react/lib/Panel", "office-ui-fabric-react/lib/TextField", "@uifabric/react-hooks"], function (require, exports, React, Button_1, Panel_1, TextField_1, react_hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var contentExplanation = 'Try typing something in this text field, closing the panel, and re-opening the panel. ' +
        " The text field's contents should still be here when the panel re-opens.";
    exports.PanelHiddenOnDismissExample = function () {
        var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
        var openPanel = react_hooks_1.useConstCallback(function () { return setIsOpen(true); });
        var dismissPanel = react_hooks_1.useConstCallback(function () { return setIsOpen(false); });
        return (React.createElement("div", null,
            "When dismissed, this panel will be hidden instead of destroyed. This is useful for cases in which the panel contains state which must be preserved across times that the panel is opened. ",
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(Button_1.DefaultButton, { text: "Open panel", onClick: openPanel }),
            React.createElement(Panel_1.Panel, { isOpen: isOpen, closeButtonAriaLabel: "Close", isHiddenOnDismiss: true, headerText: "Panel - Hidden on dismiss", onDismiss: dismissPanel },
                React.createElement("div", null,
                    contentExplanation,
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(TextField_1.TextField, { ariaLabel: contentExplanation })))));
    };
});
//# sourceMappingURL=Panel.HiddenOnDismiss.Example.js.map
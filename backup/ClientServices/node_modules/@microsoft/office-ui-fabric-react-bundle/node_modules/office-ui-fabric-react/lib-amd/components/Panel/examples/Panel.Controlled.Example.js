define(["require", "exports", "react", "office-ui-fabric-react/lib/Button", "office-ui-fabric-react/lib/Panel", "@uifabric/react-hooks"], function (require, exports, React, Button_1, Panel_1, react_hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelControlledExample = function () {
        var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
        var openPanel = react_hooks_1.useConstCallback(function () { return setIsOpen(true); });
        var dismissPanel = react_hooks_1.useConstCallback(function () { return setIsOpen(false); });
        return (React.createElement("div", null,
            "This panel can only be closed by clicking a button inside the panel content. (Don't use this behavior unless absolutely necessary.)",
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(Button_1.DefaultButton, { text: "Open panel", onClick: openPanel }),
            React.createElement(Panel_1.Panel
            // To entirely disable the default dismiss behavior:
            // 1. Don't provide an onDismiss prop
            , { 
                // To entirely disable the default dismiss behavior:
                // 1. Don't provide an onDismiss prop
                isOpen: isOpen, hasCloseButton: false, headerText: "Controlled panel" },
                React.createElement("p", null, "This panel can only be closed by clicking the button below."),
                React.createElement(Button_1.DefaultButton, { onClick: dismissPanel, text: "Close panel" }))));
    };
});
//# sourceMappingURL=Panel.Controlled.Example.js.map
define(["require", "exports", "tslib", "react", "office-ui-fabric-react"], function (require, exports, tslib_1, React, office_ui_fabric_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var exampleStyles = {
        example: [
            'ms-BasicButtonsExample',
            {
                selectors: {
                    '.ms-Button': {
                        margin: '10px 0'
                    }
                }
            }
        ]
    };
    var getClassNames = office_ui_fabric_react_1.classNamesFunction();
    var classNames = getClassNames(exampleStyles, {});
    var ButtonIconExample = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonIconExample, _super);
        function ButtonIconExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonIconExample.prototype.render = function () {
            var _a = this.props, disabled = _a.disabled, checked = _a.checked;
            return (React.createElement("div", { className: office_ui_fabric_react_1.css(classNames.example) },
                React.createElement(office_ui_fabric_react_1.IconButton, { disabled: disabled, checked: checked, iconProps: { iconName: 'Emoji2' }, title: "Emoji", ariaLabel: "Emoji" }),
                React.createElement("p", null,
                    "For a list of Icons, visit our ",
                    React.createElement("a", { href: "https://developer.microsoft.com/en-us/fabric#/styles/icons" }, "Icon documentation"),
                    ".")));
        };
        return ButtonIconExample;
    }(React.Component));
    exports.ButtonIconExample = ButtonIconExample;
});
//# sourceMappingURL=Button.Icon.Example.js.map
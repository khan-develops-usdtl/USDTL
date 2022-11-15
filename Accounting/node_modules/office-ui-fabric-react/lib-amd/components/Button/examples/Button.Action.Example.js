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
    var ButtonActionExample = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonActionExample, _super);
        function ButtonActionExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonActionExample.prototype.render = function () {
            var _a = this.props, disabled = _a.disabled, checked = _a.checked;
            return (React.createElement("div", { className: office_ui_fabric_react_1.css(classNames.example) },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "test", iconProps: { iconName: 'AddFriend' }, allowDisabledFocus: true, disabled: disabled, checked: checked }, "Create account")));
        };
        return ButtonActionExample;
    }(React.Component));
    exports.ButtonActionExample = ButtonActionExample;
});
//# sourceMappingURL=Button.Action.Example.js.map
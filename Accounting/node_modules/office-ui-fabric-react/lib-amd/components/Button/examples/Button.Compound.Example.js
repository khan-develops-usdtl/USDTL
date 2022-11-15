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
        ],
        twoup: [
            'ms-BasicButtonsTwoUp',
            {
                display: 'flex',
                selectors: {
                    '& > *': {
                        flexGrow: 1
                    },
                    '.ms-Label': {
                        marginBottom: '10px'
                    }
                }
            }
        ]
    };
    var getClassNames = office_ui_fabric_react_1.classNamesFunction();
    var classNames = getClassNames(exampleStyles, {});
    var ButtonCompoundExample = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonCompoundExample, _super);
        function ButtonCompoundExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonCompoundExample.prototype.render = function () {
            var _a = this.props, disabled = _a.disabled, checked = _a.checked;
            return (React.createElement("div", { className: office_ui_fabric_react_1.css(classNames.example, classNames.twoup) },
                React.createElement("div", null,
                    React.createElement(office_ui_fabric_react_1.Label, null, "Standard"),
                    React.createElement(office_ui_fabric_react_1.CompoundButton, { secondaryText: "You can create a new account here.", disabled: disabled, checked: checked }, "Create account")),
                React.createElement("div", null,
                    React.createElement(office_ui_fabric_react_1.Label, null, "Primary"),
                    React.createElement(office_ui_fabric_react_1.CompoundButton, { primary: true, secondaryText: "You can create a new account here.", disabled: disabled, checked: checked }, "Create account"))));
        };
        return ButtonCompoundExample;
    }(React.Component));
    exports.ButtonCompoundExample = ButtonCompoundExample;
});
//# sourceMappingURL=Button.Compound.Example.js.map
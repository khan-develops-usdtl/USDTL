"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var exampleStyles = {
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
var ButtonCommandExample = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonCommandExample, _super);
    function ButtonCommandExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonCommandExample.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, checked = _a.checked;
        return (React.createElement("div", { className: office_ui_fabric_react_1.css(classNames.twoup) },
            React.createElement("div", null,
                React.createElement(office_ui_fabric_react_1.Label, null, "CommandButton that focuses on menu"),
                React.createElement(office_ui_fabric_react_1.CommandButton, { "data-automation-id": "test", disabled: disabled, checked: checked, iconProps: { iconName: 'Add' }, text: "Create account", menuProps: {
                        items: [
                            {
                                key: 'emailMessage',
                                text: 'Email message',
                                iconProps: { iconName: 'Mail' }
                            },
                            {
                                key: 'calendarEvent',
                                text: 'Calendar event',
                                iconProps: { iconName: 'Calendar' }
                            }
                        ]
                    } })),
            React.createElement("div", null,
                React.createElement(office_ui_fabric_react_1.Label, null, "CommandButton that doesn't focus on menu"),
                React.createElement(office_ui_fabric_react_1.CommandButton, { "data-automation-id": "test", disabled: disabled, checked: checked, iconProps: { iconName: 'Add' }, text: "Create account", menuProps: {
                        shouldFocusOnMount: false,
                        items: [
                            {
                                key: 'emailMessage',
                                text: 'Email message',
                                iconProps: { iconName: 'Mail' }
                            },
                            {
                                key: 'calendarEvent',
                                text: 'Calendar event',
                                iconProps: { iconName: 'Calendar' }
                            }
                        ]
                    } }))));
    };
    return ButtonCommandExample;
}(React.Component));
exports.ButtonCommandExample = ButtonCommandExample;
//# sourceMappingURL=Button.Command.Example.js.map
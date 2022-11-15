define(["require", "exports", "tslib", "react", "office-ui-fabric-react"], function (require, exports, tslib_1, React, office_ui_fabric_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var ButtonContextualMenuExample = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonContextualMenuExample, _super);
        function ButtonContextualMenuExample() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._getMenu = function (menuProps) {
                // Customize contextual menu with menuAs
                return React.createElement(office_ui_fabric_react_1.ContextualMenu, tslib_1.__assign({}, menuProps));
            };
            return _this;
        }
        ButtonContextualMenuExample.prototype.render = function () {
            var _a = this.props, disabled = _a.disabled, checked = _a.checked;
            return (React.createElement("div", { className: office_ui_fabric_react_1.css(classNames.twoup) },
                React.createElement("div", null,
                    React.createElement(office_ui_fabric_react_1.Label, null, "Non persisted menu"),
                    React.createElement(office_ui_fabric_react_1.DefaultButton, { "data-automation-id": "test", disabled: disabled, allowDisabledFocus: true, checked: checked, iconProps: { iconName: 'Add' }, menuAs: this._getMenu, text: "New", 
                        // tslint:disable-next-line:jsx-no-lambda
                        onMenuClick: function (ev) {
                            console.log(ev);
                        }, menuProps: {
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
                            ],
                            directionalHintFixed: true
                        } })),
                React.createElement("div", null,
                    React.createElement(office_ui_fabric_react_1.Label, null, "Persisted menu"),
                    React.createElement(office_ui_fabric_react_1.DefaultButton, { "data-automation-id": "test", disabled: disabled, allowDisabledFocus: true, checked: checked, persistMenu: true, iconProps: { iconName: 'Add' }, menuAs: this._getMenu, text: "New", 
                        // tslint:disable-next-line:jsx-no-lambda
                        onMenuClick: function (ev) {
                            console.log(ev);
                        }, menuProps: {
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
                            ],
                            directionalHintFixed: true
                        } }))));
        };
        return ButtonContextualMenuExample;
    }(React.Component));
    exports.ButtonContextualMenuExample = ButtonContextualMenuExample;
});
//# sourceMappingURL=Button.ContextualMenu.Example.js.map
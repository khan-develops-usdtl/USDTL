"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var VerticalStackSpacingExample = /** @class */ (function (_super) {
    tslib_1.__extends(VerticalStackSpacingExample, _super);
    function VerticalStackSpacingExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalStackSpacingExample.prototype.render = function () {
        var styles = office_ui_fabric_react_1.mergeStyleSets({
            root: {
                background: office_ui_fabric_react_1.DefaultPalette.themeTertiary
            },
            item: {
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: office_ui_fabric_react_1.DefaultPalette.themePrimary,
                color: office_ui_fabric_react_1.DefaultPalette.white
            }
        });
        var tokens = {
            sectionStack: {
                childrenGap: 50
            },
            numericalSpacing: {
                childrenGap: 10
            },
            customSpacing: {
                childrenGap: '20%'
            },
            themedExtraSmall: {
                childrenGap: 's2'
            },
            themedSmall: {
                childrenGap: 's1'
            },
            themedMedium: {
                childrenGap: 'm'
            },
            themedLarge: {
                childrenGap: 'l1'
            },
            themedExtraLarge: {
                childrenGap: 'l2'
            }
        };
        return (React.createElement(office_ui_fabric_react_1.Stack, { tokens: tokens.numericalSpacing },
            React.createElement(office_ui_fabric_react_1.Stack, { horizontal: true, disableShrink: true, tokens: tokens.sectionStack },
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Numerical spacing"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.numericalSpacing, padding: 10 },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3"))),
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Custom spacing"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.customSpacing, padding: "m 40px" },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3")))),
            React.createElement(office_ui_fabric_react_1.Stack, { horizontal: true, disableShrink: true, horizontalAlign: "space-between" },
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Themed spacing (extra small)"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.themedExtraSmall, padding: "s2" },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3"))),
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Themed spacing (small)"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.themedSmall, padding: "s2" },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3"))),
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Themed spacing (medium)"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.themedMedium, padding: "m" },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3"))),
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Themed spacing (large)"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.themedLarge, padding: "l1" },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3"))),
                React.createElement(office_ui_fabric_react_1.Stack, null,
                    React.createElement("span", null, "Themed spacing (extra large)"),
                    React.createElement(office_ui_fabric_react_1.Stack, { className: styles.root, tokens: tokens.themedExtraLarge, padding: "l2" },
                        React.createElement("span", { className: styles.item }, "1"),
                        React.createElement("span", { className: styles.item }, "2"),
                        React.createElement("span", { className: styles.item }, "3"))))));
    };
    return VerticalStackSpacingExample;
}(React.Component));
exports.VerticalStackSpacingExample = VerticalStackSpacingExample;
//# sourceMappingURL=Stack.Vertical.Spacing.Example.js.map
define(["require", "exports", "tslib", "react", "office-ui-fabric-react"], function (require, exports, tslib_1, React, office_ui_fabric_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VerticalStackGrowExample = /** @class */ (function (_super) {
        tslib_1.__extends(VerticalStackGrowExample, _super);
        function VerticalStackGrowExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VerticalStackGrowExample.prototype.render = function () {
            var styles = office_ui_fabric_react_1.mergeStyleSets({
                root: {
                    background: office_ui_fabric_react_1.DefaultPalette.themeTertiary,
                    height: 250
                },
                item: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: office_ui_fabric_react_1.DefaultPalette.themePrimary,
                    color: office_ui_fabric_react_1.DefaultPalette.white
                }
            });
            var stackTokens = { childrenGap: 5 };
            return (React.createElement(office_ui_fabric_react_1.Stack, { tokens: stackTokens },
                React.createElement(office_ui_fabric_react_1.Stack, { tokens: stackTokens, padding: 10, className: styles.root },
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: 3, className: styles.item }, "Grow is 3"),
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: 2, className: styles.item }, "Grow is 2"),
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "Grow is 1"))));
        };
        return VerticalStackGrowExample;
    }(React.Component));
    exports.VerticalStackGrowExample = VerticalStackGrowExample;
});
//# sourceMappingURL=Stack.Vertical.Grow.Example.js.map
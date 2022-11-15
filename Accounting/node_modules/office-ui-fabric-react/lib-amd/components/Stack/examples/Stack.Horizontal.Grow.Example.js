define(["require", "exports", "tslib", "react", "office-ui-fabric-react"], function (require, exports, tslib_1, React, office_ui_fabric_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HorizontalStackGrowExample = /** @class */ (function (_super) {
        tslib_1.__extends(HorizontalStackGrowExample, _super);
        function HorizontalStackGrowExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HorizontalStackGrowExample.prototype.render = function () {
            var styles = office_ui_fabric_react_1.mergeStyleSets({
                root: {
                    background: office_ui_fabric_react_1.DefaultPalette.themeTertiary
                },
                item: {
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: office_ui_fabric_react_1.DefaultPalette.white,
                    background: office_ui_fabric_react_1.DefaultPalette.themePrimary
                }
            });
            var stackTokens = { childrenGap: 5 };
            return (React.createElement(office_ui_fabric_react_1.Stack, { horizontal: true, tokens: stackTokens, padding: 10, className: styles.root },
                React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: 3, className: styles.item }, "Grow is 3"),
                React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: 2, className: styles.item }, "Grow is 2"),
                React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "Grow is 1")));
        };
        return HorizontalStackGrowExample;
    }(React.Component));
    exports.HorizontalStackGrowExample = HorizontalStackGrowExample;
});
//# sourceMappingURL=Stack.Horizontal.Grow.Example.js.map
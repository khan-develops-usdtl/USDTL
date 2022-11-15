define(["require", "exports", "tslib", "react", "office-ui-fabric-react"], function (require, exports, tslib_1, React, office_ui_fabric_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HorizontalStackShrinkExample = /** @class */ (function (_super) {
        tslib_1.__extends(HorizontalStackShrinkExample, _super);
        function HorizontalStackShrinkExample(props) {
            var _this = _super.call(this, props) || this;
            _this._onWidthChange = function (value) {
                _this.setState({ stackWidth: value });
            };
            _this.state = {
                stackWidth: 100
            };
            return _this;
        }
        HorizontalStackShrinkExample.prototype.render = function () {
            var styles = office_ui_fabric_react_1.mergeStyleSets({
                root: {
                    background: office_ui_fabric_react_1.DefaultPalette.themeTertiary,
                    width: this.state.stackWidth + "%",
                    overflow: 'hidden'
                },
                item: {
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: office_ui_fabric_react_1.DefaultPalette.white,
                    background: office_ui_fabric_react_1.DefaultPalette.themePrimary,
                    overflow: 'hidden'
                }
            });
            var stackTokens = { childrenGap: 5 };
            return (React.createElement(office_ui_fabric_react_1.Stack, { tokens: stackTokens },
                React.createElement(office_ui_fabric_react_1.Slider, { label: "Change the stack width to see how child items shrink:", min: 1, max: 100, step: 1, defaultValue: 100, showValue: true, onChange: this._onWidthChange }),
                React.createElement(office_ui_fabric_react_1.Stack, { horizontal: true, tokens: stackTokens, padding: 10, className: styles.root },
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "I shrink"),
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "I shrink"),
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, disableShrink: true, className: styles.item, styles: { root: { width: 500 } } }, "I don't shrink"),
                    React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "I shrink"))));
        };
        return HorizontalStackShrinkExample;
    }(React.Component));
    exports.HorizontalStackShrinkExample = HorizontalStackShrinkExample;
});
//# sourceMappingURL=Stack.Horizontal.Shrink.Example.js.map
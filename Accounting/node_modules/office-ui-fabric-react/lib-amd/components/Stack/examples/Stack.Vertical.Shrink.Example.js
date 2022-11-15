define(["require", "exports", "tslib", "react", "office-ui-fabric-react"], function (require, exports, tslib_1, React, office_ui_fabric_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VerticalStackShrinkExample = /** @class */ (function (_super) {
        tslib_1.__extends(VerticalStackShrinkExample, _super);
        function VerticalStackShrinkExample(props) {
            var _this = _super.call(this, props) || this;
            _this._onHeightChange = function (value) {
                _this.setState({ stackHeight: value });
            };
            _this.state = {
                stackHeight: 100
            };
            return _this;
        }
        VerticalStackShrinkExample.prototype.render = function () {
            var styles = office_ui_fabric_react_1.mergeStyleSets({
                root: {
                    background: office_ui_fabric_react_1.DefaultPalette.themeTertiary,
                    height: this.state.stackHeight + "%",
                    overflow: 'hidden'
                },
                item: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: office_ui_fabric_react_1.DefaultPalette.themePrimary,
                    color: office_ui_fabric_react_1.DefaultPalette.white,
                    overflow: 'hidden'
                },
                container: {
                    height: 200
                }
            });
            var stackTokens = { childrenGap: 5 };
            return (React.createElement(office_ui_fabric_react_1.Stack, { tokens: stackTokens },
                React.createElement(office_ui_fabric_react_1.Slider, { label: "Change the stack height to see how child items shrink:", min: 1, max: 100, step: 1, defaultValue: 100, showValue: true, onChange: this._onHeightChange }),
                React.createElement("div", { className: styles.container },
                    React.createElement(office_ui_fabric_react_1.Stack, { tokens: stackTokens, padding: 10, className: styles.root },
                        React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "I shrink"),
                        React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "I shrink"),
                        React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, disableShrink: true, className: styles.item, styles: { root: { height: 50 } } }, "I don't shrink"),
                        React.createElement(office_ui_fabric_react_1.Stack.Item, { grow: true, className: styles.item }, "I shrink")))));
        };
        return VerticalStackShrinkExample;
    }(React.Component));
    exports.VerticalStackShrinkExample = VerticalStackShrinkExample;
});
//# sourceMappingURL=Stack.Vertical.Shrink.Example.js.map
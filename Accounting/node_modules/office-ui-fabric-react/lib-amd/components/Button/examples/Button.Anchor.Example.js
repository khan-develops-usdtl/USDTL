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
    var ButtonAnchorExample = /** @class */ (function (_super) {
        tslib_1.__extends(ButtonAnchorExample, _super);
        function ButtonAnchorExample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ButtonAnchorExample.prototype.render = function () {
            var _a = this.props, disabled = _a.disabled, checked = _a.checked;
            return (React.createElement("div", { className: office_ui_fabric_react_1.css(classNames.example) },
                React.createElement(office_ui_fabric_react_1.DefaultButton, { "data-automation-id": "test", disabled: disabled, checked: checked, href: "http://bing.com", target: "_blank", title: "let us bing!" }, "Bing")));
        };
        return ButtonAnchorExample;
    }(React.Component));
    exports.ButtonAnchorExample = ButtonAnchorExample;
});
//# sourceMappingURL=Button.Anchor.Example.js.map
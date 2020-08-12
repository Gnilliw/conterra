define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/core/watchUtils", "esri/widgets/support/widget"], function (require, exports, tslib_1, decorators_1, Widget, watchUtils, widget_1) {
    "use strict";
    var CSS = {
        base: "coordWidget-tool"
    };
    var CoordWidget = /** @class */ (function (_super) {
        tslib_1.__extends(CoordWidget, _super);
        function CoordWidget(params) {
            var _this = _super.call(this, params) || this;
            _this._onViewChange = _this._onViewChange.bind(_this);
            return _this;
        }
        CoordWidget.prototype.postInitialize = function () {
            var _this = this;
            watchUtils.init(this, "view.center, view.interacting", function () { return _this._onViewChange(); });
        };
        //-------------------------------------------------------------------
        //
        //  Public methods
        //
        //-------------------------------------------------------------------
        CoordWidget.prototype.render = function () {
            var _a = this.state, x = _a.x, y = _a.y;
            return (widget_1.tsx("div", { bind: this, class: CSS.base },
                widget_1.tsx("p", null,
                    "Longitude: ",
                    Number(x).toFixed(3)),
                widget_1.tsx("p", null,
                    "Latitude: ",
                    Number(y).toFixed(3))));
        };
        //-------------------------------------------------------------------
        //
        //  Private methods
        //
        //-------------------------------------------------------------------
        CoordWidget.prototype._onViewChange = function () {
            var _a = this.view, interacting = _a.interacting, center = _a.center;
            this.state = {
                x: center.x,
                y: center.y,
                interacting: interacting
            };
        };
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], CoordWidget.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], CoordWidget.prototype, "initialCenter", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], CoordWidget.prototype, "state", void 0);
        CoordWidget = tslib_1.__decorate([
            decorators_1.subclass("esri.widgets.CoordWidget")
        ], CoordWidget);
        return CoordWidget;
    }(Widget));
    return CoordWidget;
});
//# sourceMappingURL=CoordWidget.js.map
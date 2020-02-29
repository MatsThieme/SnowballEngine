var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Vector2 } from '../Vector2.js';
import { Component } from './Component.js';
import { ComponentType } from './ComponentType.js';
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform(gameObject) {
        var _this = _super.call(this, gameObject, ComponentType.Transform) || this;
        _this.position = new Vector2();
        _this.rotation = new Vector2();
        _this.scale = new Vector2();
        return _this;
    }
    return Transform;
}(Component));
export { Transform };

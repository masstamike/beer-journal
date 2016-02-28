/**
 * Created by masstamike on 2/24/16.
 */
var Point = function (x, y) {
    this.x = x;
    this.y = y;
}

var Circle = function (point, r) {
    this.point = point;
    this.r = r;
}

var Radial = function (circle, radian) {
    this.x1 = circle.point.x;
    this.y1 = circle.point.y;
    this.x2 = Math.cos(radian) * circle.r + this.x1;
    this.y2 = Math.sin(radian) * circle.r + this.y1;
}
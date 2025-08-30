"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsCard = StatsCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var iconMap = {
    building: lucide_react_1.Building2,
    users: lucide_react_1.Users,
    check: lucide_react_1.CheckCircle2,
    certificate: lucide_react_1.Award
};
var colorClassMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    gray: 'text-gray-600'
};
function StatsCard(_a) {
    var _b, _c;
    var title = _a.title, value = _a.value, _d = _a.icon, icon = _d === void 0 ? 'check' : _d, _e = _a.color, color = _e === void 0 ? 'gray' : _e, className = _a.className;
    var IconComponent = (_b = iconMap[icon]) !== null && _b !== void 0 ? _b : lucide_react_1.CheckCircle2;
    var iconColorClass = (_c = colorClassMap[color]) !== null && _c !== void 0 ? _c : colorClassMap.gray;
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: (0, utils_1.cn)('h-full', className), children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-2xl font-bold text-foreground", children: value })] }), (0, jsx_runtime_1.jsx)(IconComponent, { className: (0, utils_1.cn)('h-10 w-10', iconColorClass) })] }) }));
}

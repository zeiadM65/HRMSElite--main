"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolesWithAccess = exports.getItemInfo = exports.getItemPath = exports.getAllAvailableItems = exports.hasAccessToItem = exports.getAdvancedFeatures = exports.getMenuItems = exports.roleNavigationMap = void 0;
var lucide_react_1 = require("lucide-react");
var routes_1 = require("./routes");
var roles_1 = require("./roles");
// خريطة الأدوار والروابط
exports.roleNavigationMap = {
    'super_admin': {
        'menuItems': [
            {
                'id': 'dashboard',
                'label': 'لوحة التحكم',
                'icon': lucide_react_1.Home,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.dashboard.super_admin
            },
            {
                'id': 'companies',
                'label': 'إدارة الشركات',
                'icon': lucide_react_1.Users,
                'section': 'main',
                'roles': ['super_admin'],
                'path': routes_1.routes.functional.companies
            },
            {
                'id': 'employees',
                'label': 'إدارة الموظفين',
                'icon': lucide_react_1.Users,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.employees
            },
            {
                'id': 'reports',
                'label': 'التقارير',
                'icon': lucide_react_1.BarChart3,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.reports
            },
            {
                'id': 'ai-dashboard',
                'label': 'لوحة التحكم الذكية',
                'icon': lucide_react_1.Bot,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.ai_dashboard
            },
            {
                'id': 'settings',
                'label': 'إعدادات النظام',
                'icon': lucide_react_1.Settings,
                'section': 'settings',
                'roles': ['super_admin'],
                'path': routes_1.routes.functional.settings
            }
        ],
        'advancedFeatures': [
            {
                'id': 'ai-assistant',
                'label': 'المساعد الذكي',
                'icon': lucide_react_1.Bot,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'ai-analytics',
                'label': 'تحليلات الذكاء الاصطناعي',
                'icon': lucide_react_1.BarChart3,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'bi-dashboard',
                'label': 'لوحة التحليلات',
                'icon': lucide_react_1.BarChart3,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'workflow-builder',
                'label': 'منشئ سير العمل',
                'icon': lucide_react_1.Workflow,
                'roles': ['company_manager', 'employee']
            },
            {
                'id': 'learning-management',
                'label': 'إدارة التعلم',
                'icon': lucide_react_1.GraduationCap,
                'roles': ['company_manager', 'employee']
            },
            {
                'id': 'mobile-app',
                'label': 'التطبيق المحمول',
                'icon': lucide_react_1.Smartphone,
                'roles': ['worker', 'supervisor', 'employee', 'company_manager']
            },
            {
                'id': 'employee-360',
                'label': 'عرض الموظف 360°',
                'icon': lucide_react_1.Eye,
                'roles': ['company_manager', 'employee']
            }
        ]
    },
    'company_manager': {
        'menuItems': [
            {
                'id': 'dashboard',
                'label': 'لوحة التحكم',
                'icon': lucide_react_1.Home,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.dashboard.company_manager
            },
            {
                'id': 'employees',
                'label': 'إدارة الموظفين',
                'icon': lucide_react_1.Users,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.employees
            },
            {
                'id': 'licenses',
                'label': 'التراخيص',
                'icon': lucide_react_1.FileText,
                'section': 'main',
                'roles': ['company_manager', 'employee'],
                'path': routes_1.routes.functional.government_forms
            },
            {
                'id': 'leaves',
                'label': 'الإجازات',
                'icon': lucide_react_1.Calendar,
                'section': 'main',
                'roles': ['company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.functional.leave_requests
            },
            {
                'id': 'payroll',
                'label': 'المرتبات',
                'icon': lucide_react_1.DollarSign,
                'section': 'main',
                'roles': ['company_manager', 'employee'],
                'path': routes_1.routes.functional.payroll
            },
            {
                'id': 'reports',
                'label': 'التقارير',
                'icon': lucide_react_1.BarChart3,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.reports
            },
            {
                'id': 'company-settings',
                'label': 'إعدادات الشركة',
                'icon': lucide_react_1.Settings,
                'section': 'settings',
                'roles': ['company_manager'],
                'path': routes_1.routes.functional.settings
            },
            {
                'id': 'permissions',
                'label': 'الصلاحيات',
                'icon': lucide_react_1.Shield,
                'section': 'settings',
                'roles': ['company_manager'],
                'path': routes_1.routes.advanced.permissions_management
            }
        ],
        'advancedFeatures': [
            {
                'id': 'ai-assistant',
                'label': 'المساعد الذكي',
                'icon': lucide_react_1.Bot,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'ai-analytics',
                'label': 'تحليلات الذكاء الاصطناعي',
                'icon': lucide_react_1.BarChart3,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'bi-dashboard',
                'label': 'لوحة التحليلات',
                'icon': lucide_react_1.BarChart3,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'workflow-builder',
                'label': 'منشئ سير العمل',
                'icon': lucide_react_1.Workflow,
                'roles': ['company_manager', 'employee']
            },
            {
                'id': 'learning-management',
                'label': 'إدارة التعلم',
                'icon': lucide_react_1.GraduationCap,
                'roles': ['company_manager', 'employee']
            },
            {
                'id': 'financial-management',
                'label': 'الإدارة المالية',
                'icon': lucide_react_1.DollarSign,
                'roles': ['company_manager']
            },
            {
                'id': 'mobile-app',
                'label': 'التطبيق المحمول',
                'icon': lucide_react_1.Smartphone,
                'roles': ['worker', 'supervisor', 'employee', 'company_manager']
            },
            {
                'id': 'employee-360',
                'label': 'عرض الموظف 360°',
                'icon': lucide_react_1.Eye,
                'roles': ['company_manager', 'employee']
            }
        ]
    },
    'employee': {
        'menuItems': [
            {
                'id': 'dashboard',
                'label': 'لوحة التحكم',
                'icon': lucide_react_1.Home,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.dashboard.employee
            },
            {
                'id': 'employees',
                'label': 'إدارة الموظفين',
                'icon': lucide_react_1.Users,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.employees
            },
            {
                'id': 'leaves',
                'label': 'الإجازات',
                'icon': lucide_react_1.Calendar,
                'section': 'main',
                'roles': ['company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.functional.leave_requests
            },
            {
                'id': 'reports',
                'label': 'التقارير',
                'icon': lucide_react_1.BarChart3,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee'],
                'path': routes_1.routes.functional.reports
            },
            {
                'id': 'documents',
                'label': 'المستندات',
                'icon': lucide_react_1.FileText,
                'section': 'main',
                'roles': ['employee', 'company_manager'],
                'path': routes_1.routes.functional.documents
            }
        ],
        'advancedFeatures': [
            {
                'id': 'ai-assistant',
                'label': 'المساعد الذكي',
                'icon': lucide_react_1.Bot,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'ai-analytics',
                'label': 'تحليلات الذكاء الاصطناعي',
                'icon': lucide_react_1.BarChart3,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'bi-dashboard',
                'label': 'لوحة التحليلات',
                'icon': lucide_react_1.BarChart3,
                'roles': ['super_admin', 'company_manager', 'employee']
            },
            {
                'id': 'workflow-builder',
                'label': 'منشئ سير العمل',
                'icon': lucide_react_1.Workflow,
                'roles': ['company_manager', 'employee']
            },
            {
                'id': 'learning-management',
                'label': 'إدارة التعلم',
                'icon': lucide_react_1.GraduationCap,
                'roles': ['company_manager', 'employee']
            },
            {
                'id': 'mobile-app',
                'label': 'التطبيق المحمول',
                'icon': lucide_react_1.Smartphone,
                'roles': ['worker', 'supervisor', 'employee', 'company_manager']
            },
            {
                'id': 'employee-360',
                'label': 'عرض الموظف 360°',
                'icon': lucide_react_1.Eye,
                'roles': ['company_manager', 'employee']
            }
        ]
    },
    'supervisor': {
        'menuItems': [
            {
                'id': 'dashboard',
                'label': 'لوحة التحكم',
                'icon': lucide_react_1.Home,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.dashboard.supervisor
            },
            {
                'id': 'employees',
                'label': 'إدارة الفريق',
                'icon': lucide_react_1.Users,
                'section': 'main',
                'roles': ['supervisor'],
                'path': routes_1.routes.functional.employees
            },
            {
                'id': 'leaves',
                'label': 'الإجازات',
                'icon': lucide_react_1.Calendar,
                'section': 'main',
                'roles': ['company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.functional.leave_requests
            },
            {
                'id': 'attendance',
                'label': 'الحضور',
                'icon': lucide_react_1.Clock,
                'section': 'main',
                'roles': ['supervisor', 'company_manager'],
                'path': routes_1.routes.functional.attendance
            }
        ],
        'advancedFeatures': [
            {
                'id': 'mobile-app',
                'label': 'التطبيق المحمول',
                'icon': lucide_react_1.Smartphone,
                'roles': ['worker', 'supervisor', 'employee', 'company_manager']
            }
        ]
    },
    'worker': {
        'menuItems': [
            {
                'id': 'dashboard',
                'label': 'لوحة التحكم',
                'icon': lucide_react_1.Home,
                'section': 'main',
                'roles': ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.dashboard.worker
            },
            {
                'id': 'profile',
                'label': 'ملفي الشخصي',
                'icon': lucide_react_1.UserCheck,
                'section': 'main',
                'roles': ['worker', 'supervisor', 'employee'],
                'path': routes_1.routes.functional.settings
            },
            {
                'id': 'leaves',
                'label': 'الإجازات',
                'icon': lucide_react_1.Calendar,
                'section': 'main',
                'roles': ['company_manager', 'employee', 'supervisor', 'worker'],
                'path': routes_1.routes.functional.leave_requests
            },
            {
                'id': 'attendance',
                'label': 'الحضور',
                'icon': lucide_react_1.Clock,
                'section': 'main',
                'roles': ['worker', 'supervisor', 'company_manager'],
                'path': routes_1.routes.functional.attendance
            }
        ],
        'advancedFeatures': [
            {
                'id': 'mobile-app',
                'label': 'التطبيق المحمول',
                'icon': lucide_react_1.Smartphone,
                'roles': ['worker', 'supervisor', 'employee', 'company_manager']
            }
        ]
    }
};
// دالة للحصول على عناصر القائمة حسب الدور
var getMenuItems = function (role) {
    var roleConfig = exports.roleNavigationMap[role];
    if (!roleConfig) {
        return exports.roleNavigationMap.worker.menuItems;
    }
    return roleConfig.menuItems.filter(function (item) { return (0, roles_1.canAccessPage)(role, item.id); });
};
exports.getMenuItems = getMenuItems;
// دالة للحصول على الميزات المتقدمة حسب الدور
var getAdvancedFeatures = function (role) {
    var roleConfig = exports.roleNavigationMap[role];
    if (!roleConfig) {
        return exports.roleNavigationMap.worker.advancedFeatures;
    }
    return roleConfig.advancedFeatures.filter(function (feature) { return (0, roles_1.canAccessPage)(role, feature.id); });
};
exports.getAdvancedFeatures = getAdvancedFeatures;
// دالة للتحقق من صلاحية الوصول لعنصر معين
var hasAccessToItem = function (itemId, role) {
    return (0, roles_1.canAccessPage)(role, itemId);
};
exports.hasAccessToItem = hasAccessToItem;
// دالة للحصول على جميع العناصر المتاحة لدور معين
var getAllAvailableItems = function (role) {
    var menuItems = (0, exports.getMenuItems)(role);
    var advancedFeatures = (0, exports.getAdvancedFeatures)(role);
    return __spreadArray(__spreadArray([], menuItems, true), advancedFeatures, true);
};
exports.getAllAvailableItems = getAllAvailableItems;
// دالة للحصول على مسار العنصر
var getItemPath = function (itemId, role, companyId, companyName) {
    switch (itemId) {
        case 'dashboard':
            return (0, routes_1.getDashboardRouteWithCompany)(role, companyId, companyName);
        case 'companies':
            return routes_1.routes.functional.companies;
        case 'employees':
            return "".concat(routes_1.routes.functional.employees).concat(companyId ? "?company=".concat(companyId) : '');
        case 'reports':
            return "".concat(routes_1.routes.functional.reports).concat(companyId ? "?company=".concat(companyId) : '');
        case 'settings':
            return "".concat(routes_1.routes.functional.settings).concat(companyId ? "?company=".concat(companyId) : '');
        case 'company-settings':
            return "".concat(routes_1.routes.functional.settings).concat(companyId ? "?company=".concat(companyId, "&tab=company") : '');
        case 'permissions':
            return "".concat(routes_1.routes.advanced.permissions_management).concat(companyId ? "?company=".concat(companyId) : '');
        case 'licenses':
            return "".concat(routes_1.routes.functional.government_forms).concat(companyId ? "?company=".concat(companyId, "&tab=licenses") : '');
        case 'leaves':
            return "".concat(routes_1.routes.functional.leave_requests).concat(companyId ? "?company=".concat(companyId) : '');
        case 'payroll':
            return "".concat(routes_1.routes.functional.payroll).concat(companyId ? "?company=".concat(companyId) : '');
        case 'documents':
            return "".concat(routes_1.routes.functional.documents).concat(companyId ? "?company=".concat(companyId) : '');
        case 'attendance':
            return "".concat(routes_1.routes.functional.attendance).concat(companyId ? "?company=".concat(companyId) : '');
        case 'profile':
            return "".concat(routes_1.routes.functional.settings).concat(companyId ? "?company=".concat(companyId, "&tab=profile") : '');
        case 'ai-analytics':
            return routes_1.routes.advanced.ai_analytics;
        default:
            return '/';
    }
};
exports.getItemPath = getItemPath;
// دالة للحصول على معلومات العنصر
var getItemInfo = function (itemId, role) {
    var menuItems = (0, exports.getMenuItems)(role);
    var advancedFeatures = (0, exports.getAdvancedFeatures)(role);
    var menuItem = menuItems.find(function (item) { return item.id === itemId; });
    if (menuItem) {
        return menuItem;
    }
    var advancedFeature = advancedFeatures.find(function (feature) { return feature.id === itemId; });
    return advancedFeature !== null && advancedFeature !== void 0 ? advancedFeature : null;
};
exports.getItemInfo = getItemInfo;
// دالة للحصول على الأدوار التي يمكنها الوصول لعنصر معين
var getRolesWithAccess = function (itemId) {
    var allRoles = Object.keys(exports.roleNavigationMap);
    var rolesWithAccess = [];
    allRoles.forEach(function (role) {
        if ((0, exports.hasAccessToItem)(itemId, role)) {
            rolesWithAccess.push(role);
        }
    });
    return rolesWithAccess;
};
exports.getRolesWithAccess = getRolesWithAccess;

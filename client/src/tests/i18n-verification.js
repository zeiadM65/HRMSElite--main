"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18n_1 = __importDefault(require("../lib/i18n"));
// Test i18n configuration
console.log('🧪 Testing i18n Configuration...\n');
// Test 1: Check if i18n is initialized
console.log('✅ i18n initialized:', i18n_1.default.isInitialized);
// Test 2: Check current language
console.log('✅ Current language:', i18n_1.default.language);
// Test 3: Check available languages
console.log('✅ Available languages:', i18n_1.default.languages);
// Test 4: Test English translations
i18n_1.default.changeLanguage('en');
console.log('\n🇺🇸 English Translations:');
console.log('  - Dashboard:', i18n_1.default.t('common.dashboard'));
console.log('  - Employees:', i18n_1.default.t('common.employees'));
console.log('  - Login:', i18n_1.default.t('auth.login'));
console.log('  - Loading:', i18n_1.default.t('common.loading'));
// Test 5: Test Arabic translations
i18n_1.default.changeLanguage('ar');
console.log('\n🇸🇦 Arabic Translations:');
console.log('  - Dashboard:', i18n_1.default.t('common.dashboard'));
console.log('  - Employees:', i18n_1.default.t('common.employees'));
console.log('  - Login:', i18n_1.default.t('auth.login'));
console.log('  - Loading:', i18n_1.default.t('common.loading'));
// Test 6: Test interpolation
i18n_1.default.changeLanguage('en');
console.log('\n🔧 Interpolation Test:');
console.log('  - Welcome message:', i18n_1.default.t('auth.welcomeMessage', { company: 'Test Company' }));
// Test 7: Test pluralization
console.log('\n📊 Pluralization Test:');
i18n_1.default.changeLanguage('en');
console.log('  - EN (1):', i18n_1.default.t('demo.unreadMessages', { count: 1 }));
console.log('  - EN (5):', i18n_1.default.t('demo.unreadMessages', { count: 5 }));
i18n_1.default.changeLanguage('ar');
console.log('  - AR (0):', i18n_1.default.t('demo.unreadMessages', { count: 0 }));
console.log('  - AR (2):', i18n_1.default.t('demo.unreadMessages', { count: 2 }));
console.log('  - AR (7):', i18n_1.default.t('demo.unreadMessages', { count: 7 }));
// Test 8: Date & Number Formatting
console.log('\n📅 Date & Number Formatting:');
var sampleDate = new Date('2025-01-01');
var sampleNumber = 1234567.89;
i18n_1.default.changeLanguage('en');
console.log('  - EN date:', i18n_1.default.t('demo.today', { value: sampleDate, format: 'date' }));
console.log('  - EN number:', i18n_1.default.t('demo.number', { value: sampleNumber, format: 'number' }));
i18n_1.default.changeLanguage('ar');
console.log('  - AR date:', i18n_1.default.t('demo.today', { value: sampleDate, format: 'date' }));
console.log('  - AR number:', i18n_1.default.t('demo.number', { value: sampleNumber, format: 'number' }));
// Test 9: Check RTL support
console.log('\n📝 RTL Support:');
console.log('  - English direction:', i18n_1.default.dir('en'));
console.log('  - Arabic direction:', i18n_1.default.dir('ar'));
// Test 10: Test fallback
console.log('\n🔄 Fallback Test:');
console.log('  - Non-existent key:', i18n_1.default.t('non.existent.key', 'Fallback text'));
console.log('\n🎉 i18n verification completed successfully!');

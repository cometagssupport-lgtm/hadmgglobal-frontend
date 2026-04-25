const fs = require('fs');

let content = fs.readFileSync('src/app/services/language.ts', 'utf8');

// Replace allLanguages
content = content.replace(/private allLanguages = \[\s*"English",[\s\S]*?\];/, `private allLanguages = [
    { label: "Arabic - عربي", code: "sa" },
    { label: "Czech - čeština", code: "cz" },
    { label: "English", code: "gb" },
    { label: "French - Français", code: "fr" },
    { label: "German - Deutsch", code: "de" },
    { label: "Hungarian - magyar", code: "hu" },
    { label: "Indonesian", code: "id" },
    { label: "Italian - Italiano", code: "it" },
    { label: "Persian - فارسی", code: "ir" },
    { label: "Polish - Polski", code: "pl" },
    { label: "Portuguese - Português", code: "pt" },
    { label: "Russian - Русский", code: "ru" },
    { label: "Slovak - Slovák", code: "sk" },
    { label: "Spanish - Español", code: "es" },
    { label: "Turkish - Türkçe", code: "tr" },
    { label: "Uzbek - o'zbek", code: "uz" },
    { label: "Vietnamese - Tiếng Việt", code: "vn" }
  ];`);

// Replace rtlLanguages
content = content.replace(/private rtlLanguages = \['Arabic - عربي', 'Persian - فارسی'\];/, `// private rtlLanguages = ['Arabic - عربي', 'Persian - فارسی'];\n  private rtlLanguages = ['sa', 'ir'];`);

// Add currentLanguage
if (!content.includes('currentLanguage = signal(\'English\');')) {
  content = content.replace(/private translations:/, `currentLanguage = signal('English');\n\n  private translations:`);
}

// Replace bottom methods
const bottomTarget = /constructor\(\) \{[\s\S]*?private applyDirection\(dir: 'ltr' \| 'rtl'\) \{/m;

const bottomReplacement = `constructor() {
    const savedLang = this.safeGetLocalStorage('app_lang');
    const savedDir = this.safeGetLocalStorage('app_dir');

    if (savedLang && this.allLanguages.some(l => l.label === savedLang)) {
      this.currentLang.set(savedLang);
    }

    if (savedDir === 'rtl' || savedDir === 'ltr') {
      this.currentDirection.set(savedDir as 'rtl' | 'ltr');
    } else {
      this.setDirectionByLanguage(this.currentLang());
    }

    this.applyDirection(this.currentDirection());

  }

  get languages() {
    return this.allLanguages;
  }

  // get currentLanguage() {
  //   return this.currentLang();
  // }

  get direction() {
    return this.currentDirection();
  }

  setLanguage(lang: any) {
    this.currentLanguage.set(lang.label);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dir = this.isRTL(lang) ? 'rtl' : 'ltr';
    }
  }

  isRTL(lang: any) {
    const code = typeof lang === 'string' ? this.allLanguages.find(l => l.label === lang)?.code : lang?.code;
    return code ? this.rtlLanguages.includes(code) : false;
  }

  private setDirectionByLanguage(lang: any) {
    const isRTL = this.isRTL(lang);
    const dir = isRTL ? 'rtl' : 'ltr';
    this.currentDirection.set(dir);
    this.safeSetLocalStorage('app_dir', dir);
    this.applyDirection(dir);
  }

  private applyDirection(dir: 'ltr' | 'rtl') {`;

content = content.replace(bottomTarget, bottomReplacement);

fs.writeFileSync('src/app/services/language.ts', content);
console.log('Fixed file.');

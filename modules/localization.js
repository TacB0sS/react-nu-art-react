/**
 * Created by tacb0ss on 27/07/2018.
 */

import Module from '../core/module';

class LocalizationModule
  extends Module {

  init() {
    const defaultLanguage = this.config.defaultLanguage;
    if (!defaultLanguage)
      throw Error("MUST set defaultLanguage in the config data");

    Object.keys(this.config.languages).forEach(key => this.config.languages[key].locale = key);
    this.setLanguage(defaultLanguage);
    this.defaultLanguageData = this.activeLanguageData;
  }

  setLanguage(language) {
    if (!this.config.languages[language])
      throw new Error(`Unsupported language: ${language}`);

    this.activeLanguage = this.config.languages[language];
    this.activeLanguageData = require(`../../res/localization/${language}`);
  }

  getAvailableLanguages() {
    return Object.keys(this.config.languages).map(key => this.config.languages[key]);
  }

  getActiveLanguage() {
    return this.activeLanguage;
  }

  getString(key, ...params) {
    let text = this.activeLanguageData[key];

    if (!text)
      text = this.defaultLanguageData[key];

    if (!text)
      return key;

    return text.format(params);
  }
}

export default new LocalizationModule();

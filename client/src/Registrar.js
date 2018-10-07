import Settings from "./pages/Settings.jsx";
const DEFAULT_OVERWRITES = {
  "spotify:app:customspotify_settings": {
    id: "customspotify_settings",
    component: Settings
  }
};
export default class Registar {
  static pageOverwrites = {};
  static registerPageOverwrite(page, component) {
    let id = page.split(":")[2];
    this.pageOverwrites[page] = {
      id,
      component
    };
    return this;
  }
  static getPageOverwrite(page) {
    if (DEFAULT_OVERWRITES[page]) return DEFAULT_OVERWRITES[page];
    return this.pageOverwrites[page];
  }
  static pageOverwriteExists(page) {
    if (typeof DEFAULT_OVERWRITES[page] !== "undefined") return true;
    return typeof this.pageOverwrites[page] !== "undefined";
  }
}

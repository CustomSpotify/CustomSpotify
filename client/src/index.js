import Util from "./util";
import registerObserver from "./registerObserver";
import injectSidebar from "./injectSidebar";
import initScript from "./init";
initScript();
registerObserver();
injectSidebar(); // Don't await this! this hangs the main thread.
if (Util.inDev) {
  require("./development");
}
if (Util.inFrame) {
  window.addEventListener("message", e => {
    try {
      let data = JSON.parse(e.data);
      if (data.event === "ME") {
        console.log("Got me event");
        Util.me = data.payload;
        registerObserver();
      }
    } catch (err) {}
  });
} else {
  if (Util.me === "") {
    let url = "https://zlink.app.spotify.com/injector.js";
    if (Util.inDev) url = "http://localhost:8161/injector.js";
    fetch(url)
      .then(res => res.text())
      .then(js => {
        Util.me = js;
        registerObserver();
      });
  }
}

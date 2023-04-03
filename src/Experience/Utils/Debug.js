import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";

export default class Debug {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.gui = new Pane();
      this.gui.registerPlugin(EssentialsPlugin);
    }
  }
}

var d = require("obsidian");

class PressEForEditPlugin extends d.Plugin {
  constructor() {
    super(...arguments);

    this.keyHandler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

      var a = document.activeElement;
      // Allow Escape through even when in contentEditable (the editor)
      if (e.key !== "Escape") {
        if (a instanceof HTMLInputElement || a instanceof HTMLTextAreaElement || (a != null && a.isContentEditable)) return;
      }

      var n = this.app.workspace.getActiveViewOfType(d.MarkdownView);
      if (!n) return;

      if (e.key === "e" && n.getMode() === "preview") {
        e.preventDefault();
        var r = n.leaf.getViewState();
        if (r.state) {
          r.state.mode = "source";
          n.leaf.setViewState(r);
        }
      } else if (e.key === "Escape" && n.getMode() === "source") {
        e.preventDefault();
        var r = n.leaf.getViewState();
        if (r.state) {
          r.state.mode = "preview";
          n.leaf.setViewState(r);
        }
      }
    };
  }

  async onload() {
    document.addEventListener("keydown", this.keyHandler);
  }

  onunload() {
    document.removeEventListener("keydown", this.keyHandler);
  }
}

module.exports = PressEForEditPlugin;

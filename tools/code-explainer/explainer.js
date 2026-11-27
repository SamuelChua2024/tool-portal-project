// Reads the pasted code, explains it line by line using PYTHON_RULES (see rules.js),
// and shows the result. The pasted code is only ever treated as text: it is never run.
(function () {
  var TAB_WIDTH = 4;

  var input = document.getElementById("code-input");
  var button = document.getElementById("explain-button");
  var status = document.getElementById("status");
  var results = document.getElementById("results");

  // Counts leading spaces (a tab counts as 4) so we can tell when a line is inside a block.
  function indentOf(line) {
    var width = 0;
    for (var i = 0; i < line.length; i++) {
      if (line.charAt(i) === " ") {
        width += 1;
      } else if (line.charAt(i) === "\t") {
        width += TAB_WIDTH;
      } else {
        break;
      }
    }
    return width;
  }

  // Returns the explanation from the first matching rule, or null if no rule matches.
  function explainLine(trimmed) {
    for (var i = 0; i < PYTHON_RULES.length; i++) {
      var match = PYTHON_RULES[i].test.exec(trimmed);
      if (match) {
        return PYTHON_RULES[i].explain(match);
      }
    }
    return null;
  }

  function addResult(codeLine, explanation, isUnknown) {
    var item = document.createElement("li");
    if (isUnknown) {
      item.className = "unknown";
    }

    var code = document.createElement("code");
    code.textContent = codeLine; // textContent keeps pasted text as plain text (never HTML)
    item.appendChild(code);

    var text = document.createElement("p");
    text.textContent = explanation;
    item.appendChild(text);

    results.appendChild(item);
  }

  function explain() {
    results.textContent = "";

    var lines = input.value.split(/\r?\n/).filter(function (line) {
      return line.trim() !== "";
    });

    if (lines.length === 0) {
      status.textContent = "Paste some Python code first.";
      return;
    }

    var unknownCount = 0;
    lines.forEach(function (line) {
      var explanation = explainLine(line.trim());
      var indented = indentOf(line) > 0;
      if (explanation === null) {
        unknownCount += 1;
        explanation = "No rule for this line yet.";
      }
      if (indented) {
        explanation += " This line is indented, so it belongs to the block started above it.";
      }
      addResult(line.replace(/\s+$/, ""), explanation, explanation.indexOf("No rule") === 0);
    });

    status.textContent = "Explained " + lines.length + (lines.length === 1 ? " line" : " lines") +
      (unknownCount ? " (" + unknownCount + " without a rule yet)." : ".");
  }

  button.addEventListener("click", explain);
})();

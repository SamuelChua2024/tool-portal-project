// The explainer's rule list.
// Each rule has:
//   test    - a pattern (regular expression) that is checked against ONE trimmed line of code
//   explain - a function that receives the pattern's match and returns a plain-language sentence
// The first rule whose pattern matches a line wins, so more specific rules come first.
// To teach the explainer something new, add a rule here; explainer.js does not need to change.

var PYTHON_RULES = (function () {
  // Describes the right-hand side of "name = value".
  function describeValue(value) {
    var v = value.trim();
    var m;

    if (/^-?\d+(\.\d+)?$/.test(v)) {
      return "the number " + v;
    }
    if (/^(["']).*\1$/.test(v)) {
      return "the text " + v + " (text in quotes is called a string)";
    }
    if (/^(True|False)$/.test(v)) {
      return "the value " + v + " (a yes/no value, called a boolean)";
    }
    if (v === "None") {
      return "None (Python's way of saying \"no value\")";
    }
    if (v.charAt(0) === "[") {
      return "a list (an ordered collection of items)" + (/\]$/.test(v) ? "" : ", which continues on the next lines");
    }
    if (v.charAt(0) === "{") {
      return "a dictionary (a collection of key: value pairs, like a word and its meaning)" +
        (/\}$/.test(v) ? "" : ", which continues on the next lines");
    }
    m = /^input\s*\((.*)\)$/.exec(v);
    if (m) {
      return "whatever the user types in when the program asks (input)";
    }
    m = /^len\s*\((.*)\)$/.exec(v);
    if (m) {
      return "the number of items in " + m[1];
    }
    return "the result of: " + v;
  }

  return [
    {
      // A comment: a note for people, ignored by Python.
      test: /^#\s?(.*)$/,
      explain: function (m) {
        return "A comment. Python ignores it; it is a note for people reading the code." +
          (m[1] ? " It says: \"" + m[1] + "\"." : "");
      }
    },
    {
      test: /^from\s+([\w.]+)\s+import\s+(.+)$/,
      explain: function (m) {
        return "Brings " + m[2] + " from the module \"" + m[1] +
          "\" into this program. A module is a ready-made file of extra Python tools.";
      }
    },
    {
      test: /^import\s+([\w.]+)(?:\s+as\s+(\w+))?$/,
      explain: function (m) {
        return "Brings in the module \"" + m[1] + "\" (a ready-made file of extra Python tools)" +
          (m[2] ? ", and lets the code call it \"" + m[2] + "\" for short." : ".");
      }
    },
    {
      test: /^def\s+(\w+)\s*\((.*)\)\s*(?:->\s*[^:]+)?:$/,
      explain: function (m) {
        var params = m[2].trim();
        return "Defines a function called \"" + m[1] + "\" (a reusable, named block of code). " +
          (params ? "It takes these inputs (called parameters): " + params + ". " : "It takes no inputs. ") +
          "The indented lines below only run when the function is used (called).";
      }
    },
    {
      test: /^return(?:\s+(.*))?$/,
      explain: function (m) {
        return m[1]
          ? "Sends the value " + m[1] + " back to whoever used the function, and ends the function."
          : "Ends the function without sending anything back.";
      }
    },
    {
      test: /^if\s+(.+):$/,
      explain: function (m) {
        return "Checks whether this is true: " + m[1] + ". If it is, the indented lines below run.";
      }
    },
    {
      test: /^elif\s+(.+):$/,
      explain: function (m) {
        return "If the check above was not true, checks this instead: " + m[1] +
          ". If it is true, the indented lines below run.";
      }
    },
    {
      test: /^else\s*:$/,
      explain: function () {
        return "If none of the checks above were true, the indented lines below run instead.";
      }
    },
    {
      test: /^for\s+(\w+(?:\s*,\s*\w+)*)\s+in\s+(.+):$/,
      explain: function (m) {
        var range = /^range\s*\((.*)\)$/.exec(m[2].trim());
        return "Repeats the indented lines below once for each item in " + m[2] +
          ". Each time around, the current item is stored in \"" + m[1] + "\". This repeating is called a loop." +
          (range ? " range(" + range[1] + ") produces a series of whole numbers to count through." : "");
      }
    },
    {
      test: /^while\s+(.+):$/,
      explain: function (m) {
        return "Keeps repeating the indented lines below for as long as this is true: " + m[1] +
          ". This repeating is called a loop.";
      }
    },
    {
      test: /^break$/,
      explain: function () {
        return "Stops the loop right away and carries on with the code after it.";
      }
    },
    {
      test: /^continue$/,
      explain: function () {
        return "Skips the rest of this round of the loop and jumps to the next round.";
      }
    },
    {
      test: /^pass$/,
      explain: function () {
        return "Does nothing. It is a placeholder for a spot where Python needs a line but you have nothing to write yet.";
      }
    },
    {
      test: /^print\s*\((.*)\)$/,
      explain: function (m) {
        return m[1].trim()
          ? "Shows this on the screen: " + m[1] + ". print is a built-in function (a ready-made command)."
          : "Shows an empty line on the screen.";
      }
    },
    {
      // Updates such as "total += 5". Must come before plain assignment.
      test: /^(\w+)\s*(\+|-|\*|\/)=\s*(.+)$/,
      explain: function (m) {
        var name = "the variable \"" + m[1] + "\"";
        var actions = {
          "+": "Adds " + m[3] + " to " + name,
          "-": "Subtracts " + m[3] + " from " + name,
          "*": "Multiplies " + name + " by " + m[3],
          "/": "Divides " + name + " by " + m[3]
        };
        return actions[m[2]] + ", and stores the new result back in it. (A variable is a name that holds a value.)";
      }
    },
    {
      // Plain assignment. The (?!=) stops it matching comparisons like "x == 1".
      test: /^(\w+)\s*=(?!=)\s*(.+)$/,
      explain: function (m) {
        return "Stores " + describeValue(m[2]) + " in a variable called \"" + m[1] +
          "\". A variable is a name that holds a value.";
      }
    }
  ];
})();

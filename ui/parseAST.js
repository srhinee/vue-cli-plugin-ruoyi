const fs = require("fs");
const { Parser } = require("acorn");

let commentList;
let resultList;
let item;

function handleComment(block, text, start, end, loc, range) {
  if (!block) {
    commentList.push({ text, line: loc.line });
  }
}

function walkObject(obj, source) {
  let properties = obj.properties;
  let result = {};
  properties.forEach((n) => {
    let name = n.key.name;
    let type = n.value.type;
    if (type === "Literal") {
      //assign
      result[name] = n.value.value;
    } else if (type === "ObjectExpression") {
      //object
      result[name] = walkObject(n.value, source);
    } else if (type === "Identifier") {
      //variable
      result[name] = n.value.name;
    } else if (type === "TemplateLiteral") {
      let { expressions, quasis } = n.value;
      result[name] = "";
      [...expressions, ...quasis]
        .sort((a, b) => a.start - b.start)
        .forEach((v) => {
          if (v.type === "Identifier") result[name] += `{${v.name}}`;
          if (v.type === "TemplateElement") result[name] += v.value.raw;
        });
    } else if (type === "BinaryExpression") {
      result[name] = source.slice(n.value.left.start, n.value.right.end);
    }
  });
  return result;
}

function walkFn(node, type, source) {
  try {
    let blockBody, funcParams;
    if (type === "function") {
      funcParams = node.params;
      blockBody = node.body.body;
    }
    if (type === "arrow") {
      funcParams = node.init.params;
      blockBody = node.init.body.body;
    }

    item.line = node.loc.start.line;
    item.id = node.id.name;
    item.parameter = funcParams.map((v) => v.name);
    for (let i in commentList) {
      if (commentList[i].line < item.line) {
        item.comment = commentList[i].text;
        commentList.splice(i, 1);
        break;
      }
    }
    blockBody.forEach((n) => {
      if (n.type === "ReturnStatement") {
        Object.assign(item, walkObject(n.argument.arguments[0], source));
      }
    });

    ["data", "headers", "params"].forEach((v) => {
      if (item[v] && typeof item[v] === "string")
        item[v] = { [item[v]]: item[v] };
    });

    resultList.push(item);
  } catch (e) {
    console.error(e);
  }
}

function getSource(path) {
  let result = {};
  fs.readdirSync(path).forEach((v) => {
    let child = `${path}/${v}`;
    let stat = fs.statSync(child);
    if (stat.isDirectory()) {
      result[v] = getSource(child);
    } else {
      let source = fs.readFileSync(child, "utf-8");
      commentList = [];
      resultList = [];
      let ast = Parser.parse(source, {
        sourceType: "module",
        locations: true,
        ecmaVersion: 2020,
        onComment: handleComment,
      });
      commentList = commentList.reverse();
      ast.body.forEach((n) => {
        if (n.type === "ExportNamedDeclaration") {
          item = {
            comment: "",
            line: "",
            id: "",
            parameter: [],
            url: "",
            headers: {},
            method: "",
            params: {},
            data: {},
            timeout: "",
          };
          if (n.declaration.type === "FunctionDeclaration") {
            walkFn(n.declaration, "function", source);
          }
          if (n.declaration.type === "VariableDeclaration") {
            walkFn(n.declaration.declarations[0], "arrow", source);
          }
        }
      });
      result[v] = resultList;
    }
  });
  return result;
}

module.exports.getSource = getSource;

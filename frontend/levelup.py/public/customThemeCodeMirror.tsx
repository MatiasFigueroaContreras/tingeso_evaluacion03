import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const codeTheme = createTheme({
    theme: "dark",
    settings: {
        background: "#0E1522",
        foreground: "#E4E4E4",
        caret: "#E4E4E4",
        selection: "#172237",
        selectionMatch: "#172237",
        lineHighlight: "#172237",
        gutterBackground: "#0E1522",
        gutterForeground: "#C7C7C7",
    },
    styles: [
        { tag: t.comment, color: "#787b8099" },
        { tag: t.variableName, color: "#E4E4E4" },
        { tag: [t.string, t.special(t.brace)], color: "#00BA13" },
        { tag: t.number, color: "#FF7748" },
        { tag: t.bool, color: "#5c6166" },
        { tag: t.null, color: "#5c6166" },
        { tag: t.keyword, color: "#B178FF" },
        { tag: t.operator, color: "#00E0FF" },
        { tag: t.className, color: "#00E0FF" },
        { tag: t.definition(t.typeName), color: "#00E0FF" },
        { tag: t.typeName, color: "#00E0FF" },
        { tag: t.angleBracket, color: "#00E0FF" },
        { tag: t.tagName, color: "#00E0FF" },
        { tag: t.attributeName, color: "#00E0FF" },
    ],
});
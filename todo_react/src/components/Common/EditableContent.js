import { useEffect, useRef, useState } from "react";
import { Container, Typography } from "@mui/material";
import Cursor from "../../utils/Cursor";
import { OutsideClickDetector } from "./";

export default function EditableContent({
  value,
  onEnter,
  unMountComponent,
  sx,
  keyWordsToHighlight,
  hintText,
  selectText,
  children,
  shouldValueChange = true,
}) {
  const [shouldSelectText, setShouldSelectText] = useState(selectText);
  const wrapperRef = useRef(null);
  OutsideClickDetector(wrapperRef, unMountComponent);

  const getHtmlInputValue = (text) => {
    let idxs = [];
    let prevIdx = 0;
    let result = "";
    keyWordsToHighlight?.forEach((keyword) => {
      const idx = text.indexOf(keyword);
      if (idx != -1) idxs.push([idx, idx + keyword.length]);
    });
    idxs.sort((a, b) => a[0] - b[0]);
    for (const idx of idxs) {
      result += `${text.slice(prevIdx, idx[0])}<span style="color: var(--highlight-color)"}>${text.slice(
        idx[0],
        idx[1]
      )}</span>`;
      prevIdx = idx[1];
    }
    result += text.slice(prevIdx, text.length);
    return result;
  };

  const [htmlIputValue, setHtmlInputValue] = useState(getHtmlInputValue(value));
  const inputRef = useRef();
  const caretPos = useRef(value.length);
  const textStyle = {
    color: "var(--highlight-color)",
  };

  const listHints = hintText?.map(([hintKey, hintValue], index) => (
    <span key={index}>
      {hintKey !== "" && <span style={textStyle}>{hintKey}</span>}
      {hintKey !== "" && hintValue !== "" && ":"}
      {hintValue !== "" && `${hintValue} `}
    </span>
  ));

  const inputOnKeyDown = async (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (e.target.innerText.trim() != "") {
        if (!shouldValueChange || e.target.innerText.trim() != value) await onEnter(e.target.innerText.trim());
        unMountComponent();
      }
    } else if (e.key == "Escape") unMountComponent();
  };

  const inputOnChange = (e) => {
    if (shouldSelectText) setShouldSelectText(false);
    caretPos.current = Cursor.getCurrentCursorPosition(inputRef.current);
    setHtmlInputValue(getHtmlInputValue(e.target.innerText));
  };

  useEffect(() => {
    if (htmlIputValue.trim() == "") {
      inputRef.current.childNodes[0].focus();
    } else {
      if (shouldSelectText) {
        const range = document.createRange();
        range.selectNodeContents(inputRef.current.childNodes[0]);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      } else Cursor.setCurrentCursorPosition(inputRef.current, caretPos.current);
    }
  }, [htmlIputValue]);

  return (
    <Container maxWidth={false} sx={{ display: "contents" }} ref={wrapperRef} disableGutters>
      {children}
      <div
        style={{ width: "100%", overflow: "hidden" }}
        onBlur={() => {
          Cursor.setCurrentCursorPosition(inputRef.current, caretPos.current);
        }}
        ref={inputRef}
      >
        <Typography
          sx={{ whiteSpace: "nowrap", cursor: "text", minHeight: "24px", paddingRight: "10px", ...sx }}
          onKeyDown={inputOnKeyDown}
          onInput={inputOnChange}
          contentEditable={true}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: htmlIputValue }}
        />
      </div>
      <Typography
        sx={{
          color: "var(--hint-text-color)",
          margin: "auto",
          marginRight: "0px",
          marginLeft: "20px",
          whiteSpace: "nowrap",
          tabIndex: "-1",
        }}
      >
        {listHints}
      </Typography>
    </Container>
  );
}

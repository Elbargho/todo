import { Container } from "@mui/material";
import { CheckBox } from ".";
import { EditableContent } from "../Common";

export default function TaskAdderInput({ is_done, value, setTaskAdderInputId, setTaskRawTitle }) {
  const unMountComponent = () => {
    setTaskAdderInputId(null);
  };

  return (
    <Container maxWidth={false} className="TaskContainer" disableGutters>
      <CheckBox is_done={is_done} />
      <EditableContent
        value={value}
        onEnter={setTaskRawTitle}
        unMountComponent={unMountComponent}
        sx={{ paddingLeft: "7px" }}
        keyWordsToHighlight={["!r", "!st"]}
        hintText={[
          ["!r", "1-5"],
          ["!r", "2*"],
          ["!r", "1+"],
          ["!r", "2, 4"],
          ["!st", "t1, t2"]
        ]}
      />
    </Container>
  );
}

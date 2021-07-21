import React from "react";
import { Confirm } from "semantic-ui-react";

// CSS
import "../../css/mark-done-modal.css";

const MarkDoneModal = (props) => {
  const { PresentState, onCancel, onConfirm } = props;
  return (
    <Confirm
      id="mark-done-modal"
      open={PresentState}
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButton="No I don't"
      confirmButton="Yes, proceed"
      content={props.children ? props.children : "Mark to-do as completed ?"}
      size="tiny"
    />
  );
};

export default MarkDoneModal;

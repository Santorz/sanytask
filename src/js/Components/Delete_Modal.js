import React from "react";
import { Confirm } from "semantic-ui-react";

// CSS
import "../../css/delete-modal.css";

const DeleteModal = (props) => {
  const { PresentState, onCancel, onConfirm } = props;
  return (
    <Confirm
      id="delete-modal"
      open={PresentState}
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButton="No I don't"
      confirmButton="Yes, proceed"
      content={
        props.children
          ? props.children
          : "Are you sure you want to delete this?"
      }
      size="tiny"
    />
  );
};

export default DeleteModal;

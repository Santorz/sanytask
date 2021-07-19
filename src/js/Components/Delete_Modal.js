import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

// CSS
import "../../css/delete-modal.css";

/*class ConfirmExampleCallbacks extends Component {
  state = { open: false, result: "show the modal to capture a result" };

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ result: "confirmed", open: false });
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  render() {
    const { open, result } = this.state;

    return (
      <div>
        <p>
          Result: <em>{result}</em>
        </p>

        <Button onClick={this.show}>Show</Button>
        <Confirm
          open={open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}*/

const ConfirmDeleteModal = (props) => {
  let deleteModalState = { open: false, result: "" };

  const [deleteModalPresentState, setdeleteModalState] =
    useState(deleteModalState);

  const triggerDeleteModal = () => setdeleteModalState({ open: true });
  const handleConfirm = () =>
    setdeleteModalState({ result: "confirmed", open: false });
  const handleCancel = () =>
    setdeleteModalState({ result: "cancelled", open: false });

  return (
    <>
      <Button
        color="red"
        onClick={triggerDeleteModal}
        style={{ margin: "10px 0" }}
      >
        Show Delete Modal
      </Button>
      <Confirm
        id="delete-modal"
        open={deleteModalPresentState.open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        cancelButton="No I don't"
        confirmButton="Yes, proceed"
        content={
          props.children
            ? props.children
            : "Are you sure you want to delete this?"
        }
        size="tiny"
      />
      <h3>{deleteModalPresentState.result}</h3>
    </>
  );
};

export default ConfirmDeleteModal;

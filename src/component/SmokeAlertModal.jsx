import React, { useContext } from "react";
import { SmokeContext } from "../contexts/SmokeContext";
import { Modal, Button } from "react-bootstrap";
import { ref, update } from "firebase/database";
import { database } from "../firebaseConfig";

const SmokeAlertModal = () => {
  const { isSmokeDetected } = useContext(SmokeContext);
  const [show, setShow] = React.useState(false);

  // Mở modal nếu smoke được phát hiện
  React.useEffect(() => {
    if (isSmokeDetected) {
      setShow(true);
    }
  }, [isSmokeDetected]);

  const handleClose = () => {
    // Đặt show modal thành false
    setShow(false);

    // Gửi dữ liệu false cho smoke trong Firebase
    const smokeRef = ref(database, "system");
    update(smokeRef, { smoke: false })
      .then(() => {
        console.log("Smoke status updated to false in Firebase");
      })
      .catch((error) => {
        console.error("Error updating smoke status:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cảnh báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "red" }}>⚠️ Phát hiện có cháy! ⚠️</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SmokeAlertModal;

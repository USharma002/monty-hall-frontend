import { Button } from "@mui/material";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function StatsModal({switchMatch, noSwitchMatch}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          <Button variant="primary" onClick={handleShow} className='show-btn'>
            Show Statistics
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Statistics</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table table-borderless">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Switched</th>
                    <th scope="col">Win</th>
                    <th scope="col">Loss</th>
                    <th scope="col">Total</th>
                    <th scope="col">P(Win)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>YES</th>
                    <td>{switchMatch[0]}</td>
                    <td>{switchMatch[1]}</td>
                    <td>{switchMatch[1] + switchMatch[0]}</td>
                    <td>{Math.round((switchMatch[0]/(switchMatch[1] + switchMatch[0])) * 100) / 100 }</td>
                </tr>
                <tr>
                    <th>NO</th>
                    <td>{noSwitchMatch[0]}</td>
                    <td>{noSwitchMatch[1]}</td>
                    <td>{noSwitchMatch[1] + noSwitchMatch[0]}</td>
                    <td>{Math.round((noSwitchMatch[0]/(noSwitchMatch[1] + noSwitchMatch[0])) * 100) / 100 }</td>
                </tr>
            </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

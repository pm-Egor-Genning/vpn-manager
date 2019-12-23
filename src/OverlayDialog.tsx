import React from 'react';
import { FileInput } from './FileInput';
import './OverlayDialog.css';
import { Dialog } from './Dialog';
import { Link } from 'react-router-dom';

export function OverlayDialog() {
  return (
    <Dialog>
      <div className="overlay">
        <div className="modal">
          <div className="header">
            Choose path to new vpn client
            <Link className="close" to="/">[x]</Link>
          </div>
          <div className="modal-body">
            <FileInput/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

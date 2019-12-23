import React from 'react';
import './OverlayDialog.css';
import { Dialog } from './Dialog';
import { Link } from 'react-router-dom';
import { FileManagerWrapper } from './FileManagerWrapper';

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
            <FileManagerWrapper/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

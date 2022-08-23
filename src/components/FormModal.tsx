import React from "react";
import { Modal } from "@mui/material";
import { CustomBox } from "./FormModal.styles";

export type FormModalProps = {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children?: JSX.Element|JSX.Element[]
}
export const FormModal = ({ modalOpen, setModalOpen, children }: FormModalProps) => (
  <Modal
    open={modalOpen}
    onClose={() => setModalOpen(prev => !prev)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  > 
  <CustomBox>
    { children }
  </CustomBox>
</Modal>
);
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ButtonGroup, CloseButton, ModalContainer, ModalHeader } from "./style";
import Botao from "../Botao";

export interface ModalHandler {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  icon: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
  aoClicar: () => void;
  clickOutsideModal?: boolean;
}

const Modal = forwardRef<ModalHandler, ModalProps>(
  ({ icon, titulo, children, aoClicar, clickOutsideModal = true }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const closeModal = () => {
      dialogRef.current?.close();
    };

    const closeOnBackdropClick = (
      event: React.MouseEvent<HTMLDialogElement>
    ) => {
      if (clickOutsideModal && event.target === dialogRef.current) {
        closeModal();
      }
    };

    useImperativeHandle(ref, () => {
      return {
        open: () => dialogRef.current?.showModal(),
        close: () => closeModal(),
      };
    });

    return (
      <ModalContainer ref={dialogRef} onClick={closeOnBackdropClick}>
        <ModalHeader>
          <div>
            {icon}
            {titulo}
          </div>
          <CloseButton onClick={() => closeModal()}>x</CloseButton>
        </ModalHeader>
        {children}
        <ButtonGroup>
          <Botao $variante="secundario" onClick={() => closeModal()}>
            Cancelar
          </Botao>
          <Botao
            $variante="primario"
            onClick={() => {
              closeModal();
              aoClicar();
            }}
          >
            Adicionar
          </Botao>
        </ButtonGroup>
      </ModalContainer>
    );
  }
);

export default Modal;

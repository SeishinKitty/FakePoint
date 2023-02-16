import React from "react";
import { Dispatch, SetStateAction } from "react";

interface IModal {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: IModal) => {
  return props.show ? (
    <div id="myModal" className="modal" onClick={(event: any) => {props.setShow(false)}}>
      <div className="modal-content">
        <p>Sugmai!</p>
      </div>
    </div>
  ) : ( <></> )
};

export default Modal;

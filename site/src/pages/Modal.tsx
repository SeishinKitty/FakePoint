import React, { FC } from "react";
import { Dispatch, SetStateAction } from "react";

interface IModal {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<IModal> = ({show, setShow}) => {
  return show ? (
    <div id="myModal" className="modal" onClick={(event: any) => {setShow(false)}}>
      <div className="modal-content">
        <p>Sugmai!</p>
      </div>
    </div>
  ) : ( <></> )
};

export default Modal;

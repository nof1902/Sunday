import { utilService } from "../../services/util.service";
import { useEffect, useRef, useState } from "react"


export function PriorityCmp({ info, onUpdate }) {
    const [openEditModel, setOpenEditModel] = useState(false)
    const [infoToEdit, setInfoToEdit] = useState(info)
    const modalRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClickModal();
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [handleClickModal]);

    useEffect(() => {
        onUpdate(infoToEdit)
      }, [infoToEdit]);


    function onChangeStatus({ label, backgroundColor}) {
        setInfoToEdit(prevInfo => ({ ...prevInfo, selectedPriority: {label: label, backgroundColor: backgroundColor} }))
        handleClickModal()
    }


    function handleClickModal(){
        setOpenEditModel(!openEditModel)
    }

    return (
        <section className="dynamic-cmp" style={{backgroundColor: infoToEdit.selectedPriority?.backgroundColor || 'rgb(196, 196, 196)'}} onClick={handleClickModal}>
            <h4 className="selected-label">{infoToEdit.selectedPriority?.label}</h4>
            {openEditModel && 
                <section className="status-model">
                    <section className="status-picker-content">
                        <ul ref={modalRef} className="items-container">
                        {
                            info.priorities.map((priority, idx) => 
                                <li className="item" key={idx} onClick={() => onChangeStatus(priority)}
                                    style={{ backgroundColor: priority.backgroundColor }}
                                    label={priority.label}>
                                    {priority.label}
                                </li>
                            )
                        }
                        </ul>
                    </section>
                    <section className="status-picker-footer">
                        <div className="horizontal-divider"></div>
                        <button className="status-picker-footer-btn">
                            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_198e7f853c leftIcon_4a984e438a noFocusStyle_dcfeb657a6" data-testid="icon"><path d="M13.8542 3.59561C13.8541 3.59568 13.8542 3.59555 13.8542 3.59561L4.80915 12.6503L3.81363 16.189L7.35682 15.1957L16.4018 6.14C16.4746 6.06722 16.5161 5.96795 16.5161 5.86503C16.5161 5.76221 16.4753 5.6636 16.4026 5.59083C16.4025 5.59076 16.4026 5.59091 16.4026 5.59083L14.4038 3.59568C14.3309 3.52292 14.232 3.48197 14.1289 3.48197C14.026 3.48197 13.927 3.52297 13.8542 3.59561ZM12.8051 2.54754C13.1562 2.19695 13.6324 2 14.1289 2C14.6254 2 15.1016 2.19693 15.4527 2.54747C15.4527 2.5475 15.4527 2.54745 15.4527 2.54747L17.4515 4.54263C17.8026 4.89333 18 5.36914 18 5.86503C18 6.36091 17.8028 6.8365 17.4518 7.18719L8.26993 16.3799C8.17984 16.4701 8.06798 16.5356 7.94516 16.57L2.94244 17.9724C2.68418 18.0448 2.4069 17.9723 2.21725 17.7829C2.0276 17.5934 1.95512 17.3165 2.02768 17.0586L3.43296 12.0633C3.46728 11.9413 3.53237 11.8301 3.62199 11.7404L12.8051 2.54754Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            Edit Labels
                        </button>
                    </section>
                </section>
            }
        </section>
    )
}

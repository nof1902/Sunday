import { useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function PeopleCmp({ info, onUpdateEntity }) {
  const { selectedUser, members } = info;
  const [openEditModel, setOpenEditModel] = useState(false);
  const [user, setUser] = useState(null);
  const [infoToEdit, setInfoToEdit] = useState(info);
  const modalRef = useRef();

  useEffect(() => {
    findUser()
  }, [info])

  function findUser() {
    console.log('selectedUser' , selectedUser)
    const userSelected = members.find(member => member._id === selectedUser);
    if (userSelected) {
      setUser(userSelected);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClickModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickModal]);

  useEffectUpdate(() => {
    onUpdateEntity(infoToEdit)
  },[infoToEdit])


  function onChangeMember({ _id }) {
    setInfoToEdit((prevInfo) => ({
      ...prevInfo,
      selectedUser: _id,
    }));
    handleClickModal();
  }
 
  function handleClickModal() {
    setOpenEditModel(!openEditModel);
  }



  return (
    <section className="dynamic-cmp" onClick={handleClickModal}>
    <section className="people-cmp">
    <span className="pople-pluse-icon">+</span>
    <section className="people-cmp">
    <span className="pople-pluse-icon">+</span>
    { !user && <img src="src/Images/defult-person.svg" className="defult-person-img" title="" alt="" aria-hidden="true" /> }
    { user && <div className="person-img"><span>
      
      {user.fullname[0]}</span></div> }
    </section>

      {openEditModel && (
        <section className="status-model">
          <section className="status-picker-content">
            <div className="people-title"><span>Suggested people</span></div>
            <ul ref={modalRef} className="people-items-container">
              {members.map((member, idx) => (
                <li
                  className="people-item"
                  key={idx}
                  onClick={() => onChangeMember(member)}
                >
                  { member.imgUrl && <img src={member.imgUrl} className="choose-person-img" title={member.fullname} alt={member.fullname} aria-hidden="true" />}
                  { !member.imgUrl && <div className="choose-person"><span>{member.fullname[0]}</span></div>}
                  <span>{member.fullname}</span>
                </li>
              ))}
            </ul>
          </section>
        </section>
      )}
    </section>
    </section>
  );
}

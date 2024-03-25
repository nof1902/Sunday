import { useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function PeopleCmp({ info, onUpdateEntity }) {
  const { selectedUsers, members } = info;
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  // const [users, setUsers] = useState(null);
  const [infoToEdit, setInfoToEdit] = useState(info);
  const modalRef = useRef();

  // useEffect(() => {
  //   findUser()
  // }, [info])

  // function findUser() {
  //   const userSelected = members.filter(member => selectedUsers.includes(member._id));
  //   if (userSelected) {
  //     setUsers(userSelected);
  //   }
  // }

  useEffect(() => {
    findUsers();
  }, [members, selectedUsers]);

  function findUsers() {
    const usersSelected = members.filter((member) =>
      selectedUsers.includes(member._id)
    );
    setSelectedMembers(usersSelected);
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

  // useEffectUpdate(() => {
  //   onUpdateEntity(infoToEdit)
  // },[infoToEdit])

  function handleRemoveUser(userId) {
    const updatedSelectedUsers = selectedUsers.filter((id) => id !== userId);
    setInfoToEdit({ ...infoToEdit, selectedUsers: updatedSelectedUsers })
    onUpdateEntity({ ...infoToEdit, selectedUsers: updatedSelectedUsers });
  }

  function handleAddUser(user) {
    if (!selectedUsers.includes(user._id)) {
      const updatedSelectedUsers = [...selectedUsers,user._id];
      setInfoToEdit({ ...infoToEdit, selectedUsers: updatedSelectedUsers })
      onUpdateEntity({ ...infoToEdit, selectedUsers: updatedSelectedUsers });
    }
  }


  // function onChangeMember({ _id }) {
  //   setInfoToEdit((prevInfo) => ({
  //     ...prevInfo,
  //     selectedUsers: _id,
  //   }));
  //   handleClickModal();
  // }
 
  function handleClickModal() {
    setOpenEditModel(!openEditModel);
  }


  const maxDisplay = 2; 
  const additionalCount = selectedMembers.length - maxDisplay;



  return (
    <section className="dynamic-cmp" onClick={handleClickModal}>
      <section className="people-cmp">
      <span className="pople-pluse-icon">+</span>
      {selectedMembers.slice(0, maxDisplay).map((user) => (
          <div className="person-img" key={user._id}>
            <div className="user-circle">
              { user.imgUrl && <img src={user.imgUrl} className="choose-person-img" title={user.fullname} alt={user.fullname} aria-hidden="true" />}
              { !user.imgUrl && <div className="choose-person"><span>{user.fullname[0]}</span></div>}
            </div>
            {additionalCount > 0 && (
              <div className="user-circle additional">
                <span>+{additionalCount}</span>
              </div>
            )}
          </div>
        ))}
           
      </section>

      {openEditModel && (
        <section ref={modalRef} className="status-model">
          <section className="status-picker-content">
            <ul className="selected-users">
              {selectedMembers.map((user) => (
                <li key={user._id}
                    className="people-item">
                    {user.imgUrl ? <img src={user.imgUrl} className="choose-person-img" title={user.fullname} alt={user.fullname} aria-hidden="true" /> :
                    <div className="choose-person"><span>{user.fullname[0]}</span></div>
                    }
                    <span>{user.fullname}</span>
                    <button className="remove-user-btn" onClick={() => handleRemoveUser(user._id)}>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-x"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </li>
              ))}
            </ul>
            <div className="people-title"><span>Suggested people</span></div>
            <ul className="people-items-container">
            {members.map((member) => (
             !selectedMembers.some(selectedMember => selectedMember._id === member._id) && (
                <li
                  className="people-item"
                  key={member._id}
                  onClick={() => handleAddUser(member)}
                >
                  { member.imgUrl && <img src={member.imgUrl} className="choose-person-img" title={member.fullname} alt={member.fullname} aria-hidden="true" />}
                  { !member.imgUrl && <div className="choose-person"><span>{member.fullname[0]}</span></div>}
                  <span>{member.fullname}</span>
                </li>
              )))}
              {/* {members.map((member, idx) => (
                <li
                  className="people-item"
                  key={idx}
                  onClick={() => handleAddUser(member._id)}
                >
                  { member.imgUrl && <img src={member.imgUrl} className="choose-person-img" title={member.fullname} alt={member.fullname} aria-hidden="true" />}
                  { !member.imgUrl && <div className="choose-person"><span>{member.fullname[0]}</span></div>}
                  <span>{member.fullname}</span>
                </li>
              ))} */}
            </ul>
          </section>
        </section>
      )}
    </section>
  );
}

/* 

import { useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function PeopleCmp({ info, onUpdateEntity }) {
  const { selectedUsers, members } = info;
  const [openEditModel, setOpenEditModel] = useState(false);
  const [user, setUser] = useState(null);
  const [infoToEdit, setInfoToEdit] = useState(info);
  const modalRef = useRef();

  useEffect(() => {
    findUser()
  }, [info])

  function findUser() {
    console.log('selectedUsers' , selectedUsers)
    const userSelected = members.find(member => member._id === selectedUsers);
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
      selectedUsers: _id,
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
  );
}


*/
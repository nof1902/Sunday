import { useState } from "react";
import { useForm } from "../customHooks/useForm";

export function SidePanelSlideHeader({
  taskToEdit,
  onCloseModal,
  saveTaskCall,
}) {
  const [isList, setIsList] = useState(false);
  const [taskEdit, setTaskEdit, handleChange] = useForm(taskToEdit);

  function handleBlur() {
    saveTaskCall(taskEdit);
  }

  return (
    <section className="silde-panel-slide-header">
      <button className="close" onClick={onCloseModal}>
        <section className="btn-hover-svg">
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
        </section>
      </button>

      <input
        type="text"
        name="title"
        value={taskEdit.title}
        placeholder={taskEdit.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <section className="line">
        <section className="headers-general">
          <div className="selected-tab">
            <section className="main-table-tab">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="18"
                height="18"
                aria-hidden="true"
                className="icon_4b23d45e02 leftIcon_0e9d75fef6 noFocusStyle_cff5f5a050"
                datatestid="icon"
              >
                <path
                  d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Updates</span>
            </section>
          </div>
        </section>
      </section>

      {isList ? (
        <section className="updates-content">
          <h1>list of comments</h1>
        </section>
      ) : (
        <section className="no-updates-content">
          <img
            src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
            alt=""
          />
          <h1>No updates yet for this item</h1>
        </section>
      )}
    </section>
  );
}

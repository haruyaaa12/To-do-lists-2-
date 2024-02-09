import React, { useState, createContext, useContext } from "react";
import Modal from "react-modal";
 
const TaskContext = createContext();

const IndexPage = () => { 
  const [toDoList, setToDoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditIndex(null);
    setTaskName("");
  };

  const handleAddButtonClick = () => {
    openModal();
  };

  const handleModalSubmit = () => {
    closeModal();
    if (taskName.trim() !== "") {
      if (editIndex !== null) {
        const updatedToDoList = [...toDoList];
        updatedToDoList[editIndex] = { name: taskName };
        setToDoList(updatedToDoList);
      } else {
        setToDoList([...toDoList, { name: taskName }]);
      }
      setTaskName("");
      setEditIndex(null);
    }
  };

  const handleCompletedButtonClick = (index) => {
    const completedTask = toDoList[index];
    setCompletedList([...completedList, completedTask]);
    setToDoList(toDoList.filter((_, i) => i !== index));
  };

  const handleEditButtonClick = (index) => {
    setEditIndex(index);
    setTaskName(toDoList[index].name);
    openModal();
  };

  const handleDeleteButtonClick = (index) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList.splice(index, 1);
    setToDoList(updatedToDoList);
  };

  return (
    <TaskContext.Provider
      value={{
        toDoList,
        completedList,
        modalIsOpen,
        taskName,
        editIndex,
        setToDoList,
        setCompletedList,
        setModalIsOpen,
        setTaskName,
        setEditIndex,
      }}
    >
      <TaskComponent />
    </TaskContext.Provider>
  );
};

const TaskComponent = () => {
  const {
    toDoList,
    completedList,
    modalIsOpen,
    taskName,
    editIndex,
    setToDoList,
    setCompletedList,
    setModalIsOpen,
    setTaskName,
    setEditIndex,
  } = useContext(TaskContext);

  const [activeTab, setActiveTab] = useState("ToDo");  

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditIndex(null);
    setTaskName("");
  };

  const handleAddButtonClick = () => {
    openModal();
  };

  const handleModalSubmit = () => {
    closeModal();
    if (taskName.trim() !== "") {
      if (editIndex !== null) {
        const updatedToDoList = [...toDoList];
        updatedToDoList[editIndex] = { name: taskName };
        setToDoList(updatedToDoList);
      } else {
        setToDoList([...toDoList, { name: taskName }]);
      }
      setTaskName("");
      setEditIndex(null);
    }
  };

  const handleCompletedButtonClick = (index) => {
    const completedTask = toDoList[index];
    setCompletedList([...completedList, completedTask]);
    setToDoList(toDoList.filter((_, i) => i !== index));
  };

  const handleEditButtonClick = (index) => {
    setEditIndex(index);
    setTaskName(toDoList[index].name);
    openModal();
  };

  const handleDeleteButtonClick = (index) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList.splice(index, 1);
    setToDoList(updatedToDoList);
  };

  return (
    <>
      <div className="addTask">
        <button type="button" className="addTaskButton" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
        className="modal"
      >
        <textarea
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          rows={5}
          cols={40}
          placeholder="Enter texts here..."
          className="task-input"
        />
        <button onClick={handleModalSubmit}>{editIndex !== null ? "Edit Task" : "Add Task"}</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <div className="tab">
        <button className={`tablinks ${activeTab === "ToDo" ? "active" : ""}`} onClick={() => openTab("ToDo")}>
          To-Do List
        </button>
        <button
          className={`tablinks ${activeTab === "Completed" ? "active" : ""}`}
          onClick={() => openTab("Completed")}
        >
          Completed
        </button>
      </div>

      <div id="Completed" className={`tabcontent ${activeTab === "Completed" ? "active" : ""}`}>
        <ul className="task-list">
          {completedList.map((task, index) => (
            <li key={index}>{task.name}</li>
          ))}
        </ul>
      </div>

      <div id="ToDo" className={`tabcontent ${activeTab === "ToDo" ? "active" : ""}`}>
        <ul className="task-list">
          {toDoList.map((task, index) => (
            <li key={index}>
              <span>{task.name}</span>
              <button className="complete-button" onClick={() => handleCompletedButtonClick(index)}>
                Completed
              </button>
              <button className="edit-button" onClick={() => handleEditButtonClick(index)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteButtonClick(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IndexPage;

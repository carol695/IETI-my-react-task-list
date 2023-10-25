import Header from "./components/Header"
import { TaskList } from "./components/TaskList";
import React, {useState, useEffect} from "react";
import { useCreateTask } from "./hooks/useTaskList";
import Modal from "react-modal";


function App() {
  const [items, addItems, deleteItem, deleteAll] = useCreateTask([]);
  const [value, setValue] = useState('');
  const [description, setDesciption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [formValidation, setFormValidation] = useState({
    task:undefined,
    description:undefined,
  })

  function handleChange(event) {
    const val = event.target.value;
    setFormValidation({
      ...formValidation,
      task:val.length < 3? "task is too short":"",
    })
    setValue(val);

  }

  function handleDescriptionChange(event){
    const val = event.target.value;
    setFormValidation({
      ...formValidation,
      description:val.length === 0? "Description is required":"",
    })
    setDesciption(val);
  }

  function handleSubmit(event){
    event.preventDefault();
    addItems(value)
    setValue("")
    setDesciption("")
    handleCloseModal();
  }


  function handleDeleteAll(){
    localStorage.clear()
    deleteAll()
  }

  function handleDeleteItem(itemToDelete){
    deleteItem(itemToDelete)
  }

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setFormValidation({task:undefined,description:undefined})
    setIsOpen(false);
  };

  const isValid = Object.keys(formValidation).every(key=>formValidation[key]==="")

  return (
    <div className="App">
      <Header />
      <button onClick={handleOpenModal}>Agregar Tarea</button>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="taskName">Nombre de la Tarea</label>
            <input
              type="text"
              id="taskName"
              value={value}
              onChange={handleChange}
              className="form-control"
              placeholder="Escribe el nombre de la tarea"
              required
            />
            <span className="error-message">{formValidation.task}</span>
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Descripción de la Tarea</label>
            <input
              type="text"
              id="taskDescription"
              value={description}
              onChange={handleDescriptionChange}
              className="form-control"
              placeholder="Escribe la descripción de la tarea"
              required
            />
            <span className="error-message">{formValidation.description}</span>
          </div>
          <button disabled={!isValid} type="submit" className="btn btn-primary">
            Agregar Tarea
          </button>
        </form>
      </Modal>
  
      <TaskList list={items} onDeleteTask={handleDeleteItem} />
      <button onClick={handleDeleteAll} className="btn btn-danger">
        Eliminar Todas las Tareas
      </button>
    </div>
  );
}

export default App

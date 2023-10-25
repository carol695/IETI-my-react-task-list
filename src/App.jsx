import Header from "./components/Header"
import { TaskList } from "./components/TaskList";
import React, {useState, useEffect} from "react";
import { useCreateTask } from "./hooks/useTaskList";
import { Modal, Button, Flex, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import { AddIcon,DeleteIcon } from "@chakra-ui/icons";
import { useModalStyles } from "@chakra-ui/react";


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

  return(
    <Flex alignItems="center" justifyContent="center" minHeight="auto" flexDirection="column" className="App">
      <Header />
      <Button mb={7} onClick={handleOpenModal} colorScheme="teal" variant="outline" leftIcon={<AddIcon/>}>Agregar</Button>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Tarea</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={formValidation.task}>
              <FormLabel>Tarea</FormLabel>
              <Input value = {value} onChange={handleChange}/>
              <FormHelperText color={"red"}>{formValidation.task}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Input value = {description} onChange={handleDescriptionChange}/>
              <FormHelperText color={"red"}>{formValidation.description}</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}> Cancelar </Button>
            <Button colorScheme="green" onClick={handleSubmit} isDisabled={!isValid}>Agregar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <TaskList list={items} onDeleteTask={handleDeleteItem}/>
      <Button onClick={handleDeleteAll} colorScheme="teal" leftIcon={<DeleteIcon/>} mt={7}>Eliminar todos</Button>
    </Flex>
  );
}

export default App

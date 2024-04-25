
import React, { useEffect, useState } from "react"; 

  function App() {
    const [tasks,setTasks]=useState([]); 
    const [completedTasks,setCompletedTasks]=useState([]); 
    const [task,setTask]=useState([]); 
    const [priority,setPriority]=useState([]); 
    const [deadline,setDeadline]=useState([]); 
  

     const handleTaskChange =(e)=> {  
      setTask(e.target.value); 
     } 
     const handlePriorityChange =(e)=> {  
      setPriority(e.target.value); 
     }
     const handleDeadlineChange =(e)=> {  
      setDeadline(e.target.value); 
     } 

     const addTask =()=> { 
      if (task.trim()==="" || deadline ==='') { 
        alert("please enter a task and select a valid deadline ") 
        return;  

      }  
      const selectedDate = new Date(deadline) ;  
      const currentDate = new Date() ;   

      if (selectedDate <= currentDate) { 
        alert("please select a future date for deadline ") ; 
        return ;  
      }
      const newTask ={ 
        id:tasks.length +1 , 
        task,   
        priority, 
        deadline, 
        done : false ,
  
       } ;   
  
       setTasks([...tasks , newTask]) ; 
       setTask("") ; 
       setPriority("top");  
       setDeadline(""); 
     } 
       
     const markDone =(id)=> {  
      const updatedTask = tasks.map((t) => 
       t.id === id ? {...t , done : true} :t 
    ); 
         setTasks(updatedTask) ; 
         const completedTasks = tasks.find((t)=> t.id === id ); 
         if (completedTasks) { 
          setCompletedTasks ([...completedTasks , completedTasks])
         }
     } ; 

      
     const upcomingTasks = tasks.filter((t) => !t.done); 



    useEffect(() => {
      document.title = 'Hello devs'; // Set the document title
    }, []); // Empty dependency array ensures this effect runs only once after the initial render
  
    return (
      <div className="App"> 
      <header> 
          <h1>Task Scheduler</h1> 
      </header> 
      <main> 
          <div className="task-form"> 
              <input 
                  type="text"
                  id="task"
                  placeholder="Enter task..."
                  value={task} 
                  onChange={handleTaskChange} 
              /> 
              <select 
                  id="priority"
                  value={priority} 
                  onChange={handlePriorityChange} 
              > 
                  <option value="top">Top Priority</option> 
                  <option value="middle">Middle Priority</option> 
                  <option value="low">Less Priority</option> 
              </select> 
              <input 
                  type="date"
                  id="deadline"
                  value={deadline} 
                  onChange={handleDeadlineChange} 
              /> 
              <button id="add-task" onClick={addTask}> 
                  Add Task 
              </button> 
          </div> 
          <h2 className="heading">Upcoming Tasks</h2> 
          <div className="task-list" id="task-list"> 
              <table> 
                  <thead> 
                      <tr> 
                          <th>Task Name</th> 
                          <th>Priority</th> 
                          <th>Deadline</th> 
                          <th>Action</th> 
                      </tr> 
                  </thead> 


                  <tbody> 
                      {upcomingTasks.map((t) => ( 
                          <tr key={t.id}> 
                              <td>{t.task}</td> 
                              <td>{t.priority}</td> 
                              <td>{t.deadline}</td> 
                              <td> 
                                  {!t.done && ( 
                                      <button 
                                          className="mark-done"
                                          onClick={() => markDone(t.id)} 
                                      > 
                                          Mark Done 
                                      </button> 
                                  )} 
                              </td> 
                          </tr> 
                      ))} 
                  </tbody> 
              </table> 
          </div> 
          <div className="completed-task-list"> 
              <h2 className="cheading">Completed Tasks</h2> 
              <table> 
                  <thead> 
                      <tr> 
                          <th>Task Name</th> 
                          <th>Priority</th> 
                          <th>Deadline</th> 
                      </tr> 
                  </thead> 
                  <tbody> 
                      {completedTasks.map((ct) => ( 
                          <tr key={ct.id}> 
                              <td>{ct.task}</td> 
                              <td>{ct.priority}</td> 
                              <td>{ct.deadline}</td> 
                          </tr> 
                      ))} 
                  </tbody> 
              </table> 
          </div> 
      </main> 
  </div> 
); 

   
  }


export default App;

import {modalModule} from './modal'
import {displayQuests} from './display'
import{sideQuestModule} from './sidequest'




//closing modal button
document.querySelector(".close").addEventListener('click',modalModule.closeModule);

//access the add quest button
let add = document.getElementById("add");

//access the clear button
let clearbutton = document.getElementById("clearb");

//access clearcomp button
let clearcomp = document.getElementById("clearcomp");

//factory function that  creates quests
function quest(title,done,description,deadline){
    this.title = title
    this.done = done
    this.description = description
    this.deadline = deadline
  }

//factory function that creates sidequests
function sidequestfactory(name,tasks){
  this.name = name
  this.tasks = tasks
  
}

//Below is accessing the modal that shows the information of each task


//a function that loops through the main quests placing them in active or done
  displayQuests.display();

  
//*SQ below is the module for all the sidequest content, same functions as above applied to the side quests

sideQuestModule.dropdownside();


//Below is accessing the main quest button
document.getElementById("mainb").addEventListener('click',()=>{
  add.removeEventListener('click',sideQuestModule.addQuests);
  clearcomp.removeEventListener('click',sideQuestModule.clearcompl);
  clearbutton.removeEventListener('click',sideQuestModule.cleararray);
   displayQuests.display()})

   

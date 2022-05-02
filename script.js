
const actdiv = document.querySelector(".activeQuestContent")
const compldiv = document.querySelector(".completeQuestContent")

//*SQ* below is accessing the dropdown content
const sidediv = document.querySelector("#dropcont")

//access the add quest button
let add = document.getElementById("add");

//access the clear button
let clearbutton = document.getElementById("clearb");

//accessing the remove side quest button
let rmvsq = document.getElementById("removeSQ");

//*LS* this is the code to build the local storage
//*LS* below calls the taskarray storage or if empty an empty array
let quests = JSON.parse(localStorage.getItem("taskarray") || "[]");

//*SQ* this is the code to build the side quest implementation
//*SQ* below is the array for the side quests
//*SLQ* local storage for sidequests
let sidequests = JSON.parse(localStorage.getItem("sidequesttaskarray") || "[]");

//factory function that  creates quests
function quest(title,done){
    this.title = title
    this.done = done
  }

//factory function that creates sidequests
function sidequestfactory(name,tasks){
  this.name = name
  this.tasks = tasks
}

//Below is accessing the modal that shows the information of each task
const modalModule = (() => {
  //opens the modal
  const showModule = (t) =>{
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
  document.querySelector(".btns").style.display = "block";
  document.querySelector(".hiddenbtns").style.display = "none";
  let task = document.getElementById("taskName");
  task.textContent = t.target.dataset.taskName;
  let editbtn = document.getElementById("editbtn");
  editbtn.dataset.taskName = t.target.dataset.taskName;
  editbtn.dataset.array = t.target.dataset.array;
  editbtn.dataset.taskno = t.target.dataset.taskno;
  editbtn.dataset.projectno = t.target.dataset.projectno;
  
  editbtn.addEventListener('click',modalModule.editModule);
  
}
//closes module
const closeModule = () =>{
   let modal = document.getElementById("myModal");
   modal.style.display = "none";
}

const editModule = (t) =>{
  let inputtn = document.createElement("input");
  let inputtd = document.createElement("input");
  let inputtdead = document.createElement("input");
  document.getElementById("taskName").textContent = "";
  inputtn.placeholder =t.target.dataset.taskName
  inputtn.setAttribute("id","changeName");
  document.getElementById("taskName").appendChild(inputtn);
  document.querySelector(".btns").style.display = "none";
  document.querySelector(".hiddenbtns").style.display = "block";
  let saveBtn = document.getElementById("savebtn");
  saveBtn.dataset.taskno = t.target.dataset.taskno;
  saveBtn.dataset.projectno = t.target.dataset.projectno;
  saveBtn.dataset.projectnumber = t.target.dataset.projectno;
  console.log(t.target.dataset.array);
  saveBtn.dataset.array = t.target.dataset.array;
  let cnclBtn = document.getElementById("cancelbtn");
  saveBtn.addEventListener('click',modalModule.saveEdit)
  cnclBtn.addEventListener('click', modalModule.closeModule)

  

}

const saveEdit = (t) => {
console.log(t.target.dataset.array);

if(t.target.dataset.array === "1"){
let tt = t.target.dataset.taskno;
let chanName = document.getElementById("changeName");
if(chanName.value === ""){chanName.value = quests[tt].title}
quests[tt].title = chanName.value;
localStorage.setItem("taskarray", JSON.stringify(quests));
modalModule.closeModule();
displayQuests.display();
}
else{
let tt = t.target.dataset.taskno;
let pn = t.target.dataset.projectno;
let chanName = document.getElementById("changeName");
if(chanName.value === ""){chanName.value = quests[tt].title}
sidequests[pn].tasks[tt].title = chanName.value;
modalModule.closeModule();
localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
sideQuestModule.display(t);

}

}

return {showModule,closeModule,editModule,saveEdit}
})();

//a function that loops through the main quests placing them in active or done
const displayQuests =(()=> {

const display = () => {  
  add.addEventListener('click',displayQuests.addQuests)
  clearbutton.addEventListener('click',displayQuests.cleararray)
  document.querySelector("#header").textContent = "Main Quest"
  rmvsq.style.display = "none";
    actdiv.textContent= "";
  compldiv.textContent="";
  for(i=0;i<quests.length;i++){
   let div = document.createElement("div");

   let label = document.createElement("label")
   label.textContent = quests[i].title;
   label.setAttribute("id","label"+i)
   
   //adding modal functionality below
   label.dataset.taskName = quests[i].title;
   label.dataset.doneatt = quests[i].done;
   label.dataset.array = 1;
   label.dataset.taskno = i;
   label.addEventListener('click', modalModule.showModule);

   div.appendChild(label);
      
  if(quests[i].done === false){
   let input = document.createElement("div");
   let button = document.createElement("button");
   button.addEventListener('click',displayQuests.check);
   button.textContent = "Done";
   button.value = i;
   input.appendChild(button);
   div.appendChild(input);
   actdiv.appendChild(div)}
   else if(quests[i].done===true){compldiv.appendChild(div);}
  }
}

//changes task to done and updates local storage
const check = (t) => {
  let tt = t.target.value;
  quests[tt].done = true;
  localStorage.setItem("taskarray", JSON.stringify(quests));
  t.target.style.backgroundColor = "green";
  displayQuests.display();
}

//adding quests into  array using factory function
const addQuests = () =>{
  let c = prompt("Enter your quest young knight!");
  let title = c;
  let done = false;
  let q = new quest(title,done);
  quests.push(q);
  localStorage.setItem("taskarray", JSON.stringify(quests));
  displayQuests.display();
  
}


//clears the tasks without using the dreaded local storage clear
function cleararray(){
  actdiv.textContent= "";
  compldiv.textContent="";
  quests = [];
  localStorage.setItem("taskarray", JSON.stringify(quests));
}
  return{display,check,addQuests,cleararray}

})();
  displayQuests.display();

  






//*SQ below is the module for all the sidequest content, same functions as above applied to the side quests
const sideQuestModule =(() => {

//below code is to process sidequests in the dropdown list
const dropdownside = () =>{
  for(i=0;i<sidequests.length;i++){
    let a = document.createElement("a");
    a.textContent = sidequests[i].name;
    a.dataset.projectnumber = i;
    a.addEventListener('click',sideQuestModule.display);
    sidediv.appendChild(a);
    
  }
  let aa = document.createElement("a");
  aa.textContent = "Add Side Quest";
  aa.style = "background-color:yellow";
  aa.addEventListener('mouseover',()=>{aa.style.backgroundColor = "green"});
  aa.addEventListener('mouseleave',()=>{aa.style.backgroundColor = "yellow"});
  aa.addEventListener('click',sideQuestModule.addproject);
  sidediv.appendChild(aa);
}

  //generate sidequest content
const display = (t) => {
  let tt = t.target.dataset.projectnumber;

  rmvsq.style.display = "inline";
  rmvsq.dataset.projectnumber = tt;
  rmvsq.addEventListener('click',sideQuestModule.deleteSQ)
  
  add.dataset.projectnumber = tt;
  add.removeEventListener('click',displayQuests.addQuests);
  add.addEventListener('click',sideQuestModule.addQuests);

  clearbutton.dataset.projectnumber = tt;
  clearbutton.removeEventListener('click',displayQuests.cleararray);
  clearbutton.addEventListener('click', sideQuestModule.cleararray);

  
  document.querySelector("#header").textContent = sidequests[tt].name;
  //Below i am tryin to process the list for each of the tasks of the specific side project
  actdiv.textContent= "";
  compldiv.textContent="";

  for(i=0;i<sidequests[tt].tasks.length;i++){
   let div = document.createElement("div");

   let label = document.createElement("label")
   label.textContent = sidequests[tt].tasks[i].title;
   label.setAttribute("id","label"+i)

   //adding modal functionality below
   label.dataset.taskName = sidequests[tt].tasks[i].title;
   label.dataset.projectno = tt;
   label.dataset.taskno = i;
   label.addEventListener('click', modalModule.showModule);

   div.appendChild(label);
      
  if(sidequests[tt].tasks[i].done === false){
   let input = document.createElement("div");
   let button = document.createElement("button");
   button.textContent = "Done";
   button.value = i;
   button.dataset.projectnumber = tt;
   button.addEventListener('click',sideQuestModule.check);
   
   input.appendChild(button);
   div.appendChild(input);
   actdiv.appendChild(div)}
   else if(sidequests[tt].tasks[i].done === true){compldiv.appendChild(div);}

  
  }
}

//Deletes sidequest from array and takes you back to the main quest menu
const deleteSQ = (t) => {
  let tt = t.target.dataset.projectnumber
  sidequests.splice(tt,1);
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  displayQuests.display();
  sidediv.textContent = "";
  sideQuestModule.dropdownside();

}

//changes side task to done and updates local storage
const check = (t) => {
  let tt = t.target.dataset.projectnumber;
  console.log(tt);
  let pp = t.target.value
  console.log(pp)
  sidequests[tt].tasks[pp].done = true;
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  t.target.style.backgroundColor = "green";
  sideQuestModule.display(t);
  
}

//adding sidequests to sidequests
const addproject  = () =>{
  let c = prompt("Enter the name of your side quest");
  let name = c;
  let tasks = [];
  let q = new sidequestfactory(name,tasks);
  sidequests.push(q);
    for (i=0;i<sidequests.length;i++){sidediv.removeChild(sidediv.firstElementChild);}
    localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.dropdownside();

}

//adding quests into  array using factory function
const addQuests = (t) =>{
  let c = prompt("Enter your quest young knight!");
  let title = c;
  let done = false;
  let tt = t.target.dataset.projectnumber;
  console.log(tt);
  let q = new quest(title,done);

  sidequests[tt].tasks.push(q);
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.display(t);
  
}

//clears the tasks without using the dreaded local storage clear
function cleararray(t){
  let tt = t.target.dataset.projectnumber;
  actdiv.textContent= "";
  compldiv.textContent="";
  sidequests[tt].tasks = [];
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
}



  return{dropdownside,display,check,addQuests,cleararray,addproject,deleteSQ}

})();
sideQuestModule.dropdownside();


//Below is accessing the main quest button
document.getElementById("mainb").addEventListener('click',()=>{
  add.removeEventListener('click',sideQuestModule.addQuests);
   displayQuests.display()})

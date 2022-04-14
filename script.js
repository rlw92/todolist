
const actdiv = document.querySelector(".activeQuestContent")
const compldiv = document.querySelector(".completeQuestContent")
const quests = [{title:"Wash Hair",
                 done:false
                }];
//factory function that  creates quests
function quest(title,done){
    this.title = title
    this.dateSet = dateSet
    this.dateDue = dateDue
    if(che.checked === true){r = "done"}
  else if(che.checked === false){r = "not done"}
    this.done = done
  }

//a function that loops through the quests placing them in active or done
const displayQuests =()=> {
  for(i=0;i<quests.length;i++){
   let div = document.createElement("div");
   let label = document.createElement("label")
   label.textContent = quests[i].title;
   label.setAttribute("id","label"+i)
   let input = document.createElement("input");
   input.type = "checkbox";
   input.setAttribute("id",'inpu'+i);
   div.appendChild(input);
   div.appendChild(label);
   if(quests[i].done === true){
   compldiv.appendChild(div)}
   else{actdiv.appendChild(div);}
}} 
displayQuests();

//trying to get the checkbox button to work

let label0 = document.getElementById("label0");
let inpu0 = document.getElementById("inpu0");
inpu0.onclick = iop;
 
function iop(){
  if(inpu0.checked === true){document.body.style = "background-color:green;"}
  else(document.body.style = "background-color:yellow;")
}
iop();


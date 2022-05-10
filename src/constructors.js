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

export{quest, sidequestfactory}
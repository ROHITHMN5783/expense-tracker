//add to the display all input from user
function display() {
   const expendinput = document.querySelector('.input1');
   const descriptioninput = document.querySelector('.input2');
   const categoryinput = document.querySelector('#category');

   const expenditure = expendinput.value;
   const descriptions = descriptioninput.value;
   const category = categoryinput.value;

   const obj1 = {
      expenditure: expenditure,
      descriptions: descriptions,
      category: category
   };
   //SAVE THE OBJECT TO LOCAL STORAGE
   localStorage.setItem('expense', JSON.stringify(obj1));

   //display the values on the screen
   const expenselist = document.querySelector('.expense-list')
      let lists=document.createElement("li");
   lists.textContent = `Expenditure: ${expenditure}, Description: ${descriptions}, Category: ${category}`;
   expenselist.appendChild(lists);

}
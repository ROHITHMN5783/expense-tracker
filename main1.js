let expenses = [];

function addExpense() {
   const expenditureInput = document.querySelector('.input1');
   const descriptionInput = document.querySelector('.input2');
   const categoryInput = document.querySelector('#category');

   const expenditure = expenditureInput.value;
   const description = descriptionInput.value;
   const category = categoryInput.value;

   const expenseObj = {
      expenditure: expenditure,
      description: description,
      category: category
   };

   expenses.push(expenseObj);

   localStorage.setItem('expenses', JSON.stringify(expenses));
   displayExpenses();
}

function deleteExpense(index) {
   expenses.splice(index, 1);
   localStorage.setItem('expenses', JSON.stringify(expenses));
   displayExpenses();
}

function displayExpenses() {
   const expenseList = document.querySelector('.expense-list');
   expenseList.innerHTML = '';

   const retrievedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

   retrievedExpenses.forEach((expense, index) => {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('item');
      expenseItem.innerHTML = `
         <p>Expenditure: ${expense.expenditure}, Description: ${expense.description}, Category: ${expense.category}</p>
         <button class="btndel" onclick="deleteExpense(${index})">Delete</button>
         <button class="btn-edit" onclick="editExpense(${index})">Edit</button>
      `;
      expenseList.appendChild(expenseItem);
   });
}

displayExpenses();
function editExpense(index) {
   const expenseList = document.querySelector('.expense-list');
   const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

   // Get the expense at the specified index
   const expense = expenses[index];

   // Create a form to edit the expense details
   const form = document.createElement('form');
   form.classList.add('edit-form');

   // Create input fields for each expense property
   const expenditureInput = document.createElement('input');
   expenditureInput.type = 'number';
   expenditureInput.value = expense.expenditure;
   expenditureInput.required = true;

   const descriptionInput = document.createElement('input');
   descriptionInput.type = 'text';
   descriptionInput.value = expense.description;
   descriptionInput.required = true;

   const categoryInput = document.createElement('select');
   const categories = ['Food', 'Entertainment', 'Transportation', 'Movie', 'Others'];
   categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      if (expense.category === category) {
         option.selected = true;
      }
      categoryInput.appendChild(option);
   });

   // Create a save button to update the expense
   const saveButton = document.createElement('button');
   saveButton.textContent = 'Save';
   saveButton.type = 'submit';

   // Handle form submission to update the expense
   form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Update the expense object with the new values
      expense.expenditure = expenditureInput.value;
      expense.description = descriptionInput.value;
      expense.category = categoryInput.value;

      // Update the expenses array in local storage
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Remove the edit form and display the updated expenses
      expenseList.removeChild(form);
      displayExpenses();
   });

   // Append the input fields and save button to the form
   form.appendChild(expenditureInput);
   form.appendChild(descriptionInput);
   form.appendChild(categoryInput);
   form.appendChild(saveButton);

   // Add the form to the expense list
   expenseList.appendChild(form);
}

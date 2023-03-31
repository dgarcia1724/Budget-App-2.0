// Budget
const initialAmountInput = document.querySelector(".initialAmount");
const setBudgetBtn = document.querySelector(".setBudget");
let currentAmount = 0;
let currentBalance = 0;
let currentExpenses = 0;

// 3 columns
const totalBudget = document.querySelector(".totalBudget span");
const expenses = document.querySelector(".expenses span");
const balance = document.querySelector(".balance span");

// Expenses
const productTitle = document.querySelector(".enterTitle");
const productCost = document.querySelector(".enterCost");
const checkAmountBtn = document.querySelector(".checkAmount");

// List
const expenseList = document.querySelector(".expenseList");

const updateThreeColumns = function () {
  currentBalance = currentAmount - currentExpenses;

  // display total budget
  totalBudget.innerHTML = Number(currentAmount);
  // display total balance
  balance.innerHTML = Number(currentBalance);
  // display total expenses
  expenses.innerHTML = Number(currentExpenses);
};

setBudgetBtn.addEventListener("click", function () {
  if (initialAmountInput.value >= 0) {
    currentAmount = Number(initialAmountInput.value);
    updateThreeColumns();
  }
});

checkAmountBtn.addEventListener("click", function () {
  if (!productTitle.value == "" && productCost.value > 0) {
    currentExpenses += Number(productCost.value);
    updateThreeColumns();

    // Add to ExpenseList
    expenseList.innerHTML += `
      <div class='item'>
      <span class='spanOne'>${productTitle.value}</span>
      <span class='spanTwo'>${Number(productCost.value)}</span>
      <button class='edit'>Edit</button>
      <button class='deleteX'>X</button>
      </div>
    `;

    // delete individual
    const deleteX = document.querySelectorAll(".deleteX");
    for (let i = 0; i < deleteX.length; i++) {
      deleteX[i].addEventListener("click", function () {
        deleteX[i].parentNode.remove();
      });
    }

    // edit current item
    const edit = document.querySelectorAll(".edit");
    for (let i = 0; i < edit.length; i++) {
      edit[i].addEventListener("click", function () {
        const updateBtn = document.querySelector(".update");
        const parentEdit = edit[i].parentNode;

        checkAmountBtn.style.display = "none";
        updateBtn.style.display = "block";

        // show current values under Expenses
        productTitle.value = parentEdit.querySelector(".spanOne").innerHTML;
        productCost.value = parentEdit.querySelector(".spanTwo").innerHTML;
        updateBtn.addEventListener("click", function () {
          parentEdit.querySelector(".spanOne").innerHTML = productTitle.value;
          parentEdit.querySelector(".spanTwo").innerHTML = productCost.value;
          // revert buttons
          updateBtn.style.display = "none";
          checkAmountBtn.style.display = "block";
        });
      });
    }
  }
});

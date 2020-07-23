document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/api/v1/calorie_entries/";
  let caloriesList = document.getElementById("calories-list");
  let calPlaceholder = document.getElementById("cal-input");
  let notesPlaceholder = document.getElementById("notes-input");
  let calFormInputs = document.getElementById("new-calorie-form");

  const fetchItems = () => {
    fetch(baseUrl)
      .then((resp) => resp.json())
      .then((data) => {
        displayItems(data);
      });
  };

  const displayItems = (items) => {
    items.forEach((item) => {
      let lightItem = { id: item.id, calorie: item.calorie, note: item.note };
      displayNewItem(lightItem);
    });
  };

  const displayNewItem = (itemProperties) => {
    let newListItem = document.createElement("div");

    newListItem.innerHTML = 
     `<li class="calories-list-item">
    <div class="uk-grid">
    <div class="uk-width-1-6">
      <strong>${itemProperties.calorie}</strong>
      <span>kcal</span>
    </div>
    <div class="uk-width-4-5">
      <em class="uk-text-meta">${itemProperties.note}</em>
    </div>
    </div>
    <div class="list-item-menu">
      <a class="edit-button" uk-toggle="target: #edit-form-container" uk-icon="icon: pencil"></a>
      <a class="delete-button" uk-icon="icon: trash"></a>
    </div>
    </li>`;

    caloriesList.appendChild(newListItem);
    let editBtn = newListItem.getElementsByClassName("edit-button")[0];
    let deleteBtn = newListItem.getElementsByClassName("delete-button")[0];

    addCalProgress(itemProperties.calorie);
    editBtnHandler(itemProperties, editBtn);
    deleteBtnHandler(itemProperties, deleteBtn);
  };

  const addCalProgress = (calories) => {
    let currProgress = document.querySelector(".uk-progress");
    currProgress.value += calories;
  };

  const editBtnHandler = (itemProperties, editBtn) => {
    editBtn.addEventListener("click", () => {
      prePopulateForm(itemProperties);
      itemUpdateHandler(itemProperties.id);
    });
  };

  const prePopulateForm = (itemProperties) => {
    calPlaceholder.value = itemProperties.calorie;
    notesPlaceholder.value = itemProperties.note;
  };

  const itemUpdateHandler = (itemId) => {
    let updateBtn = document.getElementById("update-btn");
    updateHandler(updateBtn, itemId);
  };

  const updateHandler = (updateBtn, itemId) => {
    updateBtn.addEventListener("click", () => {
      getNewProperties(itemId);
    });
  };

  const getNewProperties = (itemId) => {
    let updateCals = document.getElementById("cal-input");
    let updateNote = document.getElementById("notes-input");
    let updatedItem = {
      id: itemId,
      calorie: parseInt(updateCals.value),
      note: updateNote.value,
    };
    updateRequest(updatedItem);
  };

  const updateRequest = (updatedItem) => {
    fetch(baseUrl + updatedItem.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(updatedItem),
    }).then((resp) => resp.json());
    fetchItems();
  };

  const deleteBtnHandler = (itemProperties, deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      deleteItem(itemProperties);
      deleteDisplayItem(deleteBtn);
    });
  };

  const deleteDisplayItem = (deleteBtn) => {
    deleteBtn.parentNode.parentNode.remove();
  };

  const deleteItem = (itemProperties) => {
    fetch(baseUrl + itemProperties.id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(itemProperties),
    });
  };

  const addListItemHandler = () => {
    let submitBtn = calFormInputs[2];
    submitBtn.addEventListener("click", (e) => {
      getCalProperties();
    });
  };

  const getCalProperties = () => {
    let cals = calFormInputs[0].value;
    let notes = calFormInputs[1].value;

    const itemProperties = { calorie: cals, note: notes };
    createListItem(itemProperties);
  };

  const createListItem = (itemProperties) => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(itemProperties),
    }).then((resp) => resp.json());
    fetchItems();
  };

  const calcBmrHandler = () => {
    let calculateBtn = document.getElementById("calculate");
    calculateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getBmrProperties();
    });
  };

  const getBmrProperties = () => {
    let bmrWeightInput = document.getElementById("bmrWeight").value;
    let bmrHeightInput = document.getElementById("bmrHeight").value;
    let bmrAgeInput = document.getElementById("bmrAge").value;

    let bmrFormValues = {
      weight: parseInt(bmrWeightInput, 10),
      height: parseInt(bmrHeightInput, 10),
      age: parseInt(bmrAgeInput, 10),
    };
    calculateBmr(bmrFormValues);
  };

  const calculateBmr = (bmrValues) => {
    let lwrRange = document.getElementById("lower-bmr-range");
    let uprRange = document.getElementById("higher-bmr-range");
    let lowerRange =
      655 + 
      4.35 * bmrValues.weight + 
      bmrValues.height - 
      4.7 * bmrValues.age;
      
    let upperRange =
      66 +
      6.23 * bmrValues.weight +
      12.7 * bmrValues.height -
      6.8 * bmrValues.age;

    lwrRange.innerText = parseInt(lowerRange, 10);
    uprRange.innerText = parseInt(upperRange, 10);
    configProgressBar(lowerRange, upperRange);
  };

  const configProgressBar = (lowerRange, upperRange) => {
    let currProgress = document.querySelector(".uk-progress");
    let max = parseInt((lowerRange + upperRange) / 2);
    currProgress.max = max;
  };

  const init = () => {
    calcBmrHandler();
    addListItemHandler();
    fetchItems();
  };

  init();
});
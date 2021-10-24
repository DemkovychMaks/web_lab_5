export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = 'delete-button-';
const nameInput = document.getElementById("name_input");
const descriptionInput = document.getElementById("description_input");
const priceInput = document.getElementById("price_input");

const cardsContainer = document.getElementById("cards_container");

const cardTemplate = ({ id, name, description, price }) => `
<li id="${id}" class="card">
  <img
    src="https://media-live.byredo.com/__live__/media/catalog/product/cache/e89ded5c3be6e202567b1bd230ddcb22/p/a/packshot_grey_background_perfume_1500x1680.jpg?w=720&h=806&org_if_sml=1"
    class="card__image" alt="card">
  <div>
    <h5>${name}</h5>
    <p>${description}</p>
    <p>Price: ${price} $.</p>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="edit_button">
      Edit
    </button>
    <button id="${DELETE_BUTTON_PREFIX}${id}" type="button" class="delete_button">
      Delete
    </button>
  </div>
</li>`;

export const addCardToPage = ({ id, name, description, price }, onEditItem, onDeleteItem) => {
    cardsContainer.insertAdjacentHTML(
      "afterbegin",
      cardTemplate({ id, name, description, price })
    );

    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
    const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);

    editButton.addEventListener("click", onEditItem);
    deleteButton.addEventListener("click", onDeleteItem);
  };

  export const renderCardsList = (cards, onEditItem, onDeleteItem) => {
    cardsContainer.innerHTML = "";
    for (const card of cards) {
      addCardToPage(card, onEditItem, onDeleteItem);
    }
  }; 

  export const getInputValues = () => {
    return {
        name: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
    };
  };
  export const clearInputs = () => {
    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
  };
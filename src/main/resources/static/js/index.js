import {
  getInputValues,
  renderCardsList,
  EDIT_BUTTON_PREFIX,
    DELETE_BUTTON_PREFIX,
  clearInputs
} from "./dom_util.js"
import {deletePerfume, getAllPerfumes, postPerfume, updatePerfume} from "./api.js";

const submitButton = document.getElementById("submit_button");

const searchButton = document.getElementById("search_btn");
const clearSearchButton = document.getElementById("clear_search_btn");
const searchInput = document.getElementById("search_input");
const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_btn");


let perfumes = [];


const onEditItem = async (e) => {
  const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");

  await updatePerfume(itemId, getInputValues())

  clearInputs();

    refetchAllPerfumes();
};

const onDeleteItem = async (e) => {
    const itemId = e.target.id.replace(DELETE_BUTTON_PREFIX, "");
    await deletePerfume(itemId)
    refetchAllPerfumes();
}

export const refetchAllPerfumes = async () => {
    const allPerfumes = await getAllPerfumes();

    perfumes = allPerfumes.sort((a,b) =>b.name.localeCompare(a.name));

    renderCardsList(perfumes, onEditItem, onDeleteItem);
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const { name, description, price } = getInputValues();

    postPerfume({
        name,
        description,
        price
    }).then(refetchAllPerfumes);
    clearInputs();

});

searchButton.addEventListener("click", () => {
  const foundPerfumes = perfumes.filter(
    (perfume) => perfume.name.search(searchInput.value) !== -1);
  renderCardsList(foundPerfumes, onEditItem, onDeleteItem);
});

clearSearchButton.addEventListener("click", () => {
  renderCardsList(perfumes, onEditItem, onDeleteItem);
  searchInput.value = "";
});

sortCheckbox.addEventListener("change", function (e) {
    if (this.checked) {
        const sortedPerfumes = perfumes.sort(
            (card1, card2) => parseFloat(card1.price) - parseFloat(card2.price));
        renderCardsList(sortedPerfumes, onEditItem, onDeleteItem);
    }
    else {
        refetchAllPerfumes();
    }
});


countButton.addEventListener("click", () => {
    let sum = perfumes.map(o => o.price).reduce((a, c) => { return a + c });
    document.getElementById("total-price").innerText = sum;
    console.log(sum);
})

refetchAllPerfumes();
let isEdit = false;
function addCard({ title, img, body, id, provider }) {
    const container = document.createElement("div");
    container.classList.add("main__card");
    container.classList.add("card");
    container.id = id;
    const info = document.createElement("div");
    info.classList.add("main__info");
    info.classList.add("card-body");
    const titleContainer = document.createElement("h5");
    titleContainer.classList.add("main__card-title");
    titleContainer.classList.add("card-title");
    titleContainer.append(document.createTextNode(title));
    const bodyContainer = document.createElement("p");
    bodyContainer.classList.add("main__body");
    bodyContainer.classList.add("card-text");
    bodyContainer.append(document.createTextNode(`Описание: ${body}`));
    const providerContainer = document.createElement("p");
    //providerContainer.classList.add("provider");
    providerContainer.classList.add("main__provider");
    providerContainer.classList.add("card-text");
    providerContainer.append(document.createTextNode(`Поставщик: ${provider}`));
    const idContainer = document.createElement("p");
    idContainer.classList.add("main__id");
    idContainer.classList.add("id");
    idContainer.append(document.createTextNode(`ID: ${id}`));
    const imgContainer = document.createElement("img");
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("main__buttons");
    const editBtn = document.createElement("button");
    editBtn.classList.add("main__button");
    editBtn.classList.add("btn-primary");
    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editItem({ title, img, body, id, provider });
    }, );
    editBtn.append(document.createTextNode("Изменить"));
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("main__button");
    deleteBtn.classList.add("btn-primary");
    deleteBtn.append(document.createTextNode("Удалить"));
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteItem(id);
    });
    imgContainer.src = img;
    imgContainer.style.height = "100%";
    imgContainer.style.width = "100%";
    info.append(titleContainer);
    info.append(bodyContainer);
    info.append(providerContainer);
    info.append(idContainer);
    buttonContainer.append(editBtn);
    buttonContainer.append(deleteBtn);
    container.append(imgContainer);
    container.append(info);
    container.append(buttonContainer);
    return container;
}

function setup() {
    window.localStorage.clear();
    window.location.reload();
}
function addItem(item) {
    const cardsContainer = window.document.querySelector(".main__cards");
    cardsContainer.append(addCard(item));
}
function editItem(data) {

    console.log("inside editItem:", isEdit);

    isEdit = true;
    const form = document.querySelector(".main .add-form");
    const inputs = form.querySelectorAll("input");
    const textarea = form.querySelector("textarea");
    const button = document.querySelector(".add-button");
    //console.log(button);
    button.textContent = "Изменить";
    inputs.forEach((item) => (item.value = data[item.id]));

    form.addEventListener(
        "submit",
        (e) => {
            //isEdit = true;
            e.preventDefault();
            const items = JSON.parse(window.localStorage.getItem("cards"));
            const obj = {};
            inputs.forEach((item) => (obj[item.id] = item.value));

            let indexOf = -1;
            items.forEach((item, index) => {
                if (+obj.id === item.id) {
                    indexOf = index;
                }
            });
            items[indexOf] = obj;
            window.localStorage.setItem("cards", JSON.stringify(items));
            inputs.forEach((item) => (item.value = ""));
            //textarea.value = "";
            const itemToChange = document.getElementById(data.id)
            button.textContent = "Добавить";

            itemToChange.querySelector('img').src = obj.img;
            itemToChange.querySelector('.main__card-title.card-title').textContent = obj.title;
            itemToChange.querySelector('.main__body.card-text').textContent = `Описание: ${obj.body}`;
            itemToChange.querySelector('.main__provider.card-text').textContent = `Поставщик: ${obj.provider}`;
            itemToChange.querySelector('.main__id.id').textContent = `ID: ${obj.id}`;

            isEdit = false;
        },
        { once: true }
    );
}
function deleteItem(id) {
    const cards = window.document.querySelector(".main__cards");
    const cardsStorage = JSON.parse(window.localStorage.getItem("cards"));
    const card = cards.querySelector(`[id="${id}"]`);
    const newCards = cardsStorage.filter((item) => item.id !== id);
    window.localStorage.setItem("cards", JSON.stringify(newCards));
    card.remove();
}
document.addEventListener("DOMContentLoaded", function () {
    const cards = JSON.parse(window.localStorage.getItem("cards"));
    const cardsContainer = window.document.querySelector(".main__cards");
    if (cards) {
        cards.map((item) => cardsContainer.append(addCard(item)));
    } else {
        const cards = [
            {
                title: "База 1",
                img: "https://znanium.com/cover/1900/1900074.jpg",
                body: "Первый том",
                id: 1,
                provider: "Зорич",
            },
            {
                title: "База 2",
                img: "https://s1.livelib.ru/boocover/1000200213/200x305/c655/boocover.jpg",
                body: "Второй том",
                id: 2,
                provider: "Зорич2",
            },
        ];
        cards.map((item) => cardsContainer.append(addCard(item)));
        window.localStorage.setItem("cards", JSON.stringify(cards));
    }
});
const setupButton = document.querySelector(".setup.btn-primary");
const form = document.querySelector(".main__form.add-form");
setupButton.addEventListener("click", setup);

form.addEventListener("submit", (evt) => {
    console.log("inside Submit:", isEdit);
    evt.preventDefault();
    if (!isEdit) {
        const cards = JSON.parse(window.localStorage.getItem("cards"));

        const obj = {};
        const inputs = evt.target.querySelectorAll("input");
        inputs.forEach((item) => (obj[item.id] = item.value));
        cards.push(obj);
        window.localStorage.setItem("cards", JSON.stringify(cards));
        addItem(obj);
        inputs.forEach((item) => (item.value = ""));
    }
});

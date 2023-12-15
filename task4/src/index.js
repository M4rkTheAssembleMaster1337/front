let isEdit = false;
const spinner = document.querySelector('.main__spinner.spinner-border')
const header = document.querySelector('.header h3');
async function getItemsAsync(){
    spinner.style.display = 'flex';
    const res = await fetch('http://localhost:3000/items');
    spinner.style.display = 'none';
    return await res.json();
}

async function creatorInfo(){
    const res = await fetch(' http://localhost:3000/creatorInfo');
    const data = await res.json();
    header.textContent = `${data.name} ${data.group} ${data.repo}`
}

async function getItemAsync(id){
    spinner.style.display = 'flex';
    const res = await fetch(`http://localhost:3000/items/${id}`);
    const data = res.json();
    spinner.style.display = 'none';
    return data;
}

async function editAsync(data){
    spinner.style.display = 'flex';
    await fetch(`http://localhost:3000/items/${data.id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then((res) =>  {
        spinner.style.display = 'none';
        return res.json()}).catch((e) => console.error(e));
}

async function addAsync(data){
    spinner.style.display = 'flex';
    return await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        spinner.style.display = 'none';
        return res.json()
    }).catch((e) => console.error(e));
}

async function deleteAsync(id){
    spinner.style.display = 'flex';
    await fetch(`http://localhost:3000/items/${id}`,{
        method: 'DELETE'
    });
    spinner.style.display = 'none';
}






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
        getItemAsync(id).then((res)=>editItem(res,id)); // CHANGE!!!!
    });
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
(function onLoad(){
    const cardsContainer = window.document.querySelector(".main__cards");
    getItemsAsync().then((items) => items.map((item) => cardsContainer.append(addCard(item))));
}());
creatorInfo();


function addItem(item) {
    const cardsContainer = window.document.querySelector(".main__cards");
    cardsContainer.append(addCard(item));
}
function editItem(data, id) {

    console.log("inside editItem:", isEdit);

    console.log(data);

    console.log(id);

    isEdit = true;
    const form = document.querySelector(".main .add-form");
    const inputs = form.querySelectorAll("input");
    //const textarea = form.querySelector("textarea");
    const button = document.querySelector(".add-button");
    //console.log(button);
    button.textContent = "Изменить";
    inputs.forEach((item) => (item.value = data[item.id]));

    form.addEventListener(
        "submit",
        (e) => {
            //isEdit = true;
            e.preventDefault();
            //const items = JSON.parse(window.localStorage.getItem("cards"));
            const obj = {};
            inputs.forEach((item) => (obj[item.id] = item.value));
            obj.id = id;
            editAsync(obj).catch(console.error);
            //window.localStorage.setItem("cards", JSON.stringify(items));
            inputs.forEach((item) => (item.value = ""));
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
    const item = document.getElementById(id);
    deleteAsync(id).catch(console.error);
    item.remove();
}
// document.addEventListener("DOMContentLoaded", function () {
//     const cards = JSON.parse(window.localStorage.getItem("cards"));
//     const cardsContainer = window.document.querySelector(".main__cards");
//     if (cards) {
//         cards.map((item) => cardsContainer.append(addCard(item)));
//     } else {
//         const cards = [
//             {
//                 title: "База 1",
//                 img: "https://znanium.com/cover/1900/1900074.jpg",
//                 body: "Первый том",
//                 id: 1,
//                 provider: "Зорич",
//             },
//             {
//                 title: "База 2",
//                 img: "https://s1.livelib.ru/boocover/1000200213/200x305/c655/boocover.jpg",
//                 body: "Второй том",
//                 id: 2,
//                 provider: "Зорич2",
//             },
//         ];
//         cards.map((item) => cardsContainer.append(addCard(item)));
//         window.localStorage.setItem("cards", JSON.stringify(cards));
//     }
// });
const setupButton = document.querySelector(".setup.btn-primary");
const form = document.querySelector(".main__form.add-form");

function clearAllCards(){
    return getItemsAsync().then((data) => data.forEach((item) => deleteAsync(item.id)));
}

function setup() {
    const data = {
        "id": 1,
        "title": "Default item 1",
        "body": "Item 1",
        "img": "https://s1.livelib.ru/boocover/1000200213/200x305/c655/boocover.jpg",
        "code": "1",
        "provider": "someone 1"
    };
    clearAllCards().then(() => addAsync(data).then(() => window.location.reload()));
}

setupButton.addEventListener("click", (e) => {
    e.preventDefault();
    setup();
});

form.addEventListener("submit", (evt) => {
    console.log("inside Submit:", isEdit);
    evt.preventDefault();
    if (!isEdit) {
        //const cards = JSON.parse(window.localStorage.getItem("cards"));
        const cardsContainer = window.document.querySelector(".main__cards");
        const obj = {};
        const inputs = evt.target.querySelectorAll("input");
        inputs.forEach((item) => (obj[item.id] = item.value));
        addAsync(obj).then((res)=>cardsContainer.append(addCard(res)));
        inputs.forEach((item) => (item.value = ""));
    }
});

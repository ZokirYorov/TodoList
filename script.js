console.log("Natijani chiqarish")

let filterSana = document.getElementById("filter-sana")
let input = document.getElementById("item-id")

let input2 = document.getElementById("input-item")
let content = document.getElementById("content")

let listData = JSON.parse(localStorage.getItem("listData"));
if (!listData) {
    listData = []
}
renderList();

let alert = document.getElementById("alert")

function mybutton() {
    listData = JSON.parse(localStorage.getItem("listData"));
    if (!listData){
        listData = [];
    }
    if (input.value === "") {
        let alertItem = document.createElement("div")
        alertItem.classList.add("alert-item")
        alertItem.innerText = "Maydonni to'ldiring";
        alert.append(alertItem)
        setTimeout(() => {
            alert.removeChild(alertItem);
        }, 3000)
        return;
    } else
    if (input2.value === "") {
        let alertItem = document.createElement("div")
        alertItem.classList.add("alert-item")
        alertItem.innerText = "Sanani kiriting";
        alert.append(alertItem)
        setTimeout(() => {
            alert.removeChild(alertItem);
        }, 3000)

        return;

        } else {
    listData.push(
        {
            id: new Date().getMilliseconds(),
            checkbox: false,
           text: input.value,
           sana: input2.value,
        }

    );
    }

    localStorage.setItem("listData", JSON.stringify(listData));
    renderList();
    input.value = "";
    input2.value = "";
}

function filtertozalash() {
    localStorage.setItem("filterSana", filterSana.value)
    renderList()
}

function renderList() {

    content.innerHTML = "";
    listData = JSON.parse(localStorage.getItem("listData"));
    if (listData) {

        if (localStorage.getItem("filterSana")) {
            filterSana.value = localStorage.getItem("filterSana")
            listData = listData.filter(item => item.sana === localStorage.getItem("filterSana"))
        }
        listData.sort((a, b) => new Date( a.sana) - new Date( b.sana))
        for (const listItem of listData) {
            const lists = document.createElement("div")
            lists.classList.add("lists")

            let check = document.createElement("input")

            if (listItem.checked) {
                lists.classList.add("succes")
            } else
                if (new Date(listItem.sana) < new Date().setHours(5,0,0,0)) {
                    lists.classList.add("danger")
            }

            check.type = "checkbox"
            check.classList.add("check")
            check.checked = listItem.checked
            check.addEventListener('click', () => {
                checkedItem(listItem)
            })

            let list = document.createElement("div")
            list.classList.add("list")
            if (listItem.checked) {
                list.classList.add("active")
            }
            list.innerText = listItem.text;

            let list2 = document.createElement("div")
            list2.classList.add("list2")
            if (listItem.checked){
                list2.classList.add("active")
            }
            list2.innerText = listItem.sana

            let removeIcon = document.createElement("div");
            removeIcon.classList.add("material-icons")
            removeIcon.style.cursor = 'pointer';
            removeIcon.innerText = "close"
            removeIcon.addEventListener('click', () => {
                deleteItem(listItem)
            })

            lists.appendChild(check)
            lists.appendChild(list)
            lists.appendChild(list2)
            lists.appendChild(removeIcon)
            content.appendChild(lists)
        }
    }
}
function checkedItem(listItem) {
    listData = JSON.parse(localStorage.getItem("listData"));
    const index = listData.findIndex(x => x.id === listItem.id)

    listData[index].checked = !listData[index].checked;
    localStorage.setItem("listData", JSON.stringify(listData))
    renderList();
}

function deleteItem(listItem) {
    listData = JSON.parse(localStorage.getItem("listData"));
    const index = listData.findIndex(x => x.id === listItem.id)
    listData.splice(index, 1)
    localStorage.setItem("listData", JSON.stringify(listData))
    renderList();
}

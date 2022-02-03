const update = (data) => {
    todo.innerHTML = '';
    data.forEach((item) => {
        todo.innerHTML += `
        <div class = "${item.done ? "card card_done" : "card"}" id=${item.id}>
        ${item.title}
            <button class = 'btnDelete'> Delete </button>
            <button class = 'btnDone'> Done </button>
            <button class = 'btnEdit'> Edit </button>
        </div>
        `
    })
};

const getIndex = (data) => {
    const card = event.target.closest(".card");
    const cardId = +card.id;
    const cardIndex = data.findIndex(item => item.id === cardId);
    return cardIndex;
}

const init = () => { 
    const form = document.querySelector('#form');
    const inputText = document.querySelector('#inputText');
    const btnSubmit = document.querySelector('#btnSubmit');
    const todo = document.querySelector('#todo');
    const btnClearAll = document.querySelector('#btnClearAll')
    const modal = document.querySelector('#myModal')

    const close = document.querySelector('.close')
    const inputModal = document.querySelector('#inputModal')
    const btnModalOk = document.querySelector('#btnModalOk')

    const data = [];

    let indexInData;

    btnSubmit.addEventListener('click', (event) =>{
        event.preventDefault();
        data.push ({
            title:inputText.value,
            done: false,
            id: Date.now(),
        });
        console.log(data);
        update(data);
        form.reset();
    });

    btnClearAll.addEventListener('click', (event) =>{
        event.preventDefault();
        data.splice(0, data.length);
        update(data);
    });

    todo.addEventListener('click', (event) => {
        if (event.target.classList.contains("btnDelete")) {
            data.splice(getIndex(data), 1);
            update(data);
        };

        if (event.target.classList.contains("btnDone")) {
            data[getIndex(data)].done = !data[getIndex(data)].done
            update(data);
        };

        if (event.target.classList.contains("btnEdit")) {
            modal.style.display = 'block'
            const description = data[getIndex(data)].title
            inputModal.value = description;
            indexInData = getIndex(data)
        }
    });
    close.addEventListener('click', () => {
        modal.style.display = 'none'
    })
    btnModalOk.addEventListener('click', (event) => {
        event.preventDefault();
        const description = inputModal.value
        const el = data[indexInData];
        data.splice(indexInData, 1, {
            ...el,
            title: description
        })
        update(data);
        modal.style.display = 'none'
    })

};
init();
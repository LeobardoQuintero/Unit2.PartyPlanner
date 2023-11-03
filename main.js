const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events'

const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const partyName = document.querySelector('#name');
const partyDescriptions = document.querySelector('#description')
const partyDates = document.querySelector('#dates');
const partyLocation = document.querySelector('#location')


async function getParty() {
    try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data);
    return data.data;
    } catch (err) {
    console.error(err);
    }
}


function render(events) {
    const template = events.map(event => {
    return (
        `<section>
        <h2>${event.name}</h2>
        <p>"${event.description}"</p>
        <p>${event.dates}</p>
        <p>${event.location}
        <button data-id="${event.id}">Delete Party</button>
        </section>`
    )
    }).join('');
    mainEl.innerHTML = template;
}

async function eventApp() {
    const list = await getParty();
    render(list);
}

eventApp();

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const dateIso = new Date(partyDates.value).toISOString();
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name: partyName.value,
        description: partyDescriptions.value,
        date: dateIso,
        location: partyLocation.value,
        })
    });
    const json = await response.json();
    console.log("Post request complete",json)
    partyName.value = '';
    partyDescriptions.value = '';
    partyDates.value = '';
    partyLocation.value = '';

    eventApp();
    } catch (err) {
    console.error(err);
    }
});

mainEl.addEventListener('click', async (event) => {
    if(event.target.matches('button')) {
    const id = event.target.dataset.id;
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    eventApp();
    }
});
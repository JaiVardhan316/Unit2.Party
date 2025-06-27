const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-Jai";
const RESOURCE = "/events";

const API = BASE + COHORT + RESOURCE;

let parties = [];
let currParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    console.log(parties);
  } catch (error) {
    console.log(error);
  }
}

async function getPartyName(event) {
  try {
    const response = await fetch(API + "/" + event);
    const result = await response.json();
    currParty = result.data;
  } catch (error) {
    console.log(error);
  }
  render();
}

function partyListItem(party) {
  const $item = document.createElement("Article");
  $item.innerHTML = `
    <li><a href="#selected">${party.name}</a></li>
    `;
  $item.addEventListener("click", () => {
    getPartyName(party.id);
  });
  return $item;
}

function partyList() {
  const $list = document.createElement("Article");
  $list.classList.add("item");
  const $item = parties.map(partyListItem);
  $list.replaceChildren(...$item);
  return $list;
}

function partyDetails() {
  if (currParty === undefined) {
    const $details = document.createElement("Article");
    $details.textContent = "Select a Party";
    return $details;
  }
  const $details = document.createElement("Article");
  $details.innerHTML = `
    <h3>${currParty.name} #${currParty.id} ${currParty.date}</h3>
    <p>${currParty.description}</p>
    <p>${currParty.location}</p>
    `;
  return $details;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <Partylist></Partylist>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
    `;
  document.querySelector("Partylist").replaceWith(partyList());
  document.querySelector("PartyDetails").replaceWith(partyDetails());
}

async function init() {
  await getParties();
  render();
}

init();

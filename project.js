let listOfCharacters;
let pagination = 1;
fetchList();
renderpaginationNumber();


function fetchList() {
  removeListItems();
  showUlLoader(true);

  fetch(`https://swapi.dev/api/people/?page=${pagination}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      listOfCharacters = data.results;
      renderList();
    });
}

document.querySelector(".backward").addEventListener("click", () => {
  if (pagination < 1) {
    return;
  }
  pagination--;
  fetchList();
});

document.querySelector(".forward").addEventListener("click", () => {
  if (pagination > 9) {
    return;
  }
  pagination++;
  fetchList();
});

function renderList() {
  let listItems = "";
  for (let char of listOfCharacters) {
    listItems += `<li>${char.name}</li>`;
  }

  showUlLoader(false);
  document.querySelector("ul").innerHTML = listItems;
  renderpaginationNumber();
  initEvenetListeners();
}

function renderpaginationNumber() {
  document.querySelector(".page-number").innerText = pagination;
}

function initEvenetListeners() {
  document
    .querySelectorAll("li")
    .forEach((li) => li.addEventListener("click", findCharacter));
}

function findCharacter(e) {
  //
  const slectedCharacter = listOfCharacters.find(
    (char) => char.name === e.target.innerText
  );
  console.log(slectedCharacter);
  renderCharacterInfo(slectedCharacter);
}

function renderCharacterInfo(char) {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    birth_year,
    gender,
    eye_color,
  } = char;
  const div = `
  
            <h3>${name}</h3>
            <p>Height: ${height}cm</p>
            <p>Mass: ${mass}kg</p>
            <p>Hair color: ${hair_color}</p>
            <p>Skin color: ${skin_color}</p>
            <p>Eye color: ${eye_color}</p>
            <p>Birth year:${birth_year}</p>
            <p>Gender: ${gender}</p>
      
    `;

  //
  document.querySelector(".character-div > article").innerHTML = div;
  renderPlanet(char.homeworld);
}

function renderPlanet(api) {
  removePlanet();
  planetLoader(true);

  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const {
        climate,
        diameter,
        gravity,
        orbital_period,
        rotation_period,
        terrain,
        name,
      } = data;
      const info = `

              <h3>${name}</h3>
              <p>Rotation period: ${rotation_period}h</p>
              <p>Orbital period: ${orbital_period}days</p>
              <p>Diameter: ${diameter}km</p>
              <p>Climate: ${climate}</p>
              <p>Gravity: ${gravity}</p>
              <p>terrain: ${terrain}</p>
    `;

      planetLoader(false);

      document.querySelector(".planet-div > article").innerHTML = info;
    });
}

function showUlLoader(state = false) {
  const spinner = document.querySelector(".ul-loader");
  state ? spinner.classList.remove("hidden") : spinner.classList.add("hidden");
}

function removeListItems() {
  const listItems = document.querySelectorAll("li");
  if (listItems.length > 0) {
    listItems.forEach((li) => li.remove());
  }
}

//loading spinner
function showUlLoader(state) {
  const spinner = document.querySelector(".ul-loader");
  state ? spinner.classList.remove("hidden") : spinner.classList.add("hidden");
}
function removeListItems() {
  const listItems = document.querySelectorAll("li");
  if (listItems.length > 0) {
    listItems.forEach((li) => li.remove());
  }
}

function planetLoader(state) {
  const spinner = document.querySelector(".planet-loader");
  state ? spinner.classList.remove("hidden") : spinner.classList.add("hidden");
}

function removePlanet() {
  const listItems = document.querySelector(".planet-article");
  listItems.innerHTML = "";
}
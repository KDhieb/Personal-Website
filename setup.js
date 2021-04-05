window.addEventListener("load", myInit, true);

function myInit() {
  //   loadJSON(typeWriterEffect);
  loadJSON(createProjectCards);
  loadJSON(createContactCards);
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./data.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

function createProjectCards(data) {
  var projectDiv = document.getElementById("projects");
  createCards(projectDiv, data.projects);
}

function createContactCards(data) {
  var contactDiv = document.getElementById("contact");
  createCards(contactDiv, data.contact);
}

function createCards(parentElement, array) {
  array.forEach((element) => {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    var linkWrap = document.createElement("A");
    linkWrap.target = "_blank";
    linkWrap.rel = "noopener";
    linkWrap.href = element.link;

    var midDiv = document.createElement("div");
    midDiv.classList.add("card-top");
    midDiv.classList.add("uniquesrc");
    midDiv.style.backgroundImage = `url(${element.datasrc})`;

    var bottomDiv = document.createElement("div");
    bottomDiv.classList.add("card-bottom");
    var titleText = document.createElement("p");
    titleText.innerHTML = element.title;
    titleText.classList.add("title");
    var descNode = document.createTextNode(`${element.description}`);

    bottomDiv.appendChild(titleText);
    bottomDiv.appendChild(descNode);

    linkWrap.appendChild(midDiv);
    linkWrap.appendChild(bottomDiv);
    cardDiv.appendChild(linkWrap);
    parentElement.appendChild(cardDiv);
  });
}

// function typeWriterEffect(data) {
//   var div = document.createElement("div");
//   div.classList.add("container");
//   div.style.minHeight = "50px";

//   var h1wrap = document.createElement("h1");

//   var anchor = document.createElement("A");
//   anchor.id = "typewriter";
//   anchor.classList.add("typewriter");
//   anchor.dataset.period = "2000";
//   anchor.dataset.type =
//     '[  "Software Developer", "Problem Solver", "Hackathon Enthusiast", "Chess Hobbyist" ,"Weightlifter"]';
//   var span = document.createElement("span");
//   span.classList.add("wrap");
//   anchor.appendChild(span);

//   h1wrap.appendChild(anchor);
//   div.appendChild(h1wrap);
//   document.getElementById("typewrite-js").appendChild(div);

//   alert("setup.js");
// }

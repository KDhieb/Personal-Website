window.addEventListener("load", myInit, true);

function myInit() {
  loadJSON(fillContact);
  loadJSON(fillSkills);
  loadJSON(fillProjects);
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

function fillProjects(data) {
  var projectDiv = document.getElementById("projects");
  fillSections(projectDiv, data.projects);
}

function fillContact(data) {
  var parentDiv = document.getElementById("contact-wrapper");
  var topDiv = document.createElement("h2");
  data.contact.forEach((element) => {
    var anchor = document.createElement("A");
    anchor.classList.add("contact-element");
    var i = document.createElement("i");
    var title = document.createTextNode(" " + element.title);

    anchor.classList.add("btn");
    anchor.classList.add("btn-outline-warning");
    var faClasses = element.class.split(" ");
    i.classList.add(faClasses[0]);
    i.classList.add(faClasses[1]);
    anchor.href = element.link;
    anchor.target = "_blank";
    anchor.appendChild(i);
    anchor.appendChild(title);
    topDiv.appendChild(anchor);
    topDiv.appendChild(document.createTextNode(" "));
  });
  parentDiv.appendChild(topDiv);
}

function fillSections(parentElement, dataArray) {
  var topWrapper = document.createElement("div");
  topWrapper.classList.add("work-section-items");

  dataArray.forEach((element) => {
    var itemWrapper = document.createElement("A");
    var contentWrapper = document.createElement("div");
    var titleWrapper = document.createElement("div");
    var subtitleWrapper = document.createElement("div");
    var br = document.createElement("br");
    var textWrapper = document.createElement("div");
    var img = document.createElement("img");
    img.src = element.datasrc;
    img.classList.add("work-section-image");

    itemWrapper.classList.add("work-section-item");
    contentWrapper.classList.add("work-section-item-text");
    titleWrapper.classList.add("work-section-item-title");
    subtitleWrapper.classList.add("work-section-item-location");
    textWrapper.classList.add("work-section-item-description");

    titleWrapper.innerHTML = element.title;
    subtitleWrapper.innerHTML = element.tech;
    textWrapper.innerHTML = element.description;

    contentWrapper.appendChild(titleWrapper);
    contentWrapper.appendChild(subtitleWrapper);
    contentWrapper.appendChild(br);
    contentWrapper.appendChild(textWrapper);
    itemWrapper.appendChild(contentWrapper);
    itemWrapper.appendChild(img);
    itemWrapper.href = element.link;
    itemWrapper.style.textDecoration = "none";
    itemWrapper.target = "_blank";
    topWrapper.appendChild(itemWrapper);
  });
  parentElement.appendChild(topWrapper);
}

function fillSkills(data) {
  var skillsDiv = document.getElementById("skills");

  var skillsWrapper = document.createElement("div");
  skillsWrapper.classList.add("skills-section-items");
  data.skills.forEach((element) => {
    var topWrapper = document.createElement("div");
    var titleWrapper = document.createElement("div");
    var contentWrapper = document.createElement("div");
    topWrapper.classList.add("skills-section-item");
    titleWrapper.classList.add("skills-section-item-title");
    titleWrapper.innerHTML = element.title;
    contentWrapper.classList.add("skills-section-item-skills");
    contentWrapper.innerHTML = element.skills;

    topWrapper.appendChild(titleWrapper);
    topWrapper.appendChild(contentWrapper);
    skillsWrapper.appendChild(topWrapper);
  });

  skillsDiv.appendChild(skillsWrapper);
}

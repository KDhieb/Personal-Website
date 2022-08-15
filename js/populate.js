window.addEventListener("load", myInit, true);

function myInit() {
  var callbackList = [
    // fillSkills,
    fillContact,
    fillProjects,
    fillBio,
    fillExperiences,
  ];
  loadJSON(callbackList);
}

function loadJSON(callbacks) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./data.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      for (let i = 0; i < callbacks.length; i++)
        callbacks[i](JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

function fillExperiences(data) {
  const workDiv = document.getElementById("work");
  const volunteerDiv = document.getElementById("volunteering");

  const workData = data.work; // set css?
  const volunteerData = data.volunteering;

  workData.forEach((data) => {
    // wrapper div
    // image
    // text
    // add to workDiv
  });

  volunteerData.forEach((data) => {
    // wrapper div
    // image
    // text
    // add to volunteerDiv
  });
}

function fillBio(data) {
  document.getElementById("about-text").innerHTML = data.about;
}

function fillProjects(data) {
  var projectDiv = document.getElementById("projects");
  fillSections(projectDiv, data.projects);
}

function fillContact(data) {
  var resumeOnly = true;

  var parentDiv = document.getElementById("contact-wrapper");
  var topDiv = document.createElement("h2");

  data.contact.forEach((element) => {
    if (!resumeOnly || (resumeOnly && element.title == "Resume")) {
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
    }
  });
  parentDiv.appendChild(topDiv);
}

function fillSections(parentElement, dataArray) {
  var topWrapper = document.createElement("div");
  topWrapper.classList.add("project-section-items");

  dataArray.forEach((element) => {
    var itemWrapper = document.createElement("div");
    var contentWrapper = document.createElement("div");
    var titleWrapper = document.createElement("div");
    var subtitleWrapper = document.createElement("div");
    var br = document.createElement("br");
    var textWrapper = document.createElement("div");
    var img = document.createElement("img");
    img.src = element.datasrc;
    img.classList.add("project-section-image");

    itemWrapper.classList.add("project-section-item");
    // itemWrapper.style.backgroundColor = "grey";
    contentWrapper.classList.add("project-section-item-text");
    titleWrapper.classList.add("project-section-item-title");
    subtitleWrapper.classList.add("project-section-item-location");
    textWrapper.classList.add("project-section-item-description");

    titleWrapper.innerHTML = element.title;
    subtitleWrapper.innerHTML = element.tech;
    textWrapper.innerHTML = element.description;

    contentWrapper.appendChild(titleWrapper);
    contentWrapper.appendChild(subtitleWrapper);
    contentWrapper.appendChild(br);
    contentWrapper.appendChild(textWrapper);

    // contentWrapper.style.border = "1px solid red";
    // img.style.border = "5px solid green";

    itemWrapper.appendChild(img);
    itemWrapper.appendChild(contentWrapper);
    // itemWrapper.href = element.link;
    itemWrapper.style.textDecoration = "none";
    itemWrapper.target = "_blank";
    topWrapper.appendChild(itemWrapper);

    var buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("project-section-item-buttons");
    element.links.forEach((btn) => {
      if (btn.link) {
        var projectButton = document.createElement("a");
        projectButton.href = btn.link;
        projectButton.target = "_blank";
        projectButton.classList.add("project-section-item-button");
        var classes = btn.iconClass.split(" ");
        projectButton.classList.add(classes[0]);
        projectButton.classList.add(classes[1]);
        projectButton.classList.add("fa-2x");
        buttonWrapper.appendChild(projectButton);
      }
    });

    contentWrapper.appendChild(buttonWrapper);
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

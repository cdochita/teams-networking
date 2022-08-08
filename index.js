var a = "";
function getTeamHTML(team) {
  return `<tr>
          <td>${team.promotion}</td>
          <td>${team.members}</td>
          <td>${team.name}</td>
          <td>
            <a href="${team.url}">open</a>
          </td>
          <td>x e</td>
        </tr>`;
}

function dispalyTeams(teams) {
  //transforma in HTML

  var teamsHTML = teams.map(getTeamHTML);
  // console.info("teamsHTML", teamsHTML);

  //Afiseaza
  $("table tbody").innerHTML = teamsHTML.join("");
}
function $(selector) {
  return document.querySelector(selector);
}

function loadTeams() {
  fetch("data/teams.json")
    .then(function (r) {
      // console.info(r);
      return r.json();
      r.json.apply();
    })
    .then(function (teams) {
      dispalyTeams(teams);
    });
}
function submitForm(e) {
  var promotion = $("[name=promotion]").value;
  var members = $("[name=members]").value;
  var name = $("[name=name]").value;
  var url = $("[name=url]").value;
  var team = {
    promotion: promotion,
    members: members,
    name: name,
    url: url,
  };

  console.warn("submit", JSON.stringify(team));

  e.preventDefault();
}
function initEvents() {
  var form = document.getElementById("editForm");
  console.info("form", form);
  form.addEventListener("submit", submitForm);
}

loadTeams();
initEvents();

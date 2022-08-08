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
  document.querySelector("table tbody").innerHTML = teamsHTML.join("");
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
  var promotion = document.querySelector("[name=promotion]").value;
  var members = document.querySelector("[name=members]").value;
  var name = document.querySelector("[name=name]").value;
  var url = document.querySelector("[name=url]").value;
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

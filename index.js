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

  const teamsHTML = teams.map(getTeamHTML);
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
  const promotion = $("[name=promotion]").value;
  const members = $("[name=members]").value;
  const name = $("[name=name]").value;
  const url = $("[name=url]").value;
  const team = {
    promotion: promotion,
    members: members,
    name: name,
    url: url,
  };

  console.warn("submit", JSON.stringify(team));

  e.preventDefault();
}
function initEvents() {
  const form = document.getElementById("editForm");
  console.info("form", form);
  form.addEventListener("submit", submitForm);
}

loadTeams();
initEvents();

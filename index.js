function getTeamHTML(team) {
  return `<tr>
          <td>${team.promotion}</td>
          <td>${team.members}</td>
          <td>${team.name}</td>
          <td>
            <a href="${team.url}">open</a>
          </td>
          <td><button type="button" id = 'delete'> ❌</button></td>
        </tr>`;
}

function dispalyTeams(teams) {
  //transforma in HTML

  const teamsHTML = teams.map(getTeamHTML);
  //  console.info("teamsHTML", teamsHTML);

  //Afiseaza
  $("table tbody").innerHTML = teamsHTML.join("");
}
function $(selector) {
  return document.querySelector(selector);
}

function loadTeams() {
  fetch("http://localhost:3000/teams-json")
    .then((r) => r.json())
    .then(function (teams) {
      dispalyTeams(teams);
    });
}

function createTeamRequest(team) {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
}

function submitForm(e) {
  e.preventDefault();
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

  createTeamRequest(team)
    .then((r) => r.json())
    .then((status) => {
      console.log("status", status);
    });
  if (status.success) {
    location.reload();
  }
}
function initEvents() {
  const form = document.getElementById("editForm");
  console.info("form", form);
  form.addEventListener("submit", submitForm);
}

loadTeams();
initEvents();

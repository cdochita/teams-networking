let allTeams = [];
let editId;

function getTeamHTML(team) {
  return `<tr>
          <td>${team.promotion}</td>
          <td>${team.members}</td>
          <td>${team.name}</td>
          <td>
            <a href="${team.url}" target = '_blank'>open</a>
          </td>
          <td>
          <a href = '#' data-id='${team.id}' class = 'delete-btn'>❌</a>
          <a href= '#' data-id='${team.id}' class = 'edit-btn'>🖋️</a>
          </td>
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
    .then(r => r.json())
    .then(function (teams) {
      allTeams = teams;
      dispalyTeams(teams);
    });
}

function createTeamRequest(team) {
  return fetch("http://localhost:3000/teams/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

function removeTeamRequest(id) {
  return fetch("http://localhost:3000/teams/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  }).then(r => r.json());
}

function getFormValues() {
  const promotion = $("[name=promotion]").value;
  const members = $("[name=members]").value;
  const name = $("[name=name]").value;
  const url = $("[name=url]").value;
  const team = {
    promotion: promotion,
    members: members,
    name: name,
    url: url
  };
  return team;
}

function setFormValues(team) {
  $("[name=promotion]").value = team.promotion;
  $("[name=members]").value = team.members;
  $("[name=name]").value = team.name;
  $("[name=url]").value = team.url;
}
function updateTeamRequest(team) {
  return fetch("http://localhost:3000/teams/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}
function submitForm(e) {
  e.preventDefault();
  const team = getFormValues();

  if (editId) {
    team.id = editId;
    updateTeamRequest(team).then(status => {
      if (status.success) {
        loadTeams();
      }
      $("#editForm").reset();
    });
  } else {
    createTeamRequest(team).then(status => {
      if (status.success) {
        loadTeams();
        $("#editForm").reset();
      }
    });
  }
}
function startEditTeam(id) {
  const team = allTeams.find(team => team.id === id);
  setFormValues(team);
  editId = id;
}
function initEvents() {
  $("#search").addEventListener("input", e => {
    const search = e.target.value.toLowerCase();
    const teams = allTeams.filter(team => {
      return team.promotion.toLowerCase().includes(search);
    });
    dispalyTeams(teams);
  });

  const form = $("#editForm");
  form.addEventListener("submit", submitForm);
  form.addEventListener("reset", () => {
    console.info("reset");
    editId = undefined;
  });
  form.querySelector("tbody").addEventListener("click", e => {
    if (e.target.matches("a.delete-btn")) {
      var id = e.target.getAttribute("data-id");
      removeTeamRequest(id).then(status => {
        console.info(status);
        if (status.success) {
          loadTeams();
        }
      });
    } else if (e.target.matches("a.edit-btn")) {
      var id = e.target.getAttribute("data-id");
      startEditTeam(id);

      // console.warn(e.target.parentNode);
    }
    location.reload;
  });
}

loadTeams();
initEvents();

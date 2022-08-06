function getTeamHTML(team) {
  return `<tr>
          <td>${team.promotion}</td>
          <td>${team.members}</td>
          <td>${team.name}</td>
          <td>
            <a href="${team.url}">open</a>
          </td>
          <td>x e</td>
        </tr>
    `;
}

function dispalyTeams(teams) {
  //transforma in HTML
  var teamsHTML = "";
  teams.forEach(function (team) {
    console.info(team);
    teamsHTML += getTeamHTML(team);
  });
  //Afiseaza
  document.querySelector("table tbody").innerHTML = teamsHTML;
}

function loadTeams() {
  fetch("data/teams.json")
    .then(function (r) {
      console.info(r);
      return r.json();
    })
    .then(function (teams) {
      dispalyTeams(teams);
    });
}

loadTeams();

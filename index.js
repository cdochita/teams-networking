function dispalyTeams(teams) {
  console.info("display", teams);
  //transforma in HTML
  var teamsHTML = "";
  teams.forEach(function (team) {
    console.info(team);
    teamsHTML += `<tr>
          <td>${team.promotion}</td>
          <td>${team.members}</td>
          <td>${team.name}</td>
          <td>
            <a href="${team.url}">open</a>
          </td>
          <td>x e</td>
        </tr>
    `;
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

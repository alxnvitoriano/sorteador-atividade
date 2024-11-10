let drawHistory = [];
let drawResultDiv;

// Evento para sortear os grupos
document.getElementById("sorteio-button").addEventListener("click", (e) => {
  e.preventDefault();
  const participantsInput = document.getElementById("participants");
  const groupSizeInput = document.getElementById("group-size");
  const participants = participantsInput.value.trim().split(",");
  const groupSize = parseInt(groupSizeInput.value);

  if (participants.length < groupSize) {
    alert("Not enough participants for the specified group size");
    return;
  }
  if (participantsInput.value === "" || groupSizeInput.value === "") {
    alert("Empty fields");
    return;
  }

  const groups = [];
  for (let i = 0; i < participants.length; i += groupSize) {
    groups.push(participants.slice(i, i + groupSize));
  }

  const drawResultHTML = groups
    .map((group, index) => {
      return `<p>Group ${index + 1}: ${group.join(", ")}</p>`;
    })
    .join("");

  drawHistory.push({
    participants: participants.join(", "),
    groupSize: groupSize,
    groups: groups,
  });

  if (!drawResultDiv) {
    drawResultDiv = document.createElement("div");
    drawResultDiv.setAttribute("id", "draw-result");

    const resultTitle = document.createElement("h2");
    resultTitle.innerText = "Draw Result";

    document.getElementById("show-groups").appendChild(resultTitle);
    document.getElementById("show-groups").appendChild(drawResultDiv);
  }

  drawResultDiv.innerHTML = drawResultHTML; // Atualiza o conteúdo de drawResultDiv em vez de adicionar
});

// Função para atualizar o histórico do sorteio
function updateDrawHistory() {
  const drawHistoryHTML = drawHistory
    .map((draw, index) => {
      return `<li>Draw #${index + 1}: ${draw.participants} (Group size: ${
        draw.groupSize
      })</li>`;
    })
    .join("");

  document.getElementById("draw-history").innerHTML = drawHistoryHTML;
}

// Evento para mostrar o histórico dos sorteios
document.getElementById("history-button").addEventListener("click", (e) => {
  e.preventDefault();
  updateDrawHistory();
  document.getElementById("show-history").style.display = "block";
});

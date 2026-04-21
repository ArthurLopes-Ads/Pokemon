function fazerRequisicao() {
  const input = document.getElementById("pokemonInput");
  const container = document.getElementById("pokedex-container");
  let query = input.value.toLowerCase().trim();

  if (!query) return;

  // Feedback visual de carregamento
  container.innerHTML = '<div class="spinner-border text-primary"></div>';

  fetch("https://pokeapi.co/api/v2/pokemon/" + query)
    .then((response) => {
      if (!response.ok) throw new Error("Pokémon não encontrado");
      return response.json();
    })
    .then((data) => {
      // Limpa o container e insere o card formatado
      container.innerHTML = createPokemonCard(data);
    })
    .catch((error) => {
      container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
}

// Função para gerar o HTML do card baseado nos componentes do desafio
function createPokemonCard(p) {
  const idFormatted = `#${String(p.id).padStart(3, "0")}`;
  const sprite =
    p.sprites.other["official-artwork"].front_default ||
    p.sprites.front_default;

  // Mapeando os tipos para badges coloridas
  const typesHtml = p.types
    .map(
      (t) =>
        `<span class="pokemon-type bg-${t.type.name}">${t.type.name}</span>`,
    )
    .join(" ");

  // Mapeando os stats para as barras (Componente 1)
  const statsHtml = p.stats
    .map((s) => {
      const percentage = Math.min((s.base_stat / 150) * 100, 100);
      return `
            <div class="mb-2" style="font-size: 0.7rem;">
                <div class="d-flex justify-content-between text-uppercase fw-bold">
                    <span>${s.stat.name}</span>
                    <span>${s.base_stat}</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${percentage}%"></div>
                </div>
            </div>`;
    })
    .join("");

  return `
        <div class="col">
            <div class="pokemon-card p-3 shadow-sm">
                <div class="text-center bg-light rounded p-4 mb-3">
                    <img src="${sprite}" alt="${p.name}" class="img-fluid" style="height: 150px;">
                </div>
                <div class="px-2">
                    <span class="text-muted fw-bold">${idFormatted}</span>
                    <h2 class="text-capitalize fw-bold h4">${p.name}</h2>
                    <div class="my-3">${typesHtml}</div>
                    <div class="border-top pt-3">
                        ${statsHtml}
                    </div>
                </div>
            </div>
        </div>`;
}

// Permitir busca ao apertar "Enter"
document.getElementById("pokemonInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") fazerRequisicao();
});

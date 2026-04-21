import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20",
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json()),
        ),
      );

      setPokemons(pokemonDetails);
      setFilteredPokemons(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredPokemons(pokemons);
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase().trim()}`,
      );

      if (!response.ok) {
        setFilteredPokemons([]);
        return;
      }

      const pokemon = await response.json();
      setFilteredPokemons([pokemon]);
    } catch (error) {
      console.error("Erro na busca:", error);
      setFilteredPokemons([]);
    }
  };

  return (
    <>
      <Head>
        <title>Pokédex | Pokemon API</title>
        <meta
          name="description"
          content="Pokédex - Busque e descubra pokémons"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <header className="bg-dark text-white text-center py-4 mb-5">
          <h1 className="display-4 fw-bold">Pokédex</h1>
          <p className="text-muted">Explore o mundo dos Pokémons</p>
        </header>

        <div className="container mb-5">
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome ou ID..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => handleSearch(searchTerm)}
                >
                  🔍 Buscar
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : filteredPokemons.length > 0 ? (
            <div className="row g-4">
              {filteredPokemons.map((pokemon) => (
                <div key={pokemon.id} className="col-lg-3 col-md-4 col-sm-6">
                  <PokemonCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <h5>Nenhum Pokémon encontrado</h5>
              <p>Tente buscar por outro nome ou ID</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">© 2024 Pokédex | Dados da PokéAPI</p>
      </footer>
    </>
  );
}

function PokemonCard({ pokemon }) {
  const getTypeColor = (type) => {
    const colors = {
      grass: "#78c850",
      fire: "#f08030",
      water: "#6890f0",
      poison: "#a040a0",
      electric: "#f8d030",
      bug: "#a8b820",
      normal: "#a8a878",
      flying: "#a890f0",
      fairy: "#ee99ac",
      fighting: "#c03028",
      ground: "#e0c068",
      rock: "#b8a038",
      psychic: "#f85888",
      ice: "#98d8d8",
      dragon: "#7038f8",
      dark: "#705848",
      steel: "#b8b8d0",
      ghost: "#705898",
    };
    return colors[type] || "#a8a878";
  };

  return (
    <div
      className="card h-100 shadow-sm pokemon-card"
      style={{ cursor: "pointer" }}
    >
      <div className="card-body text-center">
        <div
          className="mb-3 p-3"
          style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
        >
          <img
            src={
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
            className="img-fluid"
            style={{ height: "150px", objectFit: "contain" }}
          />
        </div>

        <div className="mb-2">
          <span className="badge bg-secondary me-2">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </div>

        <h5 className="card-title text-capitalize fw-bold mb-2">
          {pokemon.name}
        </h5>

        <div className="mb-3">
          {pokemon.types?.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className="badge me-2"
              style={{
                backgroundColor: getTypeColor(typeObj.type.name),
                color: "white",
              }}
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>

        <div className="text-muted small">
          <p className="mb-1">
            <strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m
          </p>
          <p className="mb-1">
            <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg
          </p>
        </div>

        <div className="mt-3 pt-3 border-top">
          <small className="text-muted">
            <strong>Stats Principais:</strong>
          </small>
          <div className="mt-2">
            {pokemon.stats?.slice(0, 3).map((stat) => (
              <div key={stat.stat.name} className="mb-2">
                <div
                  className="d-flex justify-content-between mb-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  <span className="text-capitalize">{stat.stat.name}:</span>
                  <span className="fw-bold">{stat.base_stat}</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(stat.base_stat / 150) * 100}%`,
                      backgroundColor: "#4dabff",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaWikiResults, setMediaWikiResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null); // État pour stocker le résultat sélectionné

  useEffect(() => {
    if (searchTerm) {
      const mediaWikiURL = `https://${process.env.REACT_APP_MEDIAWIKI_URL}/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}`;

      axios.get(mediaWikiURL)
        .then((response) => {
          const pages = response.data.query.search;
          setMediaWikiResults(pages.map((page) => ({
            project: page.title, // En supposant que le projet correspond au nom du wiki
            rank: page.rank,
            views: page.views,
            url: `https://${process.env.REACT_APP_MEDIAWIKI_URL}/wiki/${page.title}`,
          })));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setMediaWikiResults([]);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Rechercher par pays..."
      />
      <h2>Résultats MediaWiki</h2>
      {mediaWikiResults.length > 0 ? (
        <ul>
          {mediaWikiResults.map((result) => (
            <li key={result.project}>
              <a href={result.url} onClick={() => handleResultClick(result)}>
                {result.project} ({result.rank} - {result.views})
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
      {selectedResult && ( // Afficher les détails de la recherche uniquement si un résultat est sélectionné
        <ResearchDetails project={selectedResult.project} url={selectedResult.url} />
      )}
    </div>
  );
};

const ResearchDetails = ({ project, url }) => {
  // Récupérer des détails supplémentaires sur le projet sélectionné en utilisant le nom du projet et l'API MediaWiki (ou d'autres sources)
  // ... (implémentation pour la récupération des détails)
  // Afficher les détails récupérés (par exemple, résumé de l'article, articles connexes, etc.)

  return (
    <div>
      <h2>Détails de l'article</h2>
      <p>Projet: {project}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Voir l'article sur MediaWiki
      </a>
      {/* Afficher les détails supplémentaires récupérés ici */}
    </div>
  );
};

function App() {
  // ... autres composants et logique de votre code d'origine

  return (
    <div>
      {/* ... autres composants */}
      <SearchResults />
      {/* ... autres composants */}
    </div>
  );
}

export default App;
// log
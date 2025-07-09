document.addEventListener('DOMContentLoaded', () => {
    const totalRegisteredVoters = 100; // Change this as needed
  
    // Mock candidate data with vote counts
    const candidates = [
      { id: 1, name: 'ChatGPT', party: 'Progressive Party', votes: 0 },
      { id: 2, name: 'Gemini', party: 'Citizens Alliance', votes: 0 },
      { id: 3, name: 'Claude', party: 'Unity Coalition', votes: 0 },
      { id: 4, name: 'Leonardo AI', party: 'Reform Movement', votes: 0 }
    ];
  
    const totalVotesEl = document.getElementById('totalVotes');
    const remainingVotesEl = document.getElementById('remainingVotes');
    const resultsGrid = document.getElementById('candidateResults');
  
    // Render candidate result cards
    function renderCandidates() {
      resultsGrid.innerHTML = '';
      candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.classList.add('candidate-result-card');
  
        card.innerHTML = `
          <h3>${candidate.name}</h3>
          <p><strong>Party:</strong> ${candidate.party}</p>
          <p><strong>Votes:</strong> <span id="vote-count-${candidate.id}">${candidate.votes}</span></p>
        `;
  
        resultsGrid.appendChild(card);
      });
    }
  
    // Update vote counts on the UI
    function updateStats() {
      const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0);
      totalVotesEl.textContent = totalVotes;
      remainingVotesEl.textContent = totalRegisteredVoters - totalVotes;
  
      candidates.forEach(candidate => {
        const voteEl = document.getElementById(`vote-count-${candidate.id}`);
        if (voteEl) voteEl.textContent = candidate.votes;
      });
    }
  
    // Simulate vote updates
    function simulateVoting() {
      const interval = setInterval(() => {
        const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0);
        if (totalVotes >= totalRegisteredVoters) {
          clearInterval(interval); // Stop updates
          return;
        }
  
        // Random candidate gets a vote
        const randomIndex = Math.floor(Math.random() * candidates.length);
        candidates[randomIndex].votes += 1;
        updateStats();
      }, 1000); // 1 vote per second (adjust if needed)
    }
  
    renderCandidates();
    updateStats();
    simulateVoting();
  });
  
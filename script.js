// --- Deck Data (Major Arcana) ---
const deck = [
  { id: 0,  name: "The Fool",           meaning: "A fresh start is calling. Leap softly, little wanderer." },
  { id: 1,  name: "The Magician",       meaning: "Your tools are ready. Manifest your magic." },
  { id: 2,  name: "The High Priestess", meaning: "Look inward. The answers are in your paws." },
  { id: 3,  name: "The Empress",        meaning: "Nurture your world. Love grows where it's tended." },
  { id: 4,  name: "The Emperor",        meaning: "Stand firm. You are safe in your strength." },
  { id: 5,  name: "The Hierophant",     meaning: "Tradition offers comfort. Take what serves you." },
  { id: 6,  name: "The Lovers",         meaning: "Follow the path of harmony and true connection." },
  { id: 7,  name: "The Chariot",        meaning: "Move forward with focus. The road is yours." },
  { id: 8,  name: "Strength",           meaning: "Gentleness is strength too. Purr through the storm." },
  { id: 9,  name: "The Hermit",         meaning: "Solitude reveals your light. Find peace within." },
  { id: 10, name: "Wheel of Fortune",   meaning: "Cycles turn. Embrace the unknown." },
  { id: 11, name: "Justice",            meaning: "Balance returns. Trust fairness will unfold." },
  { id: 12, name: "The Hanged One",     meaning: "Pause. A new perspective is dawning." },
  { id: 13, name: "Death",              meaning: "Let go. Something beautiful is beginning." },
  { id: 14, name: "Temperance",         meaning: "Flow in harmony. Mix softness with strength." },
  { id: 15, name: "The Devil",          meaning: "What are you clinging to? You are free." },
  { id: 16, name: "The Tower",          meaning: "Shifts can shake, but rebuilds bring clarity." },
  { id: 17, name: "The Star",           meaning: "Hope shines bright. Trust your inner light." },
  { id: 18, name: "The Moon",           meaning: "The path is dim, but your intuition glows." },
  { id: 19, name: "The Sun",            meaning: "Joy radiates. Bask in this moment." },
  { id: 20, name: "Judgement",          meaning: "Rise up. You are becoming more of who you are." },
  { id: 21, name: "The World",          meaning: "Wholeness is yours. Celebrate the cycle complete." }
];

// --- Cozy Affirmations ---
const affirmations = [
  "You are exactly where you need to be.",
  "The universe is on your side today.",
  "You are soft, strong, and magical.",
  "All is unfolding with divine timing.",
  "You bring calm to the chaos.",
  "Breathe in gold light. Breathe out tension.",
  "Your intuition is your superpower."
];

// --- Modal Instance ---
const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));

// --- Draw & Render Cards ---
function drawCards(count) {
  // 1. Shuffle + pick
  const selected = deck.sort(() => Math.random() - 0.5).slice(0, count);

  // 2. Render
  const container = document.getElementById('cards');
  container.innerHTML = '';

  selected.forEach(card => {
    const fileName = String(card.id).padStart(2,'0')
      + '-' + card.name.toLowerCase().replace(/ /g,'-') + '.png';

    // build card
    const wrapper = document.createElement('div');
    wrapper.className = 'tarot-card col';
    wrapper.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="images/${fileName}" alt="${card.name}">
        </div>
        <div class="card-back">
          <strong>${card.name}</strong>
          <p>${card.meaning}</p>
        </div>
      </div>
    `;

    // flip on click
    wrapper.querySelector('.card-inner')
      .addEventListener('click', () => wrapper.classList.toggle('flipped'));

    // show modal on back-click
    wrapper.querySelector('.card-back')
      .addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('cardModalLabel').textContent = card.name;
        document.getElementById('modalCardImage').src = `images/${fileName}`;
        document.getElementById('modalCardImage').alt = card.name;
        document.getElementById('modalCardMeaning').textContent = card.meaning;
        cardModal.show();
      });

    container.appendChild(wrapper);
  });

  // 3. Show affirmation
  document.getElementById('affirmation').textContent =
    affirmations[Math.floor(Math.random() * affirmations.length)];
}

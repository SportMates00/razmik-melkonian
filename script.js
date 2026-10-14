
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

async function hydrateYouTubeTitles() {
  const cards = [...document.querySelectorAll('[data-youtube-id]')];
  for (const card of cards) {
    const id = card.dataset.youtubeId;
    const titleEl = card.querySelector('.video-title');
    const metaEl = card.querySelector('.video-collaborator');
    try {
      const url = `https://noembed.com/embed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.title && titleEl) titleEl.textContent = data.title;
      if (data.author_name && metaEl) {
        metaEl.textContent = ` · Video by ${data.author_name}`;
      }
    } catch (e) {
      // Keep the built-in fallback title when metadata is unavailable.
    }
  }
}
hydrateYouTubeTitles();

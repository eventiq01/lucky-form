const form = document.getElementById('entryForm');
const loader = document.getElementById('loader');
const result = document.getElementById('resultMessage');
const formContainer = document.querySelector('form');

// Replace with your Apps Script Web App URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzaxtOncn-ebaeGTztT2D-3tOTGIQ0wzo1kFOsCoeHIaqQpWLoy9LkQi8RPMaTCCvGdXQ/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    contact: document.getElementById('contact').value,
    email: document.getElementById('email').value,
    organization: document.getElementById('organization').value,
    jobTitle: document.getElementById('jobTitle').value
  };

  formContainer.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const response = await res.json();
    loader.classList.add('hidden');

    if (!response.success) {
      formContainer.classList.remove('hidden');
      result.innerHTML = `<p style="color:red;">${response.message}</p>`;
      result.classList.remove('hidden');
      return;
    }

    if (response.isWinner) {
      result.innerHTML = `
        <h2>🎉 Hurray! You're a Winner! 🎉</h2>
        <p>Enjoy your reward.</p>
      `;
      result.classList.remove('hidden');
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      result.innerHTML = `
        <h2>😢 Better Luck Next Time</h2>
        <p>Thanks for participating!</p>
      `;
      result.classList.remove('hidden');
    }

  } catch (err) {
    loader.classList.add('hidden');
    result.innerHTML = `<p style="color:red;">Error submitting form. Try again later.</p>`;
    result.classList.remove('hidden');
    formContainer.classList.remove('hidden');
  }
});
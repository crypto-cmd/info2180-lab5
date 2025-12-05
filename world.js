document.addEventListener('DOMContentLoaded', () => {
  const lookupBtn = document.getElementById('lookup');
  const resultDiv = document.getElementById('result');
  const countryInput = document.getElementById('country');
  const lookupCitiesBtn = document.getElementById('lookup-cities');

  if (!lookupBtn || !resultDiv) {
    return;
  }

  lookupBtn.addEventListener('click', async () => {
    const country = countryInput ? countryInput.value.trim() : '';
    const url = new URL(window.location.origin + '/info2180-lab5/world.php');
    if (country) {
      url.searchParams.set('country', country);
    }

    try {
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Accept': 'text/html' }
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const html = await res.text();
      resultDiv.innerHTML = html;
    } catch (err) {
      resultDiv.textContent = 'Error fetching data: ' + err.message;
    }
  });

  if (lookupCitiesBtn) {
    lookupCitiesBtn.addEventListener('click', async () => {
      const country = countryInput ? countryInput.value.trim() : '';
      const url = new URL(window.location.origin + '/info2180-lab5/world.php');
      if (country) {
        url.searchParams.set('country', country);
      }
      url.searchParams.set('lookup', 'cities');

      try {
        const res = await fetch(url.toString(), {
          method: 'GET',
          headers: { 'Accept': 'text/html' }
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const html = await res.text();
        resultDiv.innerHTML = html;
      } catch (err) {
        resultDiv.textContent = 'Error fetching cities: ' + err.message;
      }
    });
  }
});

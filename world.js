document.addEventListener("DOMContentLoaded", () => {
  const lookupBtn = document.getElementById("lookup");
  const lookupCitiesBtn = document.getElementById("lookup-cities");
  const resultDiv = document.getElementById("result");
  const countryInput = document.getElementById("country");

  if (!resultDiv) return;

  const fetchAndRender = async (lookup) => {
    const country = countryInput?.value.trim() || "";
    const url = new URL("world.php", window.location.href);
    if (country) url.searchParams.set("country", country);
    if (lookup) url.searchParams.set("lookup", lookup);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "text/html" },
      });
      if (!res.ok) throw new Error("Network response was not ok");
      resultDiv.innerHTML = await res.text();
    } catch (err) {
      resultDiv.textContent = `Error: ${err.message}`;
    }
  };

  lookupBtn?.addEventListener("click", () => fetchAndRender(undefined));
  lookupCitiesBtn?.addEventListener("click", () => fetchAndRender("cities"));
});

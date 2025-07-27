function analyzeAndDownload() {
  const url = document.getElementById("urlInput").value.trim();
  const resolution = document.getElementById("resolution").value;
  const preview = document.getElementById("preview");

  if (!url) {
    alert("URL தேவைப்படுகிறது.");
    return;
  }

  fetch("http://localhost:5000/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, resolution })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      preview.innerHTML = `
        <img src="${data.thumbnail}" width="100%" />
        <h3>📁 ${data.username}</h3>
        <p>🎬 ${data.title}</p>
        <p>📂 File: ${data.path}</p>
        <a href="/${data.path}" download>
          <button>⬇️ இப்போது டவுன்லோட் செய்யவும்</button>
        </a>
      `;
    } else {
      preview.innerHTML = `<p>❌ பிழை: ${data.error}</p>`;
    }
  });
}

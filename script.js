const API_URL = "https://script.google.com/macros/s/AKfycbzfYYioueU3eRVzcOWhMKbN3o49tLXbq93zkKLkzDT8Elmpkoy03hjrs1OHo0cUVisG/exec";

// SUBMIT FORM (only runs on index.html)
const form = document.getElementById("submissionForm");

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
      type: document.getElementById("type").value,
      message: document.getElementById("message").value,
      name: document.getElementById("name").value || "N/A",
      email: document.getElementById("email").value || "N/A"
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();

      alert("Submitted successfully!");
      form.reset();

    } catch (err) {
      alert("Submission failed");
    }
  });
}

// LOAD DATA (staff.html only)
async function loadData() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const table = document.getElementById("dataTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.type}</td>
        <td>${item.message}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.timestamp}</td>
      </tr>
    `;
  });
}

if (document.getElementById("dataTable")) {
  loadData();
}
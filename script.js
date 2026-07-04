const API_URL = "https://script.google.com/macros/s/AKfycbzz5x8bdvrqTVfe5VxNGqLc0P5IoePdWLZI3-gduRg9N11sCXOKazxP6TMNP0MhS0qp/exec";

/* -------------------------
   SUBMIT FORM (INDEX ONLY)
--------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submissionForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
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

        if (!res.ok) throw new Error("Submit failed");

        alert("Submitted successfully!");
        form.reset();

      } catch (err) {
        console.error(err);
        alert("Submission failed");
      }
    });
  }

  /* -------------------------
     LOAD DATA (STAFF ONLY)
  --------------------------*/
  const table = document.getElementById("dataTable");

  if (table) {
    loadData();
  }
});

async function loadData() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    const data = JSON.parse(text);

    const table = document.getElementById("dataTable");
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

  } catch (err) {
    console.error("Load error:", err);
  }
}

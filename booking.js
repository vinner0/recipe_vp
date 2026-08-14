const bookingForm = document.getElementById("booking-form");
const dateInput = document.getElementById("date");
const errorNote = document.getElementById("booking-error");
const successNote = document.getElementById("booking-note");

dateInput.min = new Date().toISOString().split("T")[0];

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorNote.hidden = true;
  successNote.hidden = true;

  if (!bookingForm.checkValidity() || new Date(dateInput.value) < new Date(dateInput.min)) {
    errorNote.hidden = false;
    return;
  }

  const formIsUnconfigured = bookingForm.action.includes("YOUR_FORM_ID");

  if (formIsUnconfigured) {
    const data = new FormData(bookingForm);
    const body =
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n` +
      `Phone: ${data.get("phone")}\n` +
      `Date: ${data.get("date")}\n` +
      `Time: ${data.get("time")}\n` +
      `Party size: ${data.get("party-size")}\n` +
      `Special requests: ${data.get("requests") || "-"}`;
    window.location.href =
      `mailto:vinaip@gmail.com?subject=${encodeURIComponent("Table Reservation Request")}&body=${encodeURIComponent(body)}`;
    bookingForm.reset();
    successNote.hidden = false;
    return;
  }

  try {
    const response = await fetch(bookingForm.action, {
      method: "POST",
      body: new FormData(bookingForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      bookingForm.reset();
      successNote.hidden = false;
    } else {
      errorNote.hidden = false;
    }
  } catch {
    errorNote.hidden = false;
  }
});

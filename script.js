const form = document.getElementById("registrationForm");
const toast = document.getElementById("toast");
const port = 3000;

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const enrollmentNo = document.getElementById("enrollment").value;
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const mobileNo = document.getElementById("mobile").value;

  const result = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enrollmentNo,
      firstName,
      lastName,
      mobileNo,
    }),
  });
  const data = result.json();
  console.log(data);

  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
    form.reset();
  }, port);
});

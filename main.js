window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("orderingButton");

  if (btn) {
    btn.addEventListener("click", () => {
      const googleFormUrl = "https://forms.gle/Qbc58gGz4EhAS2MN6";
      window.open(googleFormUrl, "_blank");
    });
  } else {
    console.error("Could not find the button with ID 'orderingButton'!");
  }
});

(function() {

  // DOM Elements
  const methodRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const easypaisaDetails = document.getElementById('easypaisa-details');
  const jazzcashDetails = document.getElementById('jazzcash-details');
  const bankDetails = document.getElementById('bank-details');
  const confirmBtn = document.getElementById('confirmPayment');

  const txnInput = document.getElementById('txnId');
  const nameInput = document.getElementById('userName');
  const contactInput = document.getElementById('userContact');

  // Google Drive link (ZIP file)
  const DIRECT_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1a-4ZgAh3tTcwU7q_uqGFoTKVTJ3mnu2F";

  // Show payment details based on method
  function updatePaymentDetails(value) {
    easypaisaDetails.classList.remove('active');
    jazzcashDetails.classList.remove('active');
    bankDetails.classList.remove('active');

    if (value === 'easypaisa') easypaisaDetails.classList.add('active');
    else if (value === 'jazzcash') jazzcashDetails.classList.add('active');
    else bankDetails.classList.add('active');
  }

  methodRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updatePaymentDetails(e.target.value);
    });
  });

  // Confirm button click
  confirmBtn.addEventListener('click', () => {

    if (confirmBtn.disabled) return;

    // Validate inputs
    if (!txnInput.value.trim() || !nameInput.value.trim() || !contactInput.value.trim()) {
      alert("⚠️ Please fill in your transaction ID, name, and WhatsApp/email before confirming.");
      return;
    }

    // Get selected method
    let selectedMethod = 'EasyPaisa';
    methodRadios.forEach(radio => {
      if (radio.checked) selectedMethod = radio.value === 'easypaisa' ? 'EasyPaisa' : radio.value === 'jazzcash' ? 'JazzCash' : 'Bank Transfer';
    });

    // Disable button for UX
    confirmBtn.disabled = true;
    confirmBtn.textContent = "Processing...";

    setTimeout(() => {

      // Show alert
      alert(`✅ Thank you, ${nameInput.value}!\nYour payment via ${selectedMethod} has been recorded.\nYour download will start now.\n\nWe will verify the transaction ID: ${txnInput.value} and send the ZIP password manually to ${contactInput.value}.`);

      // Start download
      window.open(DIRECT_DOWNLOAD, "_blank");

      // Update button text
      confirmBtn.textContent = "Download Started ✔";

    }, 1500);

  });

  // Set default state
  updatePaymentDetails('easypaisa');

})();
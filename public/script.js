document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('employeeForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch('/submit', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => alert('Form submitted successfully!'))
          .catch(error => alert('Error submitting form'));
    });
});


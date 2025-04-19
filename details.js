document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const photoInput = document.getElementById('photo');
    const imagePreview = document.getElementById('imagePreview');
    const emailInput = document.getElementById('email');

    // Set email from session storage if available
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        emailInput.value = userEmail;
        emailInput.readOnly = true;
    }

    // Handle image preview
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            email: emailInput.value,
            name: document.getElementById('name').value,
            rollNo: document.getElementById('rollNo').value,
            course: document.getElementById('course').value,
            branch: document.getElementById('branch').value,
            photo: imagePreview.querySelector('img')?.src || ''
        };

        try {
            // Store data in session storage
            Object.entries(formData).forEach(([key, value]) => {
                sessionStorage.setItem(key, value);
            });

            // Redirect to ID card page
            window.location.href = 'idcard.html';
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving your information. Please try again.');
        }
    });
}); 
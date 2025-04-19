document.addEventListener('DOMContentLoaded', () => {
    const idCard = document.getElementById('idCard');
    const downloadBtn = document.getElementById('downloadBtn');
    const studentPhoto = document.getElementById('studentPhoto');

    // Populate ID card with student data
    const studentData = {
        name: sessionStorage.getItem('name'),
        rollNo: sessionStorage.getItem('rollNo'),
        course: sessionStorage.getItem('course'),
        branch: sessionStorage.getItem('branch'),
        email: sessionStorage.getItem('email'),
        photo: sessionStorage.getItem('photo')
    };

    // Set ID card content
    document.getElementById('studentName').textContent = studentData.name;
    document.getElementById('studentRollNo').textContent = studentData.rollNo;
    document.getElementById('studentCourse').textContent = studentData.course;
    document.getElementById('studentBranch').textContent = studentData.branch;
    document.getElementById('studentEmail').textContent = studentData.email;

    // Handle photo loading with better quality
    if (studentData.photo) {
        const img = new Image();
        img.onload = () => {
            studentPhoto.src = studentData.photo;
        };
        img.src = studentData.photo;
    }

    // Handle download button click
    downloadBtn.addEventListener('click', async () => {
        try {
            // Use html2canvas with better quality settings
            const canvas = await html2canvas(idCard, {
                scale: 3, // Increased scale for better quality
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff',
                imageTimeout: 0,
                onclone: (clonedDoc) => {
                    const clonedImage = clonedDoc.getElementById('studentPhoto');
                    if (clonedImage) {
                        clonedImage.style.width = '100%';
                        clonedImage.style.height = '100%';
                    }
                }
            });

            // Convert canvas to image and download with better quality
            const link = document.createElement('a');
            link.download = `${studentData.name}_ID_Card.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (error) {
            console.error('Error generating ID card:', error);
            alert('Error generating ID card. Please try again.');
        }
    });
}); 
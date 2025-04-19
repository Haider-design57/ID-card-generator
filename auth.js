document.addEventListener('DOMContentLoaded', () => {
    const googleSignInBtn = document.getElementById('googleSignIn');

    googleSignInBtn.addEventListener('click', async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            
            // Store user data in session storage
            sessionStorage.setItem('userEmail', result.user.email);
            sessionStorage.setItem('userName', result.user.displayName);
            
            // Redirect to details page
            window.location.href = 'details.html';
        } catch (error) {
            console.error('Error signing in with Google:', error);
            alert('Error signing in with Google. Please try again.');
        }
    });

    // Check if user is already signed in
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            sessionStorage.setItem('userEmail', user.email);
            sessionStorage.setItem('userName', user.displayName);
        }
    });
}); 
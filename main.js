// Function to handle login form submission
$('#login-form').on('submit', function(event) {
     event.preventDefault();
     const formData = $(this).serialize();
 
     $.post('/auth/login', formData, function(data) {
         const token = data.token;
         localStorage.setItem('jwt_token', token);
         window.location.href = 'dashboard.html';
     }).fail(function() {
         alert('Login failed');
     });
 });
 
 // Function to handle student form submission
 $('#student-form').on('submit', function(event) {
     event.preventDefault();
     const token = localStorage.getItem('jwt_token');
     const formData = $(this).serialize();
 
     $.ajax({
         url: '/students',
         method: 'POST',
         data: formData,
         headers: { 'Authorization': token },
         success: function() {
             alert('Student added');
             loadStudents();  // Reload students list
         },
         error: function() {
             alert('Error adding student');
         }
     });
 });
 
 // Function to fetch and display students
 function loadStudents() {
     const token = localStorage.getItem('jwt_token');
 
     $.ajax({
         url: '/students',
         method: 'GET',
         headers: { 'Authorization': token },
         success: function(data) {
             $('#student-list').empty();
             data.forEach(student => {
                 $('#student-list').append(`<li>${student.name} - ${student.grade}</li>`);
             });
         },
         error: function() {
             alert('Error fetching students');
         }
     });
 }
 
 // Logout function
 function logout() {
     localStorage.removeItem('jwt_token');
     window.location.href = 'login.html';
 }
 
 // Ensure students are loaded when on students.html
 if (window.location.pathname.endsWith('students.html')) {
     loadStudents();
 }
 
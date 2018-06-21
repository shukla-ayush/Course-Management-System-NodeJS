# Course-Management-System-NodeJS

This is the server repository for Student side of the Course Management System application, which is being implemented in Node JS. This part of application provides the services and models.

There are three models - user, sectiona and enrollments with create, delete and update features. The user and section services have been created to perform various operations on the data.

The server also mantains a session for the user, and the cookie feature ensures that the user gets logged out of application after 30 minutes of inactivity.

The user schema has been changed from what was given by Professor as now I have added a role field as either 'student' or 'admin' to ensure the application has dual features as when being operated by student or admin.

The link to client side repository of the application implemented in Angular is - 

https://github.com/shukla-ayush/Angular-Course-Management-System

The application is live on Heroku and can be accessed using the link below - 

http://angular-course-management.herokuapp.com

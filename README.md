# mini-wp

## Getting Started
 * npm install (`client` and `server`)
 * npm install -g parcel-bundler
 * `nodemon app.js` or `npm run dev` for running in server port
 * `parcel index.html` for running in client port
 

list of routes :
```
http://localhost/3000/users
http://localhost/3000/articles
http://localhost/3000/uploads

```

### list of `users` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/users/register | POST| none | firstname:String, lastname:String, email:String, Password:string (required)| Create a new user
/users/login | POST | none | email:String (required) password:String | login to Mini-WP
/users/loginGoogle | POST | none | google email| login with google email (Oauth) to Mini-WP

*for register new user, there is `profilepicture` key, User `pre` hook already set the default picture and hashing the password.

### list of `articles` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/articles/ | GET | none | - | show all article
/articles/ | POST | token | title:String, link:String, content:String| submit create article
/articles/articleData/:id | GET | token | req.headers.id | get detail article
/articles/articleData/:id | DELETE | token | email google | delete article user's is who's login (Authorization)
/articles/articleData/:id | PUT | token || login with google email (Oauth) (Authorization)

### list of `articles` routes
Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/uploads/ | POST | none | req.file | Upload to GCS.
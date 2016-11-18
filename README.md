# latte

Welcome to the Spark Front End Web Development Social Network API!

You can use this API to read and post to the Spark Front End Web Development Social Network.

## Routes

### /posts

GET -> gets all posts
POST -> create a new post. must include `profile_id` and `profile_secret` in request body

### /profiles

GET -> gets a list of all users in the system
(no POST)

### /profiles/:profile_id

GET -> gets info about a specific profile (name, image_url)

## notes

-   env vars - array of `profile_id`s and `profile_secrets`
-   posting must post to a `profile_id`
-   `profile_secret` must match `profile_id`
-   manually create list of `profile_id`s and `profile_secret`s

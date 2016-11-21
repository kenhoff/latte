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

## DB Schema

### Posts

-   datetime (ISO)
-   id (serial autoincrementing int) (primary key)
-   content (text)
-   profile (string) (foreign key)

### Profiles

-   id (string) (primary key)
-   name (string)
-   photo_url (text)

## notes

-   env vars - array of `profile_id`s and `profile_secrets`
-   posting must post to a `profile_id`
-   `profile_secret` must match `profile_id`
-   manually create list of `profile_id`s and `profile_secret`s

## todo

-   [x] set up knex environment config (local development vs production)
-   [x] set up knex migrations
-   [x] set up knex seedable data (sample profiles and posts)
-   routes
    -   [x] GET request to get a list of all profiles
    -   [x] GET request to get a specific profile
    -   [ ] validate profile_secrets
    -   [ ] POST request to update a profile field
    -   [ ] POST request to create a new post

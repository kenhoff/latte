# The Spark Front End Web Development Social Network API

Hi there! This is the documentation for the Spark Front End Web Development Social Network API.

## Navigation

-   [Getting Started](#getting-started)
-   [Posts](#posts)
-   [Profiles](#profiles)
-   [Authentication](#authentication)
-   [API Reference](#api-reference)

## Getting Started

We'll use jQuery to make network requests in this documentation. If you haven't done so already, include jQuery on your site like this:

```html
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
```

### Getting a list of all posts

To get a list of all the posts in the Social Network, we'll use the jQuery `$.ajax()` function inside a JavaScript script. Remember to include your script after you've included jquery on your page!

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/posts",
	method: "GET"
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})

// logs out something like [Object, Object, Object]...
```

`data` is now an array of post objects, which looks like this:

```json
[
  {
    "id": 10,
    "datetime": "2000-01-03T07:00:00.000Z",
    "content": "Join me in glory!",
    "profile": "reinhardt"
  },
  {
    "id": 9,
    "datetime": "2000-01-02T07:00:00.000Z",
    "content": "Check out this gun!",
    "profile": "zarya"
  },
  {
    "id": 8,
    "datetime": "2000-01-01T07:00:00.000Z",
    "content": "I am unstoppable!",
    "profile": "reinhardt"
  }
]
```

### Creating a new post

To create a new post on the Social Network, you'll need to use the jQuery `$.ajax()` function to create a POST request, and include a `profile_secret` along with your data.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/posts",
	method: "POST",
	data: {
		profile_id: "reinhardt",
		profile_secret: "1234",
		content: "Who will push the payload with me?"
	}
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})

// logs out "Post created successfully"
```

To learn more about authentication (and to find your `profile_secret`), check out the [Authentication section](#authentication).

--------------------------------------------------------------------------------

## Posts

On the Spark Front End Web Development Social Network, every user can create and see **posts**.

Each post is a JavaScript object. Each post object has the following fields:

-   id (an integer)
-   datetime - the time that the post was created (a string in the ISO datetime format)
-   content - the text content of the post (a string)
-   profile - the id of the profile (user) that created the post (a string)

Here's what a sample post object looks like:

```json
{
    "id": 8,
    "datetime": "2000-01-01T07:00:00.000Z",
    "content": "I am unstoppable!",
    "profile": "reinhardt"
}
```

There is a single big long list of posts that all users can see.

Every time a user creates a new post, it goes to the top of that list. The list is ordered from most recent post to least recent.

Here's what a sample list of all posts looks like (an array of objects):

```json
[
  {
    "id": 10,
    "datetime": "2000-01-03T07:00:00.000Z",
    "content": "Join me in glory!",
    "profile": "reinhardt"
  },
  {
    "id": 9,
    "datetime": "2000-01-02T07:00:00.000Z",
    "content": "Check out this gun!",
    "profile": "zarya"
  },
  {
    "id": 8,
    "datetime": "2000-01-01T07:00:00.000Z",
    "content": "I am unstoppable!",
    "profile": "reinhardt"
  }
]
```

--------------------------------------------------------------------------------

## Profiles

Each user on the Spark Front End Web Development Social Network has a **profile**.

(There's a one-to-one relationship between users and profiles, and we can use them interchangably, so I'm just going to refer to users as profiles now.)

Each profile has the following fields:

-   id - the unique identifier of the profile (a string)
-   name - the profile's name (a string)
-   photo_url - the url of the user's profile photo (a string)

**Remember:** a user's name and photo_url can change, but their id will always stay the same.

Here's what a sample profile object looks like:

```json
{
	"id": "reinhardt",
	"name": "Reinhardt Wilhelm",
	"photo_url": "https://blzgdapipro-a.akamaihd.net/hero/reinhardt/hero-select-portrait.png"
}
```

It may be more useful to get a list of all profiles that exist on the Social Network. In that case, the list will be an array of JavaScript objects. Here's what an example array of profile objects would look like:

```json
[
  {
    "id": "reinhardt",
    "name": "Reinhardt Wilhelm",
    "photo_url": "https://blzgdapipro-a.akamaihd.net/hero/reinhardt/hero-select-portrait.png"
  },
  {
    "id": "zarya",
    "name": "Aleksandra Zaryanova",
    "photo_url": "https://blzgdapipro-a.akamaihd.net/hero/zarya/hero-select-portrait.png"
  }
]
```

--------------------------------------------------------------------------------

## Authentication

> **Aside:** In big complicated web applications, authentication and authorization will be done in a far more sophisticated and robust way. Because we're still learning, authentication and authorization happens here in a relatively trivial way. It still accomplishes what we're trying to do, but consider doing more research on authentication and authorization before implementing it in your own applications.

Many of the Social Network API routes below are **unauthenticated**, which means that we don't have to provide any sort of authentication to the API to use them. Even users who aren't allowed to create new posts can use these routes!

For example, if we want to get a list of all the posts on the Social Network, we can just call the route without any sort of authentication.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/posts",
	method: "GET"
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})

// logs out something like [Object, Object, Object]...
```

However, some of the API routes require **authentication**, which means that they need us to verify that we are who we say we are.

For example, if we'd like to create a new post, we need to **authenticate** ourself to the API, so that we can prove that we are who we say we are.

We can do that by including a `profile_secret` in the request body any time that we call an authenticated API route.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/posts",
	method: "POST",
	data: {
		profile_id: "reinhardt",
		profile_secret: "1234",
		content: "Who will push the payload with me?"
	}
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})

// logs out "Post created successfully"
```

Try omitting/changing `profile_secret`, `profile_id`, or `content` to see what happens.

> **Authentication** is the process of verifying that you are indeed who you say you are.
>
> **Authorization** is the process of verifying that you have sufficient permissions to perform the desired action.

### What's my profile_secret?

You should have received your profile_secret from Ken in a DM or email.

Protect your profile_secret!!! Otherwise, anybody will be able to use it to post to your profile.

If you forgot your profile secret, or you think it might have been compromised and need it to be rolled, DM or email ken at <mailto:ken@hoff.tech>.

--------------------------------------------------------------------------------

## API Reference

### Base URL

For all of the following API routes, the base URL is:

```
https://spark-class-social-network-api.hoff.tech/api
```

That means that every time that you make a call to the API, the URL is going to be the base URL + whatever API route you'd like to call.

For example, if you'd like to call the `/posts` API route, you'd make a call to the following URL:

```
https://spark-class-social-network-api.hoff.tech/posts
```

### /posts

The structure of a post object looks like this:

-   id (an integer)
-   datetime - the time that the post was created (a string in the ISO datetime format)
-   content - the text content of the post (a string)
-   profile - the id of the profile (user) that created the post (a string)

Here's what a sample post object looks like:

```json
{
    "id": 8,
    "datetime": "2000-01-01T07:00:00.000Z",
    "content": "I am unstoppable!",
    "profile": "reinhardt"
}
```

#### GET /posts

<!-- should include params, example, and output -->

To get a list of all the most recent posts, make a GET request to the /posts route.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/posts",
	method: "GET"
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})

// logs out something like [Object, Object, Object]...
```

#### POST /posts

To create a new post, make a POST request to the /posts route, and include your profile_id, profile_secret, and content in the request body.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/posts",
	method: "POST",
	data: {
		profile_id: "reinhardt",
		profile_secret: "1234",
		content: "Who will push the payload with me?"
	}
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})

// logs out "Post created successfully"
```

### /profiles

Each profile has the following fields:

-   id - the unique identifier of the profile (a string)
-   name - the profile's name (a string)
-   photo_url - the url of the user's profile photo (a string)

Here's what a sample profile object looks like:

```json
{
	"id": "reinhardt",
	"name": "Reinhardt Wilhelm",
	"photo_url": "https://blzgdapipro-a.akamaihd.net/hero/reinhardt/hero-select-portrait.png"
}
```

Users can change their name and photo_url, but cannot change their id.

#### GET /profiles

Making a GET request to /profiles gets a list of all profiles in the Social Network.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/profiles",
	method: "GET",
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})
```

#### GET /profiles/&lt;profile_id>

You can make a GET request to get a specific profile by putting the profile's id in the URL.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/profiles/reinhardt",
	method: "GET",
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})
```

#### POST /profiles/&lt;profile_id>

You can make a POST request to a specific profile to update the name or photo_url on the profile.

```javascript
$.ajax({
	url: "https://spark-class-social-network-api.hoff.tech/api/profiles/reinhardt",
	method: "POST",
	data: {
		profile_secret: "1234",
		name: "Just Reinhardt",
		photo_url: "http://orig02.deviantart.net/59ff/f/2015/323/6/a/overwatch___reinhardt_by_nesskain-d9h9ihl.jpg"
	}
}).done(function(data) {
	// the request has succeeded
	console.log(data);
}).fail(function(jqXHR, status, error) {
	// the request has failed
	console.log(error);
})
```

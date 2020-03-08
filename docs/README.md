# Introduction

You’ve found the Amazing Facts Developer Documentation! These pages are dedicated to showing you all the ways that you can use Amazing-Facts-Api to publish all your facts.

# Bugs

If you believe you're experiencing a bug with our API or want to report incorrect documentation, open an issue on our [issue tracker](https://github.com/NinjaAung/Amazing-Facts-Api/issues)

# Rescources


## User Resource

Users in the api are generally considered the base entity. Users participate in adding, deleting, updating.

###### Usernames

Amazing Facts enforces the following restrictions for usernames:
> 1. Names can contain most valid unicode characters. We limit some zero-width and non-rendering characters.
> 2. Usernames must be between 6 and 32 characters long.
> 3. Names are sanitized and trimmed of leading, trailing, and excessive internal whitespace.

The following restrictions are additionally enforced for usernames:
> 1. Names cannot contain the following substrings: '@', '#', ':', '```'.

There are other rules and restrictions not shared here, but the majority of users won't encounter them. It's important to properly handle all error messages returned by Amazing Facts Api when editing or updating names.

###### **User Object**
| FIELD  | TYPE | DESCRIPTION | REQUIRED |
| ------------- | ------------- | ------------- | ------------- |
| _id | string  | the user's id | False, Default |
| username  | string  | the user's username | True |
| password | string | User's encrypted password | True |
| date | string |  date of User creation | False, Default |
| _v | intiger | version number | False, Default |


###### **Example User**
```
{
  "id": "80351110224678912",
  "username": "Nelly",
  "password": "123651372655234ASDJFhJk"
}
```
###### **Add User**
**GET** ```/users/register```

> returns complete and response with 200 and _id

###### **User login**
**GET** ```/users/login```

> returns complete and response with 200 and jwt_token header

###### **Get Current User**
**GET** ```/users/me```

> Returns the user object of the requester's account.

###### **Get User**
**GET** ```/users/:userId```

> Returns a user object for a given user ID.

## Auth/Registration Resource

Amazing Facts handles all encryption and dose not store passwords as plain text:
1. All passwords are salted to ensure privacy
2. All passwords are hashed with salt

All specify routes require a ```"auth-token":":jwt-token"``` header to have access to them

##### Routes Auth Require

###### **Create Fact**
**GET** ```/fact/add```

> Returns a fact object on completion.

###### **Update Fact**
**PUT** ```/fact/update/:factId```

> Returns a updated fact object on completion

###### **Delete Fact**
**GET** ```/fact/delete/:factId```

## Fact Resource

Amazing Facts enforces the following restrictions for facts:
> 1. Facts can contain most valid unicode characters. We limit some zero-width and non-rendering characters.
> 2. Facts must be added
> 3. Names are sanitized and trimmed of leading, trailing, and excessive internal whitespace.

The following restrictions are additionally enforced for usernames:
> 1. Facts cannot contain the following substrings: '@', '#'.

There are other rules and restrictions not shared here, but the majority of users won't encounter them. It's important to properly handle all error messages returned by Amazing Facts Api when editing or updating names.


###### **Fact Object**
| FIELD  | TYPE | DESCRIPTION | REQUIRED |
| ------------- | ------------- | ------------- | ------------- |
| _id | string  | the user's id |  False, Default |
| fact  | string  | the user's username | True |
| user | string | User's encrypted password | True |
| _v | intiger | version number | False, Default |


###### **Example Fact**
```
{
  "id": "80351110224678912",
  "fact": "Makeschool is a cool",
  "user": "Meredith"
}
```


###### **Read Fact**
**GET** ```/fact/all```

> Returns all fact objects

###### **Read Certain Fact**
**GET** ```/fact/find/:factId```

> Returns a certain fact object with :factId

###### **Create Fact**
**GET** ```/fact/add```

> Returns a fact object on completion.

###### **Update Fact**
**GET** ```/fact/update/:factId```

> Returns a updated fact object on completion

###### **Delete Fact**
**GET** ```/fact/delete/:factId```

> Returns a fact object with delete status with :factId.



# Author
Nyein Chan Aung (Ninja)

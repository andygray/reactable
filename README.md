Reactable
=========

```
browserify -t reactify src/app.jsx -o public/js/bundle.js
```

Set mongo variables, these should not be on the codebase to avoid exposing credentials!

```
export MONGOLABUSR="youruser"
export MONGOLABPW="password1"
export MONGOLABURI="xxxx.mongolab.com"
export MONGOLABPORT="27908"
export MONGOLABDB="picks-test"
```
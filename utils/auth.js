const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route

  console.log('withAuth', req.session.username)
  if (req.session.logged_in && req.session.username) {
    next();
  } else {
   res.redirect('/login');
  }
};

module.exports = withAuth;

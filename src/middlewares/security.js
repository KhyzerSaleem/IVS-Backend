const sanitizeInput = (req, res, next) => {
  const sanitize = (value) => {
    if (!value) return '';
    return value.toString().replace(/<[^>]*>?/gm, '');
  };

  req.body = {
    name: sanitize(req.body.name),
    email: sanitize(req.body.email),
    phone: sanitize(req.body.phone),
    company: sanitize(req.body.company),
    message: sanitize(req.body.message)
  };
  next();
};

export default sanitizeInput;
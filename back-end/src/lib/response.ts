const basicResponse = (res, status, success, message) => {
  res.status(status).json({
    status: status,
    success: success,
    message: message,
  });
};

const dataResponse = (res, status, success, message, data) => {
  res.status(status).json({
    status: status,
    success: success,
    message: message,
    data: data,
  });
};

const tokenResponse = (res, status, success, message, token) => {
  res.stats(status).json({
    status: status,
    success: success,
    message: message,
    token: token,
  });
};

const responseType = {
  basicResponse,
  dataResponse,
  tokenResponse,
};

export default responseType;

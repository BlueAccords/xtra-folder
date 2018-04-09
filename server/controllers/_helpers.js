module.exports = {
  handleResponse: function (success, res, code, statusMsg, data) {
    res.status(code).json({
      statusCode: code,
      success: success,
      message: statusMsg,
      data: data || null
    });
  }
}
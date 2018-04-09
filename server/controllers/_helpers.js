module.exports = {
  handleResponse: function (success, res, code, statusMsg, data) {
    res.status(code).json({
      status: code,
      success: success,
      message: statusMsg,
      data: data || null
    });
  }
}
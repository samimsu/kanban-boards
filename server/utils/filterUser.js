const filterUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    profilePicture: user.profilePicture,
    boards_id: user.boards,
  }
}

module.exports = filterUser;
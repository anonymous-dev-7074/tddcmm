module.exports = async(client) => {
  client.blacklisted.ensure(client.user.id, {
    blacklistedusers: []
  });
console.log(`${client.user.tag} is online!`)
}
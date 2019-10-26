const { eventsResolvers } = require('../resolvers/events');
const { bookingResolvers } = require('../resolvers/booking');
const { authResolvers } = require('../resolvers/auth');

exports.resolvers = {
  ...eventsResolvers,
  ...bookingResolvers,
  ...authResolvers
}



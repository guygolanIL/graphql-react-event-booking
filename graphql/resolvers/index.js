const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(e => {
        return {
          ...e._doc,
          _id: e.id,
          date: new Date(e._doc.date).toISOString(),
          creator: user.bind(this, e._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }) => {
    const newEvent = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: "5db30b604896e326a820e482"
    });
    let createdEvent;
    try {
      const result = await newEvent.save();
      createdEvent = {
        ...result._doc,
        _id: result.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const user = await User.findById("5db30b604896e326a820e482");
      if (!user) {
        throw new Error("User Not Found.");
      }
      user.createdEvents.push(newEvent);
      await user.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      const userDoc = await User.findOne({ email: args.userInput.email });
      if (userDoc) {
        throw new Error("User Exists Already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const savedUser = await newUser.save();
      return { ...savedUser._doc, password: null, _id: savedUser.id };
    } catch (err) {
      throw err;
    }
  }
};

module.exports = resolvers;

const Event = require("../../models/event");
const { transformEvent } = require("./merge");

exports.eventsResolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(e => {
        return transformEvent(e);
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
      createdEvent = transformEvent(result);
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
  }
};

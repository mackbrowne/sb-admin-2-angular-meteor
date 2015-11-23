Parties = new Mongo.Collection('parties');

Parties.allow({
  insert: function (userId, party) {
    return userId && party.owner === userId;
  },
  update: function (userId, party, fields, modifier) {
    return userId && party.owner === userId;
  },
  remove: function (userId, party) {
    return userId && party.owner === userId;
  }
});

let contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};

Meteor.methods({
  invite: function (partyId, userId) {
    check(partyId, String);
    check(userId, String);
    let party = Parties.findOne(partyId);
    if (!party)
      throw new Meteor.Error(404, 'No such party');
    if (party.owner !== this.userId)
      throw new Meteor.Error(404, 'No such party');
    if (party.public)
      throw new Meteor.Error(400,
        'That party is public. No need to invite people.');

    if (userId !== party.owner && !_.contains(party.invited, userId)) {
      Parties.update(partyId, { $addToSet: { invited: userId } });

      let from = contactEmail(Meteor.users.findOne(this.userId));
      let to = contactEmail(Meteor.users.findOne(userId));

      if (Meteor.isServer && to) {
        // This code only runs on the server. If you didn't want clients
        // to be able to see it, you could move it to a separate file.
        Email.send({
          from: 'noreply@socially.com',
          to: to,
          replyTo: from || undefined,
          subject: 'PARTY: ' + party.title,
          text:
          'Hey, I just invited you to " + party.title + " on Socially.' +
          '\n\nCome check it out: ' + Meteor.absoluteUrl() + '\n'
        });
      }
    }
  },
  rsvp: function (partyId, rsvp) {
    check(partyId, String);
    check(rsvp, String);
    if (!this.userId)
      throw new Meteor.Error(403, 'You must be logged in to RSVP');
    if (!_.contains(['yes', 'no', 'maybe'], rsvp))
      throw new Meteor.Error(400, 'Invalid RSVP');
    let party = Parties.findOne(partyId);
    if (!party)
      throw new Meteor.Error(404, 'No such party');
    if (!party.public && party.owner !== this.userId &&
      !_.contains(party.invited, this.userId))
    // private, but let's not tell this to the user
      throw new Meteor.Error(403, 'No such party');

    let rsvpIndex = _.indexOf(_.pluck(party.rsvps, 'user'), this.userId);
    if (rsvpIndex !== -1) {
      // update existing rsvp entry

      if (Meteor.isServer) {
        // update the appropriate rsvp entry with $
        Parties.update(
          {_id: partyId, 'rsvps.user': this.userId},
          {$set: {'rsvps.$.rsvp': rsvp}});
      } else {
        // minimongo doesn't yet support $ in modifier. as a temporary
        // workaround, make a modifier that uses an index. this is
        // safe on the client since there's only one thread.
        let modifier = {$set: {}};
        modifier.$set['rsvps.' + rsvpIndex + '.rsvp'] = rsvp;
        Parties.update(partyId, modifier);
      }
      // Possible improvement: send email to the other people that are
      // coming to the party.
    } else {
      // add new rsvp entry
      Parties.update(partyId,
        {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
    }
  }
});
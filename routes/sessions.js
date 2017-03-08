/**
 * Created by i854911 on 2/7/17.
 */

const _sessions = {};

const sessions = {};

//create user session if it doesn't already exist
sessions.findOrCreateSession = (channel, bot) => {
    let sessionId;
    // Let's see if we already have a session for the user user_id
    Object.keys(_sessions).forEach(k => {
        if (_sessions[k].channel === channel) {
            // Yep, got it!
            sessionId = k;
        }
    });

    if (!sessionId) {
        // No session found for user user_id, let's create a new one
        sessionId = new Date().toISOString();
        _sessions[sessionId] = {channel: channel, bot: bot};
    }
    return sessionId;
};

sessions.getSession = (sessionId) =>    {
    return _sessions[sessionId];
};

module.exports = sessions;

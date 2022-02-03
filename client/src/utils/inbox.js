// Sort messages and format inbox
export const inbox = (messages, user) => {
  const inbox = {};
  // Add each conversation
  for (let i = 0; i < messages.length; i++) {
    let conversation = `${messages[i]["creator"]["first_name"]} ${messages[i][
      "creator"
    ]["last_name"]}`;
    if (!inbox[conversation] && conversation !== user) {
      inbox[conversation] = [];
    }
  }
  const users = Object.keys(inbox);
  // Add each message to conversation
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < messages.length; j++) {
      let creator = `${messages[j]["creator"]["first_name"]} ${messages[j][
        "creator"
      ]["last_name"]}`;
      let recipient = `${messages[j]["recipient"]["first_name"]} ${messages[j][
        "recipient"
      ]["last_name"]}`;

      if (creator === users[i] || recipient === users[i]) {
        // Add message
        inbox[users[i]] = [...inbox[users[i]], messages[j]];
      }
    }
  }

  let results = [];
  for (let author in inbox) {
    // Result conversations with messages sorted by date (oldest first)
    results.push({
      [`${author}`]: inbox[author].sort((a, b) => {
        return new Date(b["created_on"]) - new Date(a["created_on"]);
      })
    });
  }
  console.log(results);
  return results;
};

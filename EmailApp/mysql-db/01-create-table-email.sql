USE email_sender_db;

CREATE TABLE IF NOT EXISTS email (
  id VARCHAR(36) PRIMARY KEY,
  to VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  timeSent DATETIME NOT NULL,
  emailNumber INT NOT NULL,
  numEmails INT NOT NULL,
  status VARCHAR(255) NOT NULL
);

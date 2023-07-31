import React from "react";

import styles from "./style.module.css";

interface Event {
  EmailNumber: number;
  to: string;
  subject: string;
  text: string;
  html: string;
}

interface EventsProps {
  events: Event[];
}

const Events: React.FC<EventsProps> = (props: EventsProps) => {
  const { events } = props;

  return (
    <ul className={styles.listStyles}>
      {events.map((event, index) => (
        <li key={index}>
          <div>
            <strong>Email Number:</strong> {event.EmailNumber}
          </div>
          <div>
            <strong>To:</strong> {event.to}
          </div>
          <div>
            <strong>Subject:</strong> {event.subject}
          </div>
          <div>
            <strong>Text:</strong> {event.text}
          </div>
          <div>
            <strong>HTML:</strong> {event.html}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Events;

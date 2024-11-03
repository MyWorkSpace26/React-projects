import React from "react";
import { Link } from "react-router-dom";

const Events = [
  { id: "p1", title: "Event 1" },
  { id: "p2", title: "Event 2" },
  { id: "p3", title: "Event 3" },
];

const EventsPage = () => {
  return (
    <>
      <h1>The Events Page</h1>
      <ul>
        {Events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;

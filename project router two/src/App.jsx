import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRootLayout from "./pages/EventsRoot";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "events",
          element: <EventsRootLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: async () => {
                const response = await fetch("http://localhost:8080/events");

                if (!response.ok) {
                  // ...
                } else {
                  const resData = await response.json();
                  return resData.events;
                }
              },
            },
            {
              path: ":eventid",
              element: <EventDetailPage />,
            },
            {
              path: "new",
              element: <NewEventPage />,
            },
            {
              path: ":eventid/edit",
              element: <EditEventPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

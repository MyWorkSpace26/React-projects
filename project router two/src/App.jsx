import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoder } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
} from "./pages/EventDetailPage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
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
              loader: eventsLoder,
            },
            {
              path: ":eventId",
              loader: eventDetailLoader,
              id: "event-detail", // هاد خاص لحتى اقدر جيب البيانات من مستوى اعلى التسمية غير هامة
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: newEventAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoder } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";

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
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: manipulateEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: manipulateEventAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

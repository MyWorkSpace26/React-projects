import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventsPage from "./pages/EventsPage";
import NewEventPage from "./pages/NewEventPage";
import RootLayout from "./pages/Root";

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
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "/events/:eventId",
          element: <EventDetailPage />,
        },
        {
          path: "/events/new",
          element: <NewEventPage />,
        },
        {
          path: "/events/:eventId/edit",
          element: <EditEventPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

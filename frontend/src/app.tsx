import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect, RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from './context/auth-context';
import { Index as AuthIndex } from './routes/access/index';
import { Index as TaskIndex } from './routes/tasks/index';

interface AuthContext {
  auth: {
    isAuthenticated: boolean
  }
}

const rootRoute = createRootRouteWithContext<AuthContext>()({
  component: () => <Outlet />
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Outlet />,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/access",
        replace: true
      })

    }

    throw redirect({
      to: "/tasks",
      replace: true
    })

  }
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access',
  component: AuthIndex,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/tasks",
        replace: true
      })
    }

  }

});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: TaskIndex,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/access",
        replace: true
      })
    }

  }
});


const routeTree = rootRoute.addChildren([indexRoute, tasksRoute, authRoute]);

const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false
    }
  }
});

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
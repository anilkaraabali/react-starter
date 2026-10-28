import { Outlet } from '@tanstack/react-router';

export function AccountLayout() {
  return (
    <div className='container mx-auto max-w-6xl min-w-0'>
      <Outlet />
    </div>
  );
}

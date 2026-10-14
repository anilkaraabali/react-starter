import { Outlet } from '@tanstack/react-router';

export function AccountLayout() {
  return (
    <div className='container mx-auto min-w-0 max-w-6xl'>
      <Outlet />
    </div>
  );
}

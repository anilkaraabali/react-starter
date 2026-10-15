import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryState } from '@/components/molecules/query-state';
import { renderWithI18n } from '@/testing/render';

describe('QueryState', () => {
  it('renders fallback when isPending is true', () => {
    const { container } = renderWithI18n(
      <QueryState
        data={null}
        fallback={<div>Loading custom...</div>}
        isError={false}
        isPending={true}
      >
        {() => <div>Content</div>}
      </QueryState>
    );

    expect(container.textContent).toContain('Loading custom...');
    expect(container.textContent).not.toContain('Content');
  });

  it('renders error fallback when isError is true', () => {
    const { container } = renderWithI18n(
      <QueryState
        data={null}
        errorFallback={<div>Error custom...</div>}
        isError={true}
        isPending={false}
      >
        {() => <div>Content</div>}
      </QueryState>
    );

    expect(container.textContent).toContain('Error custom...');
    expect(container.textContent).not.toContain('Content');
  });

  it('renders error fallback when data is null or undefined', () => {
    const { container } = renderWithI18n(
      <QueryState
        data={null}
        errorFallback={<div>No data...</div>}
        isError={false}
        isPending={false}
      >
        {() => <div>Content</div>}
      </QueryState>
    );

    expect(container.textContent).toContain('No data...');
  });

  it('renders retry and back buttons in default error view and triggers handlers', () => {
    const onRetry = vi.fn();
    const onBack = vi.fn();

    renderWithI18n(
      <QueryState
        data={null}
        isError={true}
        isPending={false}
        onBack={onBack}
        onRetry={onRetry}
      >
        {() => <div>Content</div>}
      </QueryState>
    );

    const retryButton = screen.getAllByRole('button', { name: /retry/i })[0];
    const backButton = screen.getAllByRole('button', { name: /go back/i })[0];

    expect(retryButton).toBeDefined();
    expect(backButton).toBeDefined();

    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);

    fireEvent.click(backButton);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders children with narrowed data when loaded', () => {
    const { container } = renderWithI18n(
      <QueryState
        data={{ name: 'Sample Item' }}
        isError={false}
        isPending={false}
      >
        {(item) => <div>Loaded: {item.name}</div>}
      </QueryState>
    );

    expect(container.textContent).toBe('Loaded: Sample Item');
  });
});

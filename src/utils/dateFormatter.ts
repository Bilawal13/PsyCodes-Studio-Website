/**
 * Formats ISO date strings into human-friendly full and relative dates.
 */
export function formatInquiryDate(dateStr?: string): { full: string; relative: string; dateOnly: string; timeOnly: string } {
  if (!dateStr) {
    return { full: 'Date not recorded', relative: '', dateOnly: 'N/A', timeOnly: '' };
  }

  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return { full: dateStr, relative: '', dateOnly: dateStr, timeOnly: '' };
    }

    const full = d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const dateOnly = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const timeOnly = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const now = Date.now();
    const diffMs = now - d.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    let relative = '';
    if (diffMin < 1) relative = 'Just now';
    else if (diffMin < 60) relative = `${diffMin}m ago`;
    else if (diffHours < 24) relative = `${diffHours}h ago`;
    else if (diffDays === 1) relative = 'Yesterday';
    else if (diffDays < 30) relative = `${diffDays}d ago`;
    else relative = dateOnly;

    return { full, relative, dateOnly, timeOnly };
  } catch {
    return { full: dateStr, relative: '', dateOnly: dateStr, timeOnly: '' };
  }
}

export async function getWhitelist() {
  const res = await fetch('/api/admin/whitelist/');
  const json = await res.json();
  return json;
}

export async function createWhitelist() {
  const res = await fetch('/api/admin/whitelist/', { method: 'POST' });
  const json = await res.json();
  return json;
}

export async function updateWhitelist(whitelist) {
  const res = await fetch('/api/admin/whitelist/', {
    method: 'PATCH',
    body: JSON.stringify({ data: whitelist }),
  });
  const json = await res.json();
  return json;
}

export async function getAnalytics() {
  const res = await fetch('/api/admin/analytics/');
  const json = await res.json();
  return json;
}

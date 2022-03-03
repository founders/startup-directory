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

export async function getOrgs() {
  const res = await fetch('/api/organizations/?findAll=true');
  const json = await res.json();
  return json;
}

export async function updateOrg(org) {
  const neworg = await fetch('/api/accounts/org', {
    method: 'PATCH',
    body: JSON.stringify(org),
  });
  const json = neworg.json();
  return json;
}

import { onCLS, onLCP, onINP } from 'web-vitals';
const report = (metric) => {
  fetch('/metrics/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric)
  });
};

onLCP(report);
onCLS(report);
onINP(report);

import { createRoot } from 'react-dom/client';

import App from '@/App';

const container = document.getElementById('root');
const root = createRoot(container!);

const app = <App />;

root.render(app);

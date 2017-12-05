import dva from 'dva';
import './index.less';
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
    history:browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/User'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
import React from 'react';
import Login from './Login';
import ListExams from './ListExams'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateGlobalStyle from './global'

function App() {
  return (<>
    <CreateGlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/exam" exact render={(props)=><ListExams {...props} />}  />
      </Switch>
    </BrowserRouter>
  </>
  );
}

export default App;


import React from 'react';
import ReactDOM from 'react-dom';

import {mount} from 'react-mounter';
// load Layout and Welcome React components
import {Layout, Welcome} from './app';

FlowRouter.route("/", {
  action() {
    mount(Layout, {
        content: (<Welcome />)
    });
  }
});

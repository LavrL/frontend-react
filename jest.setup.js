// import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// jest-fetch mocking
global.fetch = require('jest-fetch-mock');

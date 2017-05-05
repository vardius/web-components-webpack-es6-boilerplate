import jq from 'jquery';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

// Global prerequisites to make it work in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jq(window);

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { expect };